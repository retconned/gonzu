// this file only purpose is to generate a loadout file from the raw input

import { writeFile } from "fs/promises";
import rawLoadouts from "../../data/LOADOUTS_RAW_1.json";
import { prisma } from "../../src/server/db/client";
import type { Result } from "../../src/types/types";

async function generateLoadouts() {
  let result: Array<Result> = [];
  const getAllAttach = await prisma.attachment.findMany();
  await prisma.$disconnect();

  for (const streamerProfile of rawLoadouts) {
    for (const loadout of streamerProfile as any) {
      loadout["weaponBody"] = loadout["name"];
      delete loadout.name;
      for (const attachment of loadout.attachments) {
        for (let index = 0; index < getAllAttach.length; index++) {
          const element = getAllAttach[index];

          const attachDbName = element?.name.toLowerCase();
          const attachName = attachment.name.toLowerCase();

          if (attachName.includes(attachDbName as string)) {
            attachment.id = element?.id;
          }
        }
        delete attachment.name;
        result = [...rawLoadouts] as any;
      }
    }
    result = [...rawLoadouts] as any;
    await writeFile("./data/loadouts_1.json", JSON.stringify(result));
    // console.log(result);
  }
  console.log(`📦 generated ${result.length} loadouts.`);
  // console.log("just ignore the whole file");
}

generateLoadouts();
