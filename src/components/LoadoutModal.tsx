import Image from "next/image";

interface attachments {
  slot: string;
  attachmentName: string;
  horizontalTune: number;
  verticalTune: number;
}
const LoadoutModal = ({
  loadoutName,
  lastUpdated,
  imageSrc,
  attachments,
}: {
  loadoutName: string;
  lastUpdated: string;
  imageSrc: string;
  attachments?: attachments[];
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center rounded-md bg-neutral-800 p-4">
        <div className="flex flex-col items-center justify-center pt-4">
          <p className="text-sm text-white">{loadoutName}</p>
          <p className=" text-left text-sm text-neutral-400">
            Last updated: <span className="text-white">{lastUpdated}</span>
          </p>
        </div>
        <Image
          src={imageSrc}
          alt="weapon's picture"
          width={390}
          height={195}
          className="h-[146.25px] w-[292.5px] select-none md:h-[195px] md:w-[390px]"
          priority={true}
        />
        <div className="container m-auto flex flex-col items-center gap-4 md:grid md:grid-cols-2 md:flex-row md:flex-wrap-reverse md:justify-around md:gap-4 ">
          <div className="col-span-2 flex items-center justify-center">
            <AttachmentComponent
              slot="Optic"
              attachmentName="Aim OP-V4"
              horizontalTune={0.1}
              verticalTune={0.1}
            />
          </div>
          <AttachmentComponent
            slot="Muzzle"
            attachmentName="Harbinger D21"
            horizontalTune={0.1}
            verticalTune={0.1}
          />
          <AttachmentComponent
            slot="Muzzle"
            attachmentName="Harbinger D23"
            horizontalTune={0.1}
            verticalTune={0.1}
          />
          <AttachmentComponent
            slot="Muzzle"
            attachmentName="Harbinger D24"
            horizontalTune={0.1}
            verticalTune={0.1}
          />
          <AttachmentComponent
            slot="Muzzle"
            attachmentName="Harbinger D21"
            horizontalTune={0.1}
            verticalTune={0.1}
          />
        </div>
      </div>
    </>
  );
};

export default LoadoutModal;

const AttachmentComponent = ({
  attachmentName,
  slot,
  verticalTune,
  horizontalTune,
}: attachments) => {
  return (
    <div className="">
      <div className="flex h-24 w-72 flex-col items-stretch justify-center space-y-1 rounded-md border border-neutral-700 p-4">
        <div className="flex justify-between">
          <p className="text-left text-sm text-neutral-400 ">{slot}</p>
          <p className="truncate text-left text-sm text-white">
            {attachmentName}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-left text-sm text-neutral-400 ">Vertical Tune</p>
          <p className="truncate text-left text-sm text-white">
            {verticalTune}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-left text-sm text-neutral-400 ">Horizontal Tune</p>
          <p className="truncate text-left text-sm text-white">
            {horizontalTune}
          </p>
        </div>
      </div>
    </div>
  );
};
