import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { trpc } from "../../../utils/trpc";

import FilterBar from "@components/FilterBar";
import Footer from "@components/Footer";
import NavBar from "@components/NavBar";
import ProfileBar from "@components/ProfileBar";
import SmallerLoadout from "@components/SmallerLoadout";
import SkelatonProfileBar from "@skeletons/SkeletonProfileBar";
import SkeletonSmallerLoadout from "@skeletons/SkeletonSmallerLoadout";
import { Button } from "@ui/Button";

import Head from "next/head";
import loadout from "../../../constants/example-loadout";
import exampleProfile from "../../../constants/example-profile";

const Profile: NextPage = () => {
  const router = useRouter();
  const profile = router.query.profile as string;
  const [profileLoadouts, setProfileLoadouts] = useState<Array<string>>([""]);
  const [query, setQuery] = useState("");

  const getProfile = trpc.profile.getUnqiueProfile.useQuery(profile);

  useEffect(() => {
    if (getProfile.isSuccess) {
      setProfileLoadouts(getProfile.data?.loadouts as string[]);
    } else {
      return;
    }
  }, [getProfile.isSuccess, getProfile.data]);

  // this is the trpc call but i'm using static data to display example
  // const profileData = getProfile.data;

  const profileData = exampleProfile;

  const getProfileLoadouts =
    trpc.loadout.getProfileLoadout.useQuery(profileLoadouts);

  const profileLoadoutsData = loadout;

  // this is the trpc call but i'm using static data to display example
  // const profileLoadoutsData = getProfileLoadouts.data;

  const filterByType = (item: { Weapon: { type: string } }) => {
    if (query === "") {
      return true;
    } else if (item.Weapon?.type === query) {
      return true;
    }
  };

  const profileLoadoutsFiltered = profileLoadoutsData?.filter(filterByType);

  return (
    <>
      {" "}
      <Head>
        <title>Gunzo - get geared</title>
        <meta name="description" content="Gunzo - get geared" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full min-h-screen flex-col items-center justify-between bg-neutral-900">
        <NavBar />
        <div className="flex w-8/12 flex-col items-center justify-center pt-4">
          <div className="w-full">
            <Button
              intent={"solid-grey"}
              onClick={() => {
                router.back();
              }}
            >
              {"<  Go Back"}
            </Button>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-y-4 py-6">
            <div className="w-full">
              {profileData ? (
                <ProfileBar
                  imageSrc={
                    profileData.profile_image_url != null
                      ? (profileData.profile_image_url as string)
                      : ("" as string)
                  }
                  username={profileData.username}
                  key={profileData.username}
                  tiktok={profileData.tiktok}
                  twitch={profileData.twitch}
                  twitter={profileData.twitter}
                  youtube={profileData.youtube}
                  instagram={profileData.instagram}
                />
              ) : (
                <SkelatonProfileBar />
              )}
            </div>
            <FilterBar setQuery={setQuery} />
            <div className="flex items-start justify-center md:min-h-[574px] 3xl:min-h-[934px]">
              <div className="grid gap-6 md:grid-cols-4">
                {profileLoadoutsFiltered ? (
                  profileLoadoutsFiltered.map((loadout) => {
                    return (
                      <SmallerLoadout
                        key={loadout.id}
                        loadoutLink={`${profile}/${loadout.id}`}
                        imageSrc={loadout.Weapon.image}
                        loadoutName={loadout.loadoutName}
                        weaponType={loadout.Weapon.type}
                        weaponBody={loadout.weaponBody}
                      />
                    );
                  })
                ) : (
                  <SkeletonSmallerLoadout />
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
