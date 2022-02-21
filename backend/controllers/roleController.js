import role from "../models/role.js"; //importo el modelo

const registerRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });
  let schema = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });
  let result = await schema.save();
  if (!result) return.status(500).send({message:"Failed to register role"});
  res.status(200).send({result});
}; //Fin de la función registrar

const listRole = async (req, res) => {
    let roles = await role.find();
    if(role.length===0)
    return res.satus(400).send({message: "No search results"});
    return res.status(200).send({roles});
}; //fxn listRole

export default { registerRole, listRole }; //exporto el modelo
