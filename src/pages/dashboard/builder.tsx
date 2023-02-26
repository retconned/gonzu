import Footer from "@components/Footer";
import LoadoutBuilder from "@components/LoadoutBuild";
import NavBar from "@components/NavBar";
import ProfileBuild from "@components/ProfileBuild";
import ProfileUpdater from "@components/ProfileUpdate";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Builder: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gunzo - get geared</title>
        <meta name="description" content="Gunzo - get geared" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-900">
        <NavBar />
        <Link href={"/dashboard"}>
          <button className="absolute top-20 left-10 w-fit rounded-md bg-neutral-400/20 px-3 py-2 text-center text-sm text-neutral-200 duration-150 hover:bg-neutral-400/40">
            {"<"} go back
          </button>
        </Link>
        <div className="flex min-h-screen w-10/12 flex-row justify-between">
          <LoadoutBuilder />
          <div className="flex flex-col">
            <ProfileBuild />
            <ProfileUpdater />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Builder;
