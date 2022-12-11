import loadouts from "../../data/loadouts.json";
import { prisma } from "../../src/server/db/client";

async function generateGuns() {
  loadouts.map(async (loadouts: any) => {
    loadouts.forEach(async (loadout: any) => {
      await prisma.loadout.create({
        data: {
          loadoutName: `${loadout.author}'s ${loadout.weaponBody} build`,
          visible: false,
          likes: 0,
          attachments: loadout.attachments,
          weaponBody: loadout.weaponBody,
        },
      });
    });
  });
  await prisma.$disconnect();
  console.log("🌱 seeded loadouts.");
}

generateGuns();
