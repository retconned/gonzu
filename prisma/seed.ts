import { writeFile } from "fs/promises";
import rawData from "../data/GONZU_RAW.json";
import guns from "../data/guns.json";
import { prisma } from "../src/server/db/client";

// first run processData to generate guns.json then un-comment run to seed the gun file into db

async function processData() {
  const result: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawData.map(async (element: any) => {
    // remove weapon tier & pick rate
    delete element.tier;
    delete element.pickRate;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    element.attachments.forEach((element: any) => {
      // remove unlock data
      delete element.unlock;
      // rename attachment type into attachment slot
      element["slot"] = element["type"];
      delete element.type;
    });
    const process = element;
    // to write into a file
    result.push(process);
  });
  await writeFile("./data/guns.json", JSON.stringify(result));
}

processData();

async function run() {
  for (const gun of guns) {
    await prisma.weapon.create({
      data: {
        brand: gun.brand,
        image: gun.image,
        name: gun.name,
        type: gun.type,
        attachments: gun.attachments,
        bullets: gun.bullets,
      },
    });
  }
  await prisma.$disconnect();
}

// run();
