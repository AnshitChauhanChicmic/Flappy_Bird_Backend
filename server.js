const fastify = require("fastify")({ logger: true });
const serverStartup = require("./startup/serverStartup");

const startServer = async () => {
  await serverStartup(fastify);
};

startServer().then(() => {
  console.log("Server running");
});
