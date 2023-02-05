import Image from "next/image";
import Link from "next/link";
import type { profileShowcaseProps } from "../types/types";
import InputType from "./InputType";
import { Instagram, Tiktok, Twitch, Twitter, Youtube } from "./Socials";

const ProfileComponent = ({
  username,
  profileLink,
  loadouts,
  imageSrc,
  twitch,
  twitter,
  youtube,
  tiktok,
  instagram,
  input,
}: profileShowcaseProps) => {
  return (
    <>
      <div className="flex w-56 max-w-sm flex-col items-center justify-between space-y-2 rounded-md border border-neutral-700 bg-neutral-800 px-4 py-4 duration-200 hover:border-lime-400">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="outline-5 outline-offset-2 outline-red-600">
            {imageSrc != null ? (
              <Image
                draggable={"false"}
                src={imageSrc}
                alt={`${username}'s thumbnail image`}
                width={292.5}
                height={146.25}
                className="h-20 w-20 select-none overflow-hidden rounded-full"
              />
            ) : (
              <div className="h-20 w-20 select-none overflow-hidden rounded-full bg-neutral-600"></div>
            )}
          </div>
          <div className="ml-1 flex flex-row items-center justify-center gap-1">
            <p className="font-medium text-white">{username}</p>
            <InputType input={input} />
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-between">
          <div className="mb-1 rounded-md border border-neutral-700 p-1">
            <p className=" text-left text-sm text-neutral-400">
              Loadouts:{" "}
              <span className="text-lime-300">{loadouts?.length}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center space-x-4">
          <Twitch twitch={twitch} />
          <Twitter twitter={twitter} />
          <Youtube youtube={youtube} />
          <Tiktok tiktok={tiktok} />
          <Instagram instagram={instagram} />
        </div>
        <Link href={`${profileLink}`}>
          <button className="mt-2 w-full select-none rounded-md bg-lime-400 px-2 py-2 text-center font-medium text-neutral-900 duration-150 hover:bg-lime-500">
            View loadouts {">"}
          </button>
        </Link>
      </div>
    </>
  );
};

export default ProfileComponent;
