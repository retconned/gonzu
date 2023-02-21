// import Image from "next/image";
import { Button } from "@ui/Button";
import Image from "next/image";
import Link from "next/link";

const LoadoutThumbnailProfile = ({
  loadoutName,
  loadoutLink,
  weaponBody,
  weaponType,
  imageSrc,
  profileLink,
}: {
  loadoutName: string | null;
  loadoutLink: string;
  weaponBody: string;
  weaponType: string;
  imageSrc: string;
  profileLink: string;
}) => {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-2 space-y-2 rounded-md border border-neutral-700 bg-neutral-800 p-4 duration-300  hover:border-lime-400">
        <div className="flex w-full flex-row items-center gap-x-4">
          <Link href={profileLink}>
            <div className="select-none rounded-full border-2 border-neutral-700 duration-200 hover:border-2 hover:border-lime-400 ">
              {imageSrc != null && imageSrc != "" ? (
                <Image
                  src={imageSrc}
                  alt={`${"username"}'s profile picture`}
                  width={40}
                  height={40}
                  className="select-none overflow-hidden rounded-full"
                />
              ) : (
                <div className="h-[30px] w-[30px] select-none rounded-full bg-neutral-600 " />
              )}
            </div>
          </Link>
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
              <Button intent={"outline"}>View build {">"}</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadoutThumbnailProfile;
