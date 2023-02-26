import { type NextPage } from "next";

import Footer from "@components/Footer";
import NavBar from "@components/NavBar";
import ProfileComponent from "@components/ProfileComponent";
// import { trpc } from "../utils/trpc";
import Head from "next/head";
import profiles from "../constants/example-profiles";

const Streamers: NextPage = () => {
  // this is the trpc call but i'm using static data to display example

  // const { data: profiles } = trpc.profile.getAllProfiles.useQuery();

  return (
    <>
      <Head>
        <title>Gunzo - get geared</title>
        <meta name="description" content="Gunzo - get geared" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen flex-col items-center justify-between bg-neutral-900">
        <NavBar />
        <div className="flex w-full flex-col items-center justify-between gap-y-4 py-6">
          <div className="flex w-8/12 items-center justify-center">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              {profiles ? (
                profiles.map((profile) => {
                  return (
                    <ProfileComponent
                      key={profile.username}
                      imageSrc={profile.profile_image_url as string}
                      username={profile.username}
                      loadouts={profile.loadouts as Array<string>}
                      instagram={profile.instagram}
                      tiktok={profile.tiktok}
                      twitch={profile.twitch}
                      youtube={profile.youtube}
                      twitter={profile.twitter}
                      profileLink={`/profile/${profile.username}`}
                      input={profile.input ? profile.input : undefined}
                    />
                  );
                })
              ) : (
                <p>loading</p>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Streamers;
