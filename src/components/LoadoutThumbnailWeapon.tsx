// import Image from "next/image";
import Image from "next/image";
import Link from "next/link";

const LoadoutThumbnailWeapon = ({
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
      <div className="flex w-full flex-col items-center justify-center gap-2 space-y-2 rounded-md border border-neutral-700 bg-neutral-800 p-4">
        <div className="flex w-full flex-row items-center gap-x-4">
          {/* <Link> */}
          <div className="h-11 w-60 rounded-md  border border-neutral-700 bg-neutral-800">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={`${weaponBody}'s thumbnail image`}
                width={292.5}
                height={146.25}
                className="h-[42.25px] w-[262.5px] select-none object-contain"
              />
            ) : (
              <div className="h-11 w-60 bg-neutral-800" />
            )}
          </div>
          {/* </Link> */}
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-col gap-x-2 gap-y-2">
              <div className="text-left text-sm text-neutral-400">
                <span>Build: </span>
                <Link href={loadoutLink}>
                  <span className="text-white duration-150 hover:text-lime-400">
                    {loadoutName}
                  </span>
                </Link>
              </div>
              <div className="flex justify-start gap-x-4">
                <p className="text-left text-sm text-neutral-400">
                  Weapon: <span className="text-white">{weaponBody}</span>
                </p>
                <p className="rounded-md bg-neutral-400/20 px-2 py-0.5 text-center text-sm leading-none text-neutral-400">
                  {weaponType}
                </p>
              </div>
            </div>
            <Link href={`${loadoutLink}`}>
              <button className="w-full select-none rounded-md border border-lime-400 px-2 py-2 text-center text-lime-400 duration-150 hover:bg-lime-400 hover:text-white">
                View build {">"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadoutThumbnailWeapon;
