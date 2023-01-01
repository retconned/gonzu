import Image from "next/image";
import {
  FaInstagram,
  FaTiktok,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

interface profileBarProps {
  username: string;
  imageSrc: string;
  instagram?: string;
  twitter?: string;
  twitch?: string;
  tiktok?: string;
  youtube?: string;
}

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
    <div className="flex w-8/12 flex-wrap items-center justify-between rounded-md border border-neutral-700 bg-neutral-800 px-10 py-4 text-neutral-200">
      <div className="flex flex-row items-center space-x-4 ">
        <Image
          src={imageSrc}
          alt=""
          width={30}
          height={30}
          className="overflow-hidden rounded-full "
        />
        <p className="pb-1 text-lg font-medium">{username}</p>
      </div>
      <div className="flex flex-row items-center justify-center space-x-4">
        <a href={twitch}>
          <FaTwitch
            size={22}
            className="fill-lime-400 duration-100 hover:fill-lime-600"
          />
        </a>
        <a href={twitter}>
          <FaTwitter
            size={22}
            className="fill-lime-400 duration-100 hover:fill-lime-600"
          />
        </a>
        <a href={youtube}>
          <FaYoutube
            size={22}
            className="fill-lime-400 duration-100 hover:fill-lime-600"
          />
        </a>
        <a href={tiktok}>
          <FaTiktok
            size={22}
            className="fill-lime-400 duration-100 hover:fill-lime-600"
          />
        </a>
        <a href={instagram}>
          <FaInstagram
            size={22}
            className="fill-lime-400 duration-100 hover:fill-lime-600"
          />
        </a>
      </div>
    </div>
  );
};

export default ProfileBar;