const prismaSetup = require("./prismaSetup");

const serverStartup = async (fastify) => {
  fastify.register(prismaSetup);
  fastify.register(require("../routes/userRoutes"));
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info("Server running on port 3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

module.exports = serverStartup;
