import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const userSchema = new user({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    role: req.body.role,
    dbStatus: true,
  });
  const result = await userSchema.save();
  if (!result) res.status(500).send({ message: "Failed to register user" });
  try {
    return res.status(200).json({
      token: jwt.sign(
        //jwt nombre librería sign metodo q construye el token
        {
          _id: result._id, //
          name: result.name,
          role: result.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT //process.env para leer vbls entorno. En SK_JWT está la SK elegida.
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Register error" });
  }
};

const listUser = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();
  if (users.length === 0)
    return res.status(400).send({ message: "No search results" });

  return res.status(200).send({ users });
};

const login = async (req, res) => {
  const userLogin = await user.findOne({ email: req.body.email });
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
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });
  const users = await user.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });
  return !users
    ? res.status(400).send({ message: "Error deleting user" })
    : res.status(200).send({ message: "Used deleted" });
};

const updateUserAdmin = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.role || !req.body.email)
    return res.status(400).send({ message: "Incomplete data" });

  let pass = "";//para guardar la contraseña con hash encontrada en la bd

  if (!req.body.password) {
    const findUser = await user.findOne({ email: req.body.email });
    pass = findUser.password;
  } else {
    pass = await bcrypt.hash(req.body.password, 10);//el if verificó que si contiene algo el campo contraseña y aquí guardamos ese password que contenía ese body (el que modificó el usuario admin en el formulario) y usamos el pass para enctriptarla.
  }
};

export default { registerUser, listUser, login, deleteUser, updateUserAdmin };
