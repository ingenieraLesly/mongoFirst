import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  numberContact: Number,
  password: String,
  roleID: { type: mongoose.Schema.objectId, ref: "roles" }
});

const user = mongoose.model("users", userSchema);
export default user;
