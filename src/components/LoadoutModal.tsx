import Image from "next/image";
import type { LoadoutAttachments, Slot, attachmentProps } from "../types/types";

const LoadoutModal = ({
  loadoutName,
  lastUpdated,
  imageSrc,
  attachments,
}: {
  loadoutName: string | null;
  lastUpdated?: Date;
  imageSrc: string;
  attachments: LoadoutAttachments[];
}) => {
  return (
    <>
      <div className="flex max-w-fit flex-col items-center justify-center rounded-md bg-neutral-800 p-4">
        <div className="flex flex-col items-center justify-center pt-4">
          <p className="text-sm text-white">{loadoutName}</p>
          <p className=" text-left text-sm text-neutral-400">
            Last updated:{" "}
            <span className="text-white">{lastUpdated?.toDateString()}</span>
          </p>
        </div>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="weapon's picture"
            width={390}
            height={195}
            className="h-[146.25px] w-[292.5px] select-none md:h-[195px] md:w-[390px]"
            priority={true}
          />
        ) : (
          ""
        )}
        {attachments ? (
          <div className="container m-auto flex flex-col items-center gap-4 md:grid md:grid-cols-2 md:flex-row md:flex-wrap-reverse md:justify-around md:gap-4 ">
            <div className="col-span-2 flex items-center justify-center">
              <AttachmentComponent
                slot={attachments[1]?.slot as Slot}
                name={attachments[1]?.name as string}
                horizontalTune={attachments[1]?.horizontalTune}
                verticalTune={attachments[1]?.verticalTune}
              />
            </div>
            <AttachmentComponent
              slot={attachments[0]?.slot as Slot}
              name={attachments[0]?.name as string}
              horizontalTune={attachments[0]?.horizontalTune}
              verticalTune={attachments[0]?.verticalTune}
            />
            <AttachmentComponent
              slot={attachments[2]?.slot as Slot}
              name={attachments[2]?.name as string}
              horizontalTune={attachments[2]?.horizontalTune}
              verticalTune={attachments[2]?.verticalTune}
            />
            <AttachmentComponent
              slot={attachments[3]?.slot as Slot}
              name={attachments[3]?.name as string}
              horizontalTune={attachments[3]?.horizontalTune}
              verticalTune={attachments[3]?.verticalTune}
            />
            <AttachmentComponent
              slot={attachments[4]?.slot as Slot}
              name={attachments[4]?.name as string}
              horizontalTune={attachments[4]?.horizontalTune}
              verticalTune={attachments[4]?.verticalTune}
            />
          </div>
        ) : (
          <p>loading</p>
        )}
      </div>
    </>
  );
};

export default LoadoutModal;

const AttachmentComponent = ({
  name,
  slot,
  verticalTune,
  horizontalTune,
}: attachmentProps) => {
  return (
    <div className="">
      <div className="flex h-24 w-72 flex-col items-stretch justify-center space-y-1 rounded-md border border-neutral-700 p-4">
        <div className="flex justify-between">
          <p className="text-left text-sm text-neutral-400 ">{slot}</p>
          <p className="truncate text-left text-sm text-white">{name}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-left text-sm text-neutral-400 ">Vertical Tune</p>
          <p className="truncate text-left text-sm text-white">
            {verticalTune != null ? (
              verticalTune
            ) : (
              <span className="text-neutral-400">No tunning</span>
            )}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-left text-sm text-neutral-400 ">Horizontal Tune</p>
          <p className="truncate text-left text-sm text-white">
            {horizontalTune != null ? (
              horizontalTune
            ) : (
              <span className="text-neutral-400">No tunning</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
