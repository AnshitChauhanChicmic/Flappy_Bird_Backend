const dbServices = {};

dbServices.insertData = async (prisma, data) => {
  await prisma.create({ data });
};

module.exports = dbServices;
