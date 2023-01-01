import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import ProfileBar from "../../components/ProfileBar";
import SmallerLoadout from "../../components/SmallerLoadout";
import { trpc } from "../../utils/trpc";

import { useRouter } from "next/router";

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
    <div className="flex h-full w-screen flex-col items-center justify-between bg-neutral-900">
      {profileData ? (
        <ProfileBar
          imageSrc="/symfuhny.jpg"
          username={profileData.username}
          key={profileData.username}
          instagram={profileData.instagram}
          tiktok={profileData.tiktok}
          twitch={profileData.twitch}
          twitter={profileData.twitter}
          youtube={profileData.youtube}
        />
      ) : (
        <p>loading</p>
      )}
      <div className="grid w-8/12 grid-cols-3 gap-8 ">
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

      <Footer />
    </div>
  );
};

export default Profile;
