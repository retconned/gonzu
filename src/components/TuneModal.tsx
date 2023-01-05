import { type NextPage } from "next";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface TuneModalProps {
  setVisibility: Dispatch<SetStateAction<boolean>>;
  handleAttachmentAddition: (
    verticalTune: number,
    horizontalTune: number,
  ) => void;
}

const TuneModal: NextPage<TuneModalProps> = ({
  setVisibility,
  handleAttachmentAddition,
}) => {
  const [horizontalTune, setHorizontalTune] = useState<number>(0);
  const [verticalTune, setVerticalTune] = useState<number>(0);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex h-full w-full  items-center justify-center bg-neutral-900 bg-opacity-60  backdrop-blur-sm">
      <div className="flex h-[420px] w-[500px] flex-col items-center justify-center gap-y-4 rounded-md bg-neutral-900  text-white shadow-sm shadow-black/40">
        <p>add tunning amount</p>
        <input
          type="text"
          placeholder="Horizontal Tune"
          onChange={(e) => setHorizontalTune(Number(e.target.value))}
          className="rounded-md bg-neutral-800 p-1 text-center placeholder:text-center "
        />
        <input
          type="text"
          placeholder="Vertical Tune"
          onChange={(e) => setVerticalTune(Number(e.target.value))}
          className="rounded-md bg-neutral-800 p-1 text-center placeholder:text-center"
        />
        <button
          type="button"
          onClick={() => handleAttachmentAddition(verticalTune, horizontalTune)}
          className="rounded-md bg-blue-500 p-2 font-bold  hover:bg-blue-700"
        >
          Add Attachment
        </button>
        <button
          type="button"
          onClick={() => setVisibility(false)}
          className="rounded-md bg-red-500 p-2 font-bold duration-150 hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TuneModal;
