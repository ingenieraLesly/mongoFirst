import UserModel from "../models/user.js";

const validDataUpdate = (req, res, next) => {
  if (!req.body.name || !req.body.email)
    return res.status(400).send({ message: "Incomplete Data" });
  next();
};

const validRole = (req, res, next) => {
  if (!req.body.role)
    return res.status(400).send({ message: "Incomplete data" });
  next();
};

const existingUser = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const existingUser = await UserModel.findOne({ email: req.body.email });
  return existingUser
    ? res.status(400).send({ message: "The user is already registered" })
    : next();
};

export default { validDataUpdate, validRole, existingUser };
