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

  const profileData = getProfile.data;

  const getProfileLoadouts =
    trpc.loadout.getProfileLoadout.useQuery(profileLoadouts);

  const profileLoadoutsData = getProfileLoadouts.data;

  const filterByType = (item: { Weapon: { type: string } }) => {
    if (query === "") {
      return true;
    } else if (item.Weapon?.type === query) {
      return true;
    }
  };

  const profileLoadoutsFiltered = profileLoadoutsData?.filter(filterByType);

  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-between bg-neutral-900">
      <NavBar />
      <div className="flex w-8/12 flex-col items-center justify-center pt-4">
        <div className="w-full">
          <button
            onClick={() => {
              router.back();
            }}
            className="w-fit rounded-md bg-neutral-400/20 px-3 py-2 text-center text-sm text-neutral-200 duration-150 hover:bg-neutral-400/40"
            // className="-mb-4 w-fit rounded-md px-3.5 py-2.5 text-left text-sm text-white duration-200 hover:bg-neutral-700 hover:text-lime-400"
          >
            {"<  Go Back"}
          </button>
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
  );
};

export default Profile;
