import bcrypt from "bcrypt";

const hashGenerate = async (password) => {
  const passHash = await bcrypt.hash(password, 10);
  return passHash;
};

const hashCompare = async (password, dbPassword) => {
  const passHash = await bcrypt.compare(password, dbPassword);
  return passHash;
};

export default { hashGenerate, hashCompare };
