import jwt from "jsonwebtoken";
import moment from "moment";

const generateToken = async (user) => {
  let message = "";
  try {
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        role: user.role,
        iat: moment().unix(),
      },
      process.env.SK_JWT
    );
  } catch (e) {
    return message;
  }
};

export default { generateToken };
