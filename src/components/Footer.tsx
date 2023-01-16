import { Discord, Instagram, Tiktok, Twitter } from "./Socials";

const Footer = () => {
  return (
    <div className="w-full">
      {/* <div className="h-0.5 w-full bg-neutral-600" /> */}
      <div className="flex flex-col items-center justify-center bg-neutral-800 py-3 px-10 last:w-full">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="font-medium text-neutral-400">Follow GONZU on</p>
          <div className="flex flex-row items-center justify-center space-x-4">
            <Twitter twitter={"https://twitter.com/"} />
            <Tiktok tiktok={"https://tiktok.com/@"} />
            <Discord discord={"https://discord.gg/"} />
            <Instagram instagram={"https://instagram.com/"} />
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
    </div>
  );
};

export default Footer;
