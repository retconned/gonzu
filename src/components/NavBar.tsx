import Image from "next/image";
import Link from "next/link";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaBoxes, FaRobot, FaUserFriends } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";

import { Button } from "@ui/Button";
import type { Session } from "next-auth/core/types";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const callbackUrl = "/";
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  console.log("secret: ", secretMessage);

  return (
    <>
      <div className="flex w-full items-center justify-between bg-neutral-800 py-3 px-10 ">
        <Link href={"/"}>
          <p className="text-left text-xl font-bold text-white">GONZU</p>
        </Link>
        <div className="hidden items-center justify-center gap-[30px] md:flex">
          <NavButton
            icon={<FaBoxes className="fill-white group-hover:fill-lime-400" />}
            title="loadouts"
            routeLink="/loadouts"
          />
          <NavButton
            icon={
              <FaUserFriends className="fill-white group-hover:fill-lime-400" />
            }
            title="Streamers"
            routeLink="/streamers"
          />
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
        <div className="hidden sm:block">
          <AuthModal
            callbackUrl={callbackUrl}
            profileModal={profileModal}
            sessionData={sessionData}
            setProfileModal={setProfileModal}
          />
        </div>
        <div className="block md:hidden">
          <div>
            <button
              className="rounded-md bg-neutral-700 p-1"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <HiOutlineMenu size={20} className="stroke-white" />
            </button>
            {open ? (
              <div className="fixed top-[54px] left-0 flex w-full items-center justify-center overflow-hidden bg-neutral-800 py-8">
                <div className=" flex h-fit flex-col gap-4">
                  <NavButton
                    icon={
                      <AiFillHome className="fill-white group-hover:fill-lime-400" />
                    }
                    title="Home"
                    routeLink="/"
                  />
                  <NavButton
                    icon={
                      <FaUserFriends className="fill-white group-hover:fill-lime-400" />
                    }
                    title="Streamers"
                    routeLink="/streamers"
                  />
                  <NavButton
                    icon={
                      <FaBoxes className="fill-white group-hover:fill-lime-400" />
                    }
                    title="loadouts"
                    routeLink="/loadouts"
                  />
                  <AuthModal
                    callbackUrl={callbackUrl}
                    profileModal={profileModal}
                    sessionData={sessionData}
                    setProfileModal={setProfileModal}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

const AuthModal = ({
  sessionData,
  profileModal,
  setProfileModal,
  callbackUrl,
}: {
  sessionData: Session | null;
  profileModal: boolean;
  setProfileModal: Dispatch<SetStateAction<boolean>>;
  callbackUrl: string;
}) => {
  return (
    <div>
      {sessionData ? (
        <div className="rounded-full">
          {sessionData.user?.image ? (
            <Image
              src={sessionData.user.image}
              onClick={() => {
                setProfileModal(!profileModal);
              }}
              width={36}
              height={36}
              className="h-9 w-9 cursor-pointer overflow-hidden rounded-full border-2 border-lime-400 duration-200 hover:border-lime-700 "
              alt="profile picture "
            />
          ) : (
            <div className="h-9 w-9 rounded-full bg-blue-500" />
          )}

          {profileModal ? (
            <div className="absolute top-16 right-5 rounded-md border border-neutral-500/30 bg-neutral-800 p-4 shadow-xl">
              <div className="flex flex-col gap-4">
                <Link
                  href={`/profile/${sessionData.user?.name?.toLowerCase()}`}
                >
                  <Button intent={"transparent"}>Profile</Button>
                </Link>
                <Button onClick={() => signOut()} intent="fill">
                  Sign out
                </Button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <Button onClick={() => signIn("twitch", { callbackUrl })} intent="fill">
          Sign in
        </Button>
      )}
    </div>
  );
};

const NavButton = ({
  routeLink,
  icon,
  title,
}: {
  routeLink: string;
  icon: ReactNode;
  title: string;
}) => {
  return (
    <Link href={routeLink}>
      <Button
        intent={"navigation"}
        className="group flex flex-shrink-0 flex-grow-0 items-center justify-start space-x-2 rounded-md px-3.5 py-2.5 duration-100 hover:bg-neutral-700 "
      >
        {icon}
        <p className="text-white group-hover:text-lime-400">{title}</p>
      </Button>
    </Link>
  );
};
