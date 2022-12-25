import { FaDiscord, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="h-0.5 w-full bg-neutral-600" />
      <div className="flex w-screen flex-col items-center justify-center bg-neutral-800 py-3 px-10">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="font-medium text-neutral-400">Follow GONZU on</p>
          <div className="flex flex-row items-center justify-center space-x-4">
            <FaTwitter
              size={22}
              className="fill-lime-400 duration-100 hover:fill-lime-600"
            />
            <FaTiktok
              size={22}
              className="fill-lime-400 duration-100 hover:fill-lime-600"
            />
            <FaDiscord
              size={22}
              className="fill-lime-400 duration-100 hover:fill-lime-600"
            />
            <FaInstagram
              size={22}
              className="fill-lime-400 duration-100 hover:fill-lime-600"
            />
          </div>
          <div className="flex space-x-4 text-neutral-400">
            <a href="">
              <p className="text-sm duration-100 hover:text-white hover:underline">
                About
              </p>
            </a>
            <a href="">
              <p className="text-sm duration-100 hover:text-white hover:underline">
                Terms of Service
              </p>
            </a>
            <a href="">
              <p className="text-sm duration-100 hover:text-white hover:underline">
                Privacy and Cookie Policy
              </p>
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-center text-xs font-normal text-neutral-400">
              GONZU is not endorsed by, directly affiliated with Electronic
              Arts, Dice, Activision Blizzard, Activision Publishing Inc, All
              content, games titles, trade names and/or trade dress, trademarks,
              artwork and associated imagery are trademarks and/or copyright
              material of their respective owners.
            </p>
            <p className="text-center text-xs font-normal text-neutral-400">
              ©GONZU {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
