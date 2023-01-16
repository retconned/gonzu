import { type NextPage } from "next";

import CategoryTitle from "@components//CategoryTitle";
import Footer from "@components//Footer";
import NavBar from "@components//NavBar";
// import ProfileComponent from "../components/ProfileComponent";
import LoadoutThumbnailProfile from "@components/LoadoutThumbnailProfile";
// import LoadoutThumbnailWeapon from "../components/LoadoutThumbnailWeapon";
import LoadoutThumbnailWeapon from "@components/LoadoutThumbnailWeapon";
import { trpc } from "../utils/trpc";

const Loadouts: NextPage = () => {
  const trendingLoadouts: Array<string> = [
    "clbjj1zff0006wyzyaq4iv1im",
    "clbjj1zfr00chwyzy1nfyrcob",
    "clbjj1zfq00c0wyzyy4px5r9m",
    "clbjj1zfp009rwyzy5elcbh8g",
    "clbjj1zfn006kwyzy5c4yzgy6",
  ];
  const trendingLoadoutsData = trendingLoadouts.map((loadoutId: string) => {
    const { data: trendingLoadoutsData } =
      trpc.loadout.getLoadoutByIdForTrending.useQuery(loadoutId);

    if (trendingLoadoutsData === undefined) {
      return;
    }
    return trendingLoadoutsData;
  });
  const getProfileName = (loadoutName: string) => {
    const str = loadoutName?.split(" ").at(0);
    const username = str?.split("'").at(0);
    const profile = username?.toString().toLowerCase();
    return profile as string;
  };

  const getProfilePictures = (profileName: string) => {
    const { data: profileData } =
      trpc.profile.getUnqiueProfile.useQuery(profileName);

    const profilePicture = profileData?.profile_image_url;
    console.log(profilePicture);
    return profilePicture;
  };

  return (
    <div className="flex h-full flex-col items-center justify-between bg-neutral-900">
      <NavBar />
      <div className="flex w-full flex-col items-center justify-between gap-y-4 py-6">
        <div className="flex w-8/12 flex-col items-center justify-center gap-4">
          <CategoryTitle emoji="🌙" title="Trending Loadouts" />
          <div className="flex w-8/12 flex-col items-center gap-4 ">
            {trendingLoadoutsData && trendingLoadoutsData != undefined
              ? trendingLoadoutsData.map((loadout) => {
                  const profileName = getProfileName(
                    loadout?.loadoutName as string,
                  );
                  const profilePicture = getProfilePictures(profileName);
                  return (
                    <LoadoutThumbnailProfile
                      key={loadout?.id}
                      profileLink={`/profile/${profileName}`}
                      imageSrc={profilePicture as string}
                      weaponType={loadout?.Weapon.type as string}
                      loadoutName={loadout?.loadoutName as string}
                      loadoutLink={`/profile/${profileName}/${loadout?.id}`}
                      weaponBody={loadout?.weaponBody as string}
                    />
                  );
                })
              : ""}
          </div>
        </div>
        <div className="flex w-8/12 flex-col items-center justify-center gap-4">
          <CategoryTitle emoji="🔥" title="Trending Loadouts" />
          <div className="flex w-8/12 flex-col items-center gap-4 ">
            {trendingLoadoutsData && trendingLoadoutsData != undefined
              ? trendingLoadoutsData.map((loadout) => {
                  const profileName = getProfileName(
                    loadout?.loadoutName as string,
                  );
                  return (
                    <LoadoutThumbnailWeapon
                      key={loadout?.id}
                      imageSrc={loadout?.Weapon.image as string}
                      weaponType={loadout?.Weapon.type as string}
                      loadoutName={loadout?.loadoutName as string}
                      loadoutLink={`/profile/${profileName}/${loadout?.id}`}
                      weaponBody={loadout?.weaponBody as string}
                    />
                  );
                })
              : ""}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Loadouts;
