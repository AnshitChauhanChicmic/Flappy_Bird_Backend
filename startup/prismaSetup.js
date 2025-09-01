const fp = require("fastify-plugin");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

module.exports = fp(async (fastify) => {
  // Log DB connection
  try {
    await prisma.$connect();
    fastify.log.info("Connected to PostgreSQL via Prisma");
  } catch (err) {
    fastify.log.error("Failed to connect to PostgreSQL", err);
    process.exit(1);
  }

  // Attach prisma to Fastify instance
  fastify.decorate("prisma", prisma);

  // Disconnect Prisma when server shuts down
  fastify.addHook("onClose", async (app) => {
    await app.prisma.$disconnect();
    fastify.log.info("🔌 Disconnected from PostgreSQL");
  });
});
