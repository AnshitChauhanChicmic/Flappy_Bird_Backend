const userController = require("../controller/userController");
const schemaValidation = require('../middleware/schemaValidation')

async function routes(fastify, options) {
  fastify.post("/signup", {schema: schemaValidation.registerUser}, userController.signup);
}

module.exports = routes;
