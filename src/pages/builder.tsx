import { type NextPage } from "next";
import Head from "next/head";
import LoadoutBuilder from "../components/LoadoutBuild";
import ProfileBuild from "../components/ProfileBuild";

const Builder: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-row items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="flex min-h-screen w-10/12 flex-row justify-between">
          <LoadoutBuilder />
          <ProfileBuild />
        </div>
      </main>
    </>
  );
};

export default Builder;
