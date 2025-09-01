const bcrypt = require("bcrypt");
const CONSTANT = require("./constant");
const jwt = require("jsonwebtoken");

const common = {};

common.hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, CONSTANT.SALT_ROUNDS);
  return hashedPassword;
};

common.comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

common.generateJWTToken = async (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    "$$$$",
    { expiresIn: "24h" }
  );
};

common.verifyJWTToken = async (token) => {
  await jwt.verify(token, '$$$$');
}

module.exports = common;
