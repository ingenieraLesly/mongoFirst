import User from "../models/user.js";

const isChanges = async (user, password) => {
  let changes = false;
  const userData = await User.findOne({
    name: user.name,
    email: user.email,
    password: password,
    roleID: user.roleID,
  });
  return userData ? (changes = true) : changes;
};

export default { isChanges };