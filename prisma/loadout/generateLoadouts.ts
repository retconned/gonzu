/* eslint-disable @typescript-eslint/no-explicit-any */
import { writeFile } from "fs/promises";
import rawLoadouts from "../../data/LOADOUTS_RAW.json";
import { prisma } from "../../src/server/db/client";

async function generateLoadouts() {
  let result = [];
  const getAllAttach = await prisma.attachment.findMany();
  for (const streamerProfile of rawLoadouts) {
    for (const loadout of streamerProfile) {
      loadout["weaponBody"] = loadout["name"];
      delete loadout.name;

      for (const attachment of loadout.attachments) {
        for (let index = 0; index < getAllAttach.length; index++) {
          const element = getAllAttach[index];

          const attachDbName = element?.name.toLowerCase();
          const attachName = attachment.name.toLowerCase();

          if (attachName.includes(attachDbName)) {
            attachment.id = element?.id;
          }
        }
        delete attachment.name;
        result = [...rawLoadouts];
      }
    }
    // result = [...rawLoadouts];
    await writeFile("./data/loadouts.json", JSON.stringify(result));
    // console.log(result);
  }
  console.log(`📦 generated ${result.length} loadouts.`);
}

generateLoadouts();
