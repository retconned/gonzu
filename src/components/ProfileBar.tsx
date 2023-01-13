import Image from "next/image";
import type { profileBarProps } from "../types/types";
import Instagram from "./Socials/Instagram";
import Tiktok from "./Socials/Tiktok";
import Twitch from "./Socials/Twitch";
import Twitter from "./Socials/Twitter";
import Youtube from "./Socials/Youtube";

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
    <div className="flex w-full flex-wrap items-center justify-between rounded-md border border-neutral-700 bg-neutral-800 px-10 py-4 text-neutral-200">
      <div className="flex flex-row items-center space-x-4 ">
        <div className=" flex items-center gap-4 text-neutral-200 ">
          <Image
            src={imageSrc}
            alt={`${username}'s profile picture`}
            width={30}
            height={30}
            className="overflow-hidden rounded-full"
          />

          <p className="select-none text-lg font-medium duration-150 hover:text-lime-400">
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
