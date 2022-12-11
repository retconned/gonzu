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
