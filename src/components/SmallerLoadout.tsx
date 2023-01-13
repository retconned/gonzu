import Image from "next/image";
import Link from "next/link";

const SmallerLoadout = ({
  loadoutName,
  loadoutLink,
  weaponBody,
  weaponType,
  imageSrc,
}: {
  loadoutName: string | null;
  loadoutLink: string;
  weaponBody: string;
  weaponType: string;
  imageSrc: string;
}) => {
  return (
    <>
      <div className="flex max-w-sm flex-col items-center justify-center space-y-2 rounded-md border border-neutral-700 bg-neutral-800 p-4">
        <Image
          src={imageSrc}
          alt={`${weaponBody}'s thumbnail image`}
          width={292.5}
          height={146.25}
          className="h-[146.25px] w-[292.5px] select-none object-contain md:h-[146.25px] md:w-[292.5px]"
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
        <Link href={`${loadoutLink}`}>
          <button className="mt-2 w-full rounded-md border border-lime-400 px-2 py-2 text-center text-lime-400 duration-150 hover:bg-lime-400 hover:text-white">
            View build {">"}
          </button>
        </Link>
      </div>
    </>
  );
};

export default SmallerLoadout;
