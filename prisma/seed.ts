import { writeFile } from "fs/promises";
import attachments from "../data/attachments.json";
import rawData from "../data/GONZU_RAW.json";
import guns from "../data/guns-experimental.json";
import { prisma } from "../src/server/db/client";

// first run processData to generate guns.json then un-comment run to seed the gun file into db

async function processData() {
  const result: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawData.map(async (element: any) => {
    // remove weapon tier & pick rate
    delete element.tier;
    delete element.pickRate;

    delete element.attachments;
    const process = element;
    // to write into a file
    result.push(process);
  });
  await writeFile("./data/guns-experimental.json", JSON.stringify(result));
}

//processData();

async function seedWeapons() {
  await prisma.weapon.createMany({
    data: guns,
  });
  await prisma.$disconnect();
}

// seedWeapons();

async function processAttachmentData() {
  const attachments: string[] = [];
  const uAttachments: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawData.map(async (element: any) => {
    // remove weapon tier & pick rate
    delete element.tier;
    delete element.pickRate;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    element.attachments.forEach((attachment: any) => {
      // remove unlock data
      delete attachment.unlock;
      // rename attachment type into attachment slot
      attachment["slot"] = attachment["type"];
      delete attachment.type;
      attachments.push({ ...attachment, weaponParent: element.name });
    });
  });
  // filter and only leave unique attachments
  attachments.map((x: any) =>
    uAttachments.filter((a: any) => a.name == x.name).length > 0
      ? null
      : uAttachments.push(x),
  );

  // to write into a file
  await writeFile("./data/attachments.json", JSON.stringify(attachments));
}

//processAttachmentData();

async function seedAttachments() {
  for (let i = 0; i < attachments.length; i++) {
    await prisma.attachment.upsert({
      where: {
        name: attachments[i]!.name,
      },
      create: {
        name: attachments[i]!.name,
        slot: attachments[i]!.slot,
        WeaponParent: { connect: { name: attachments[i]!.weaponParent } },
      },
      update: {
        WeaponParent: { connect: { name: attachments[i]!.weaponParent } },
      },
    });
  }
  await prisma.$disconnect();
}

seedAttachments();
