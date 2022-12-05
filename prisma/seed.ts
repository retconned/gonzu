import { writeFile } from "fs/promises";
import attachments from "../data/attachments.json";
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

async function seedWeapons() {
  for (const gun of guns) {
    await prisma.weapon.create({
      data: {
        brand: gun.brand,
        image: gun.image,
        name: gun.name,
        type: gun.type,
        attachments: {},
        bullets: gun.bullets,
      },
    });
  }
  await prisma.$disconnect();
}

seedWeapons();

async function processAttachmentData() {
  const attachments: string[] = [];
  const uAttachments: string[] = [];

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
      attachments.push(element);
    });
  });
  // filter and only leave unique attachments
  attachments.map((x: any) =>
    uAttachments.filter((a: any) => a.name == x.name).length > 0
      ? null
      : uAttachments.push(x),
  );

  // to write into a file
  await writeFile("./data/attachments.json", JSON.stringify(uAttachments));
}

// processAttachmentData();

async function seedAttachments() {
  await prisma.attachment.createMany({
    data: attachments,
  });
  await prisma.$disconnect();
}

// seedAttachments();
