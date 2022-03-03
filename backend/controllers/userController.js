import bcrypt from "../lib/bcrypt.js";
import jwt from "../lib/jwt.js";
import moment from "moment";

import UserModel from "../models/user.js";
import UserServices from "../services/user.js";

const registerUser = async (req, res) => {
  let passHash = await bcrypt.hashGenerate(req.body.password);

  const userSchema = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    role: req.body.role,
    dbStatus: true,
  });

  const result = await userSchema.save();

  if (!result)
    return res.status(500).send({ message: "Failed to register user" });

  const token = await jwt.generateToken(result);

  return !token
    ? res.status(500).send({ message: "Failed to register user" })
    : res.status(200).send({ token });
};

const listUser = async (req, res) => {
  const users = await UserModel.find(
    {
      $and: [
        { name: new RegExp(req.params["name"], "i") },
        { dbStatus: "true" },
      ],
    },
    { _id: 0, name: 1 }
  );

  return users.length === 0
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ users });
};

const listUserAdmin = async (req, res) => {
  const users = await UserServices.find({
    $and: [{ name: new RegExp(req.params["name"], "i") }],
  })
    .populate("role")
    .exec();

  return users.length === 0
    ? res.status(404).send({ message: "No search results found" })
    : res.status(200).send({ users });
};

const findUser = async (req, res) => {
  const userfind = await UserServices.findById({ _id: req.params["_id"] })
    .populate("role")
    .exec();
  return !userfind
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ userfind });
};

const getUserRole = async (req, res) => {
  let userRole = await UserServices.findOne({ email: req.params.email })
    .populate("role")
    .exec();
  if (!userRole) return res.status(400).send({ message: "No search results" });

  userRole = userRole.role.name;
  return res.status(200).send({ userRole });
};

const login = async (req, res) => {
  const userLogin = await UserModel.findOne({ email: req.body.email });
  if (!userLogin)
    return res.status(400).send({ message: "Wrong email or password" });
  if (!userLogin.dbStatus)
    return res.status(400).send({ message: "User no found" });
  const passHash = await bcrypt.compare(req.body.password, userLogin.password);
  if (!passHash)
    return res.status(400).send({ message: "Wrong email or password" });
  try {
    return registerUser.status(200).json({
      TOKEN: jwt.sign(
        {
          _id: userLogin._id,
          name: userLogin.name,
          role: userLogin.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "login error" });
  }
};

const deleteUser = async (req, res) => {
  const deleted = await UserModel.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });
  return !deleted
    ? res.status(400).send({ message: "Error deleting user" })
    : res.status(200).send({ message: "User deleted" });
};

const updateUser = async (req, res) => {
  const findUser = await UserModel.findOne({ email: req.body.email });

  let pass = findUser.password; //para guardar la contraseña con hash encontrada en la bd
  let role = findUser.role;

  if (req.body.password) {
    const passHash = await bcrypt.hashCompare(req.body.password, pass);
    if (!passHash) pass = await bcrypt.hashGenerate(req.body.password);
  }

  if (req.user.roleName === "admin") role = req.body.role;

  let changes = await UserServices.isChanges(req.body, pass);

  if (changes)
    return res.status(400).send({ mesagge: "You didn't make any changes" });

  const updated = await UserModel.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    password: pass,
    role: req.body.role,
  });
  return !updated
    ? res.status(500).send({ message: "Error editing user" })
    : res.status(200).send({ message: "User updated" });
};

export default {
  registerUser,
  listUser,
  listUserAdmin,
  findUser,
  getUserRole,
  login,
  deleteUser,
  updateUser,
};
