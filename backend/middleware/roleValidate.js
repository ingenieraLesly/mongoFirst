import RoleModel from "../models/role.js";

const existingRole = async (req, res, next) => {
  const getRole = await RoleModel.findOne({ name: req.body.name });

  return getRole
    ? res.status(400).send({ message: "Role already exists" })
    : next();
};

const noChanges = async (req, res, next) => {
  const changes = await RoleModel.findOne({
    name: req.body.name,
    description: req.body.description,
  });
  return changes
    ? res.status(400).send({ message: "No changes were made" })
    : next();
};

const getRoleUser = async (req, res, next) => {
  const role = await RoleModel.findOne({ name: "user" });
  if (!role) return res.status(400).send({ message: "error assigning role" });

  req.body.role = role._id;
  next();
};

export default { existingRole, noChanges, getRoleUser };
