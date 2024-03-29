type AttachmentProps = {
  id: number;
  name: string;
  slot: string;
};

// type WeaponBuild = {
//   name: string;
//   attachmentId: number;
//   attachments: Array<AttachmentBuild | undefined>;
//   likes: number;
//   visible: boolean;
// };

type AttachmentBuild = {
  name: string;
  id: number;
  horizontalTune: number;
  verticalTune: number;
};

interface Result {
  category: Category;
  game: Game;
  type: Type;
  author: string;
  attachments: Attachment[];
  weaponBody: string;
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

interface Attachment {
  slot: Slot;
  verticalTune: number | undefined;
  horizontalTune: number | undefined;
  id: number | string;
}

type attachmentProps = Omit<LoadoutAttachments, "id">;
type buildAttachments = Omit<AttachmentBuild, "name">;

interface LoadoutAttachments extends Attachment {
  name: string;
}

type WeaponBuild = {
  name: string;
  attachmentId: number;
  attachments: Array<buildAttachments | undefined>;
  likes: number;
  visible: boolean;
};

type ProfileInput = {
  username: string;
  twitch: string;
  twitter: string;
  youtube: string;
  tiktok: string;
  instagram: string;
  is_streamer: boolean;
  language?: string;
  input: string;
};

interface ProfileInputOnboarding extends ProfileInput {
  profile_image_url: string;
}

type WeaponWithAttach = {
  name: string;
  brand: string;
  image: string;
  type: string;
  bullets: string;
  Attachments?: AttachmentProps[];
};

type buildAttachments2 = Omit<WeaponWithAttach, "Attachments">;

interface LoadedAttachmentType extends AttachmentBuild {
  name: string | number;
}

type profileBarProps = {
  username: string;
  imageSrc: string;
  instagram: string | null;
  twitter: string | null;
  twitch: string | null;
  tiktok: string | null;
  youtube: string | null;
};

interface profileShowcaseProps extends profileBarProps {
  profileLink: string;
  loadouts: Array<string>;
  input: string | undefined;
}

type twitchResponeBody = {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: Array<string>;
  tags: Array<string>;
  is_mature: boolean;
};
