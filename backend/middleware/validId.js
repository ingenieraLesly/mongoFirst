import mongoose from "mongoose";

const validId = async (req, res, next) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params["_id"]);
  return !isIdValid ? res.status(400).send({ message: "Invalid id" }) : next();
};

export default validId;
