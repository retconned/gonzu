import Footer from "@components/Footer";
import NavBar from "@components/NavBar";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import type { ReactNode } from "react";

// import { GiPistolGun } from "react-icons/gi";
// import { useEffect, useState } from "react";
// import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center">
        <NavBar />
        <div className="flex h-[110vh] w-full flex-col items-center justify-between gap-y-8 overflow-hidden  bg-gradient-to-t from-lime-300 via-lime-400 to-lime-900">
          <div className="flex flex-col items-center justify-center gap-4 py-44 text-white ">
            <p className="text-6xl font-extrabold">Pick your best loadouts</p>
            <p className="text-2xl font-thin">
              Grab the loadout of your favorite streamer and youtuber
            </p>
            <button className="flex items-center justify-center gap-1 rounded-md bg-neutral-900 px-6 py-2.5 text-xl font-bold">
              {/* <GiPistolGun className="-rotate-45 fill-white" size={32} /> */}
              Get loaded
            </button>
          </div>
          <div className="flex h-[500px] flex-row">
            <Image
              src={"/loadout.png"}
              className="z-10 w-[400px] -rotate-12 scale-x-flip rounded-md object-contain"
              width={660}
              height={630}
              alt=""
            />
            <div className="flex flex-col bg-red-500/20">
              <Image
                src={"/weapons.png"}
                className="w-[800px] scale-125 rounded-md object-contain"
                width={1311}
                height={785}
                draggable={"false"}
                alt=""
              />
            </div>
            <Image
              src={"/loadout.png"}
              className="z-10 w-[400px] rotate-12 rounded-md object-contain"
              width={660}
              height={630}
              alt=""
            />
          </div>
        </div>
        <div className="flex h-[500px] w-full flex-col items-center justify-between bg-neutral-900 py-20 text-center text-neutral-100 sm:py-36">
          <p className="mb-4 text-3xl font-bold">Loadouts from</p>
          <div className="flex w-8/12 flex-row flex-wrap justify-between ">
            <div className="flex w-full flex-wrap items-center justify-between gap-4 sm:flex-row ">
              {[
                {
                  name: "xQc",
                  profilePicture: "google.com",
                  live: false,
                },
                {
                  name: "xQc",
                  profilePicture: "google.com",
                  live: false,
                },
                {
                  name: "xQc",
                  profilePicture: "google.com",
                  live: false,
                },
                {
                  name: "xQc",
                  profilePicture: "google.com",
                  live: false,
                },
                {
                  name: "xQc",
                  profilePicture: "google.com",
                  live: false,
                },
                {
                  name: "xQc",
                  profilePicture: "google.com",
                  live: false,
                },
                {
                  name: "xQc",
                  profilePicture: "google.com",
                  live: false,
                },
              ].map((profile) => {
                return (
                  <div key={profile.name}>
                    <div className="h-20 w-20 rounded-full bg-green-300">
                      {profile.live ? (
                        <div className="relative top-[56px] left-[64px] h-4 w-4 rounded-full bg-red-600" />
                      ) : (
                        ""
                      )}
                    </div>
                    <p className="mt-2 font-medium">{profile.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex h-[670px] w-full flex-col justify-between bg-blue-500 sm:h-[500px] sm:flex-row">
          <div className="flex w-full items-center justify-center bg-neutral-700 py-8 text-white sm:py-0">
            <SetupComponent
              title="community loadouts"
              line="Get started in a minutes"
              explanation={`create profile > create ur loadout > share it with the world`}
              mode="light"
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center bg-neutral-400 py-8 sm:py-0">
            <SetupComponent
              title="streamers loadouts"
              line={`find you favorite streamer's loadout, find a loadout`}
              explanation={`browse the best loadout for your gun in our loadouts section`}
              mode="dark"
            />
          </div>
        </div>
        {/* <div className="flex h-[600px] w-full flex-row justify-center bg-neutral-900 py-12">
          <div className="grid grid-cols-2 gap-4">
            <FeatureComponent
              icon={<BsClockFill className="fill-lime-400 duration-200" />}
              title="up to date loadouts"
              description="The most up-to-date loadouts from popular twitch streamers, youtubers and community members."
            />
            <FeatureComponent
              icon={<BsStars className="fill-lime-400 duration-200" />}
              title="СLEAN INTERFACE"
              description="Simple and clear interface. All information is available at your fingertips in a couple of clicks."
            />
            <FeatureComponent
              icon={<BsFillPeopleFill className="fill-lime-400 duration-200" />}
              title="community based"
              description="Gonzu is part of an ecosystem of platforms dedicated to Call of Duty Warzone."
            />
            <FeatureComponent
              icon={<FaGlobeAfrica className="fill-lime-400 duration-200" />}
              title="Multi-region"
              description="we support all regions and servers and support so you can find what fits your region meta. "
            />
          </div>
        </div> */}
        <Footer />
      </main>
    </>
  );
};

export default Home;

const SetupComponent = ({
  title,
  line,
  explanation,
  mode,
}: {
  title: string;
  line: string;
  explanation: string;
  mode: "light" | "dark";
}) => {
  return (
    <div
      className={
        mode === "light"
          ? "flex w-8/12 flex-col items-center rounded-md bg-neutral-400 py-20 text-white"
          : "flex w-8/12 flex-col items-center rounded-md bg-neutral-700 py-20 text-white"
      }
    >
      <p className="text-xl font-bold text-lime-400">{title}</p>
      {mode === "light" ? (
        <p className="text-neutral-900">{line}</p>
      ) : (
        <p className="text-neutral-100">{line}</p>
      )}
      {mode === "light" ? (
        <p className="text-neutral-900">{explanation}</p>
      ) : (
        <p className="text-neutral-100">{explanation}</p>
      )}
    </div>
  );
};

const FeatureComponent = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="group flex w-80 select-none flex-col items-center justify-between gap-4 rounded-md border border-neutral-700 bg-neutral-800 p-4 duration-200 hover:border-lime-400 ">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-600">
        {icon}
      </div>
      <div className="flex min-h-[120px] flex-col justify-start rounded-lg bg-neutral-700 py-4 px-2">
        <p className="text-center font-bold uppercase text-neutral-200">
          {title}
        </p>
        <p className="text-center text-sm text-neutral-200">{description}</p>
      </div>
    </div>
  );
};
