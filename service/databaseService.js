const dbServices = {};

dbServices.insertData = async (prisma, data) => {
  await prisma.create({ data });
};

dbServices.findUnique = async (prisma, query) => {
  const result = await prisma.findUnique({
    where: query,
  });

  return result;
}

module.exports = dbServices;
