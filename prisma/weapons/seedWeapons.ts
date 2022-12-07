/* eslint-disable @typescript-eslint/no-unused-vars */
import weapons from "../../data/weapons.json";
import { prisma } from "../../src/server/db/client";

const seedWeapons = async () => {
  await prisma.weapon.createMany({
    data: weapons,
  });
  await prisma.$disconnect();
  console.log("🌱 seeded weapons.");
};

seedWeapons();
