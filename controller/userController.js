const dbServices = require("../service/databaseService");
const common = require("../utils/common");

const userController = {};

userController.signup = async (req, res) => {
  try {
    const userData = req.body;

    // hash password
    const hashedPassword = await common.hashPassword(userData.password);
    userData.password = hashedPassword;
    await dbServices.insertData(req.server.prisma.user, userData);
    return res.send("Signed up successfully");
  } catch (err) {
    if (err.code == "P2002") {
      return res.status(409).send({ Error: "Email already exists!" });
    }
    return res.send({ Error: err });
  }
};

module.exports = userController;
