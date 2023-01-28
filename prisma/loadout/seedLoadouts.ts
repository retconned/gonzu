import loadouts from "../../data/loadouts.json";
import { prisma } from "../../src/server/db/client";

async function generateGuns() {
  for (const profile of loadouts) {
    profile.forEach(async (loadout) => {
      if (loadout.author === undefined) {
        console.log("undefined found", loadout);
      } else {
        await prisma.loadout.create({
          data: {
            loadoutName: `${loadout?.author}'s ${loadout.weaponBody} build`,
            visible: false,
            likes: 0,
            attachments: loadout.attachments,
            weaponBody: loadout.weaponBody,
          },
        });
        console.log(`${loadout?.author}'s ${loadout.weaponBody} build`);
      }
    });
  }

  console.log("🌱 seeded loadouts.");
}

generateGuns();
