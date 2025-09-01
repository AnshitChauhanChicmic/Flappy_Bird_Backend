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

userController.googleOAuth = async (req, res) => {
  const token =
    await req.server.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

  // Fetch user info from Google
  const userInfo = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: { Authorization: `Bearer ${token.access_token}` },
    }
  ).then((res) => res.json());

  try{
    user = await req.server.prisma.user.create({
      data: {
        firstName: userInfo.given_name || "",
        lastName: userInfo.family_name || "",
        email: userInfo.email,
        password: "",
      },
    });
  }catch(err){
    if (err.code == "P2002") {
      return res.status(409).send({ Error: "Email already exists!" });
    }
    return res.send({ Error: err });
  }


  return res.send({ message: "Login successful", user });
};

module.exports = userController;
