/* eslint-disable @typescript-eslint/no-non-null-assertion */

import attachments from "../../data/attachments.json";
import { prisma } from "../../src/server/db/client";

const seedAttachments = async () => {
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
  console.log("🌱 seeded attachments.");
};

seedAttachments();
