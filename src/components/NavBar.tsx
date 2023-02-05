import Link from "next/link";
import { FaBoxes, FaRobot, FaUserFriends } from "react-icons/fa";

const NavBar = () => {
  return (
    <>
      <div className="flex w-full items-center justify-between bg-neutral-800 py-3 px-10">
        <Link href={"/"}>
          <p className="text-left text-xl font-bold text-white">GONZU</p>
        </Link>
        <div className="flex items-center justify-center gap-[30px] ">
          <Link href={"/loadouts"}>
            <div className="group flex flex-shrink-0 flex-grow-0 items-center justify-start space-x-2 rounded-md px-3.5 py-2.5 duration-100 hover:bg-neutral-700 ">
              <FaBoxes className="fill-white group-hover:fill-lime-400" />
              <p className="flex-shrink-0 flex-grow-0 text-left text-sm font-medium text-white group-hover:text-lime-400">
                Loadouts
              </p>
            </div>
          </Link>
          <Link href={"/streamers"}>
            <div className="group flex flex-shrink-0 flex-grow-0 items-center justify-start space-x-2 rounded-md px-3.5 py-2.5 duration-100 hover:bg-neutral-700 ">
              <FaUserFriends className="fill-white group-hover:fill-lime-400" />
              <p className="flex-shrink-0 flex-grow-0 text-left text-sm font-medium text-white group-hover:text-lime-400">
                Streamers
              </p>
            </div>
          </Link>

          <div
            className="group relative flex select-none items-center justify-start space-x-2 rounded-md px-3.5 py-2.5 duration-200 "
            title="Coming soon"
          >
            <FaRobot className="fill-neutral-400" />
            <p className="flex-shrink-0 flex-grow-0 text-left text-sm font-medium text-neutral-400">
              More
            </p>
          </div>
        </div>
        <div>
          <div />
        </div>
      </div>
    </>
  );
};

export default NavBar;
