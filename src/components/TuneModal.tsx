import { type NextPage } from "next";
import Head from "next/head";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

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
    <div className="fixed top-0 bottom-0 left-0 right-0 flex h-full w-full  items-center justify-center bg-black bg-opacity-20">
      <div className="flex h-[420px] w-[500px] flex-col items-center justify-center gap-y-4 bg-purple-700 bg-opacity-60 backdrop-blur">
        <input
          type="text"
          placeholder="Horizontal Tune"
          onChange={(e) => setHorizontalTune(+e.target.value)}
        />
        <input
          type="text"
          placeholder="Vertical Tune"
          onChange={(e) => setVerticalTune(+e.target.value)}
        />
        <button type="button" onClick={() => setVisibility(false)}>
          Cancel
        </button>
        <button
          type="button"
          onClick={() => handleAttachmentAddition(verticalTune, horizontalTune)}
        >
          Add Attachment
        </button>
      </div>
    </div>
  );
};

export default TuneModal;
