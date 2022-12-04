// import { faker } from "@faker-js/faker";
import { prisma } from "../src/server/db/client";

async function run() {
  console.log("");
  //   const userData = Array(5)
  //     .fill(null)
  //     .map(() => {
  //       return {
  //         name: faker.internet.userName().toLowerCase(),
  //         email: faker.internet.email().toLocaleLowerCase(),
  //         image: faker.image.avatar(),
  //       };
  //     });
  //   const createUsers = userData.map((user) =>
  //     prisma.user.create({ data: user })
  //   );
  // const users = await prisma.$transaction(createUsers);
  await prisma.$disconnect();
}

// run();
