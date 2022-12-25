import Image from "next/image";

const SmallerLoadout = ({
  loadoutName,
  weaponBody,
  weaponType,
  imageSrc,
}: {
  loadoutName: string;
  weaponBody: string;
  weaponType: string;
  imageSrc: string;
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-2 rounded-md border border-neutral-700 bg-neutral-800 p-4">
        <Image
          src={imageSrc}
          alt="weapon's picture"
          width={292.5}
          height={146.25}
          className="h-[146.25px] w-[292.5px] select-none md:h-[146.25px] md:w-[292.5px]"
        />
        <div className="flex w-full flex-row items-end justify-between">
          <div className="">
            <p className="text-left text-sm text-neutral-400">
              Build: <span className="text-white">{loadoutName}</span>
            </p>
            <p className="text-left text-sm text-neutral-400">
              Weapon: <span className="text-white">{weaponBody}</span>
            </p>
          </div>
          <p className="rounded-md bg-neutral-400/20 px-2 py-0.5 text-center text-sm text-neutral-400">
            {weaponType}
          </p>
        </div>
        <button className="w-full rounded-md border border-lime-400 px-2 py-1 text-center text-lime-400">
          View build {">"}
        </button>
      </div>
    </>
  );
};

export default SmallerLoadout;
