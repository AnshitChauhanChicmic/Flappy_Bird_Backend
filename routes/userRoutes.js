const userController = require("../controller/userController");
const schemaValidation = require('../middleware/schemaValidation')

async function routes(fastify, options) {
  fastify.post("/signup", {schema: schemaValidation.registerUser}, userController.signup);

  fastify.get('/login/google/callback', userController.googleOAuth);

  fastify.post('/login', {schema: schemaValidation.loginUser},userController.login)
}

module.exports = routes;
