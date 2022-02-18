import role from "../models/role.js";

const existingRole = async (req, res, next) => {
    const roleId = await role.findOne({ name: "user" });
  if (!roleId) return res.status(500).send({ message: "No role was assigned" });

  //Agregar datos a un objeto en JavaScript
  req.body.role = roleId._id;
  next();
};

export default { existingRole };