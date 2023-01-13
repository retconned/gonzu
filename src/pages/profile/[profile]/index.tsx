import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import ProfileBar from "../../../components/ProfileBar";
import { trpc } from "../../../utils/trpc";

import { useRouter } from "next/router";
import NavBar from "../../../components/NavBar";
import SmallerLoadout from "../../../components/SmallerLoadout";

const Profile: NextPage = () => {
  const router = useRouter();
  const profile = router.query.profile as string;
  const [profileLoadouts, setProfileLoadouts] = useState<Array<string>>([""]);

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

  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-between bg-neutral-900">
      <NavBar />
      <div className="flex w-8/12 flex-col items-center justify-center pt-4">
        <div className="w-full">
          <button
            onClick={() => {
              router.back();
            }}
            className="-mb-4 w-fit rounded-md px-3.5 py-2.5 text-left text-sm text-white duration-200 hover:bg-neutral-700 hover:text-lime-400"
          >
            {"<  Go Back"}
          </button>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-y-4 py-6">
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
            <p>loading</p>
          )}

          <div className="flex items-start justify-center md:min-h-[574px] 3xl:min-h-[934px]">
            <div className="grid grid-cols-4 gap-6">
              {profileLoadoutsData ? (
                profileLoadoutsData.map((loadout) => {
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
                <p>loading</p>
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