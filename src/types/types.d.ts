type AttachmentProps = {
  id: number;
  name: string;
  slot: string;
};

type WeaponBuild = {
  name: string;
  attachmentId: number;
  attachments: Array<AttachmentBuild | undefined>;
  likes: number;
  visible: boolean;
};

type AttachmentBuild = {
  Id: number;
  horizontalTune: string;
  verticalTune: string;
};

interface Result {
  category: Category;
  game: Game;
  type: Type;
  author: string;
  attachments: Attachment[];
  weaponBody: string;
}

interface Attachment {
  slot: Slot;
  verticalTune: null | string;
  horizontalTune: null | string;
  id: number | string;
}

export enum Slot {
  Ammunition = "Ammunition",
  Barrel = "Barrel",
  Bolt = "Bolt",
  Comb = "Comb",
  Guard = "Guard",
  Laser = "Laser",
  Magazine = "Magazine",
  Muzzle = "Muzzle",
  Optic = "Optic",
  RearGrip = "Rear Grip",
  Stock = "Stock",
  TriggerAction = "Trigger Action",
  Underbarrel = "Underbarrel",
}

export enum Category {
  Acceptable = "acceptable",
  Meta = "meta",
  PureMeta = "pure_meta",
}

export enum Game {
  Mw2 = "mw2",
}

export enum Type {
  Ar = "AR",
  BRifles = "B.RIFLES",
  Lmg = "LMG",
  Pistol = "Pistol",
  Rifle = "RIFLE",
  Shotgun = "SHOTGUN",
  Smg = "SMG",
  Sniper = "SNIPER",
}