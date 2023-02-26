import Footer from "@components/Footer";
import NavBar from "@components/NavBar";
import { Button } from "@components/ui/Button";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";

import { BsClockFill, BsFillPeopleFill, BsStars } from "react-icons/bs";
import { FaGlobeAfrica } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gunzo - get geared</title>
        <meta name="description" content="Gunzo - get geared" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center space-y-4 bg-neutral-900">
        <NavBar />
        <div className="flex w-8/12 flex-col items-center justify-center gap-y-8 ">
          <div className="mt-8 flex w-6/12 flex-col items-center justify-center text-white">
            <p className="text-center text-5xl font-black uppercase">
              Pick the best loadout for you
            </p>
            <p className="text-center text-lg">
              Checkout the most popular loadouts from the largest streamers,
              youtubers & community members.
            </p>
          </div>

          <Link href={"/loadouts"}>
            <Button intent={"fill"}>View our loadouts {`>`}</Button>
          </Link>
          <div className="grid grid-cols-2 gap-4">
            <FeatureComponent
              icon={<BsClockFill className="fill-lime-400 duration-200" />}
              title="up to date loadouts"
              description="Get the newest loadouts and strategies used by top Twitch streamers, YouTubers, and Community members all in one place. Stay ahead of the game with the best gear and tactics."
            />
            <FeatureComponent
              icon={<BsStars className="fill-lime-400 duration-200" />}
              title="СLEAN INTERFACE"
              description="The interface is simple and allows you to easily access all the information you need. With just a few clicks, everything you need is available at your fingertips."
            />
            <FeatureComponent
              icon={<BsFillPeopleFill className="fill-lime-400 duration-200" />}
              title="community based"
              description="Gonzu is one of the platforms solely focused on Call of Duty Warzone, providing players with everything they need to enhance their gaming experience."
            />
            <FeatureComponent
              icon={<FaGlobeAfrica className="fill-lime-400 duration-200" />}
              title="Multi-region"
              description="Our platform offers support for all regions and servers, ensuring that you can easily find the loadouts and strategies that are tailored to your region's specific play style."
            />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Home;

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
