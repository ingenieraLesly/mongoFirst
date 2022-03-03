import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  numberContact: Number,
  password: String,
  roleID: { type: mongoose.Schema.ObjectId, ref: "roles" },
  registerDate: { type: Date, default: Date.now },
  dbStatus: { type: Boolean, default: true },
});

const user = mongoose.model("users", userSchema);
export default user;
