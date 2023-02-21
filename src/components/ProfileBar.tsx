import Image from "next/image";
import type { profileBarProps } from "../types/types";
import { Instagram, Tiktok, Twitch, Twitter, Youtube } from "./Socials";

const ProfileBar = ({
  username,
  imageSrc,
  instagram,
  twitter,
  twitch,
  tiktok,
  youtube,
}: profileBarProps) => {
  return (
    <div className=" flex w-full flex-wrap items-center justify-center gap-2 rounded-md border border-neutral-700 bg-neutral-800 px-10 py-4 text-neutral-200 sm:justify-between">
      <div className="flex flex-row items-center space-x-4 ">
        <div className=" flex items-center gap-4 text-neutral-200 ">
          {imageSrc != null && imageSrc != "" ? (
            <Image
              draggable={"false"}
              src={imageSrc}
              alt={`${username}'s profile picture`}
              width={30}
              height={30}
              className="overflow-hidden rounded-full"
            />
          ) : (
            <div className="h-[30px] w-[30px] rounded-full bg-neutral-600" />
          )}

          <p className="select-none font-medium duration-150 hover:text-lime-400 md:text-lg">
            {username}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-4">
        <Twitter twitter={twitter} />
        <Twitch twitch={twitch} />
        <Youtube youtube={youtube} />
        <Tiktok tiktok={tiktok} />
        <Instagram instagram={instagram} />
      </div>
    </div>
  );
};

export default ProfileBar;
