const bcrypt = require("bcrypt");
const CONSTANT = require("./constant");

const common = {};

common.hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, CONSTANT.SALT_ROUNDS);
  return hashedPassword;
};

common.comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

module.exports = common;
