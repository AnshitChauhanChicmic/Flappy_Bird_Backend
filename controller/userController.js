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

userController.login = async (req, res) => {
  const {email, password} = req.body;
  const user = await dbServices.findUnique(req.server.prisma.user, {email});
  if(user){
    const matchPassword = await common.comparePassword(password, user.password);
    if(matchPassword){
      let token = await common.generateJWTToken(user.id);
      res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
      })
      return res.send({message: 'Login successfully', accessToken: token})
    }
  }
  return res.status(401).send({message: 'Invalid email or password'})
}

module.exports = userController;
