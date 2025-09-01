const bcrypt = require("bcrypt");
const CONSTANT = require("./constant");

const common = {};

common.hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, CONSTANT.SALT_ROUNDS);
  return hashedPassword;
};

common.comparePassword = (password, hashPassword) => {
  bcrypt.compare(password, hashPassword, (err, result) => {
    if (err) {
      console.error("Error comparing password:", err);
      throw err;
    }

    return result;
  });
};

module.exports = common;
