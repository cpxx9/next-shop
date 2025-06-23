import { PrismaClient } from "@prisma/client";
import sampleData from "@/db/sample-data";

(async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany().catch((e) => {
    console.log("Database seeding failed...");
  });

  await prisma.product.createMany({ data: sampleData.products }).catch((e) => {
    console.log("Database seeding failed...");
  });

  console.log("Database seeded successfully");
})();
