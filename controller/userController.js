const userController = {};

userController.signup = async (req, res) => {
  return res.send("Signed up successfully");
};

module.exports = userController;
