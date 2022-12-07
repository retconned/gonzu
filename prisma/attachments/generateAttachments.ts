/* eslint-disable @typescript-eslint/no-explicit-any */
import { writeFile } from "fs/promises";
import rawData from "../../data/GONZU_RAW.json";

async function generateAttachments() {
  const attachments: string[] = [];
  const uAttachments: string[] = [];

  rawData.map(async (weapon: any) => {
    delete weapon.tier;
    delete weapon.pickRate;
    weapon.attachments.forEach((attachment: any) => {
      delete attachment.unlock;
      attachment["slot"] = attachment["type"];
      delete attachment.type;
      attachments.push({ ...attachment, weaponParent: weapon.name });
    });
  });
  attachments.map((x: any) =>
    uAttachments.filter((a: any) => a.name == x.name).length > 0
      ? null
      : uAttachments.push(x),
  );
  await writeFile("./data/attachments.json", JSON.stringify(attachments));
  console.log(`🔌 generated ${uAttachments.length} attachments.`);
}

generateAttachments();
