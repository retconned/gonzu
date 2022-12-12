/* eslint-disable @typescript-eslint/no-explicit-any */
import { writeFile } from "fs/promises";
import rawData from "../../data/GONZU_RAW.json";

async function generateGuns() {
  const result: string[] = [];

  rawData.map(async (weapon: any) => {
    weapon.name = weapon.name.toUpperCase();
    delete weapon.tier;
    delete weapon.pickRate;
    delete weapon.attachments;
    result.push(weapon);
  });
  await writeFile("./data/weapons.json", JSON.stringify(result));
  console.log(`🔫 generated ${result.length} weapons.`);
}

generateGuns();
