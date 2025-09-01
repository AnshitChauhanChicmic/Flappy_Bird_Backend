const userController = require("../controller/userController");

async function routes(fastify, options) {
  fastify.get("/signup", userController.signup);
}

module.exports = routes;
