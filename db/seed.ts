import { PrismaClient } from "@prisma/client";
import sampleData from "@/db/sample-data";

(async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany().catch((e) => {
    console.log("Database seeding failed...");
  });

  await prisma.account.deleteMany().catch((e) => {
    console.log("database seeding failed...");
  });

  await prisma.session.deleteMany().catch((e) => {
    console.log("Database seeding failed...");
  });

  await prisma.verificationToken.deleteMany().catch((e) => {
    console.log("Database seeding failed...");
  });

  await prisma.user.deleteMany().catch((e) => {
    console.log("Database seeding failed...");
  });

  await prisma.product.createMany({ data: sampleData.products }).catch((e) => {
    console.log("Database seeding failed...");
  });

  await prisma.user.createMany({ data: sampleData.users }).catch((e) => {
    console.log("Database seeding failed...");
  });

  console.log("Database seeded successfully");
})();
