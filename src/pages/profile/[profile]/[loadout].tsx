import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategoryTitle from "../../../components/CategoryTitle";
import Footer from "../../../components/Footer";
import LoadoutModal from "../../../components/LoadoutModal";
import NavBar from "../../../components/NavBar";
import SmallerLoadout from "../../../components/SmallerLoadout";
import type { AttachmentBuild, LoadoutAttachments } from "../../../types/types";
import { trpc } from "../../../utils/trpc";

const Loadout: NextPage = () => {
  const router = useRouter();
  const loadoutId = router.query.loadout;

  const profile = router.query.profile as string;
  const [profileLoadouts, setProfileLoadouts] = useState<Array<string>>([""]);

  const getProfile = trpc.profile.getUnqiueProfile.useQuery(profile);
  const getLoadout = trpc.loadout.getLoadoutById.useQuery(loadoutId as string);

  useEffect(() => {
    if (getProfile.isSuccess) {
      setProfileLoadouts(getProfile.data?.loadouts as string[]);
    } else {
      return;
    }
  }, [getProfile.isSuccess, getProfile.data]);

  const getProfileLoadouts =
    trpc.loadout.getProfileLoadout.useQuery(profileLoadouts);

  const profileLoadoutsData = getProfileLoadouts.data;

  // console.log(getLoadout.data?.attachments);
  (getLoadout.data?.attachments as Array<AttachmentBuild>)?.forEach(
    (loadedAttach: any) => {
      // console.log(loadedAttach);
      getLoadout.data?.Weapon.Attachments.forEach((avalAttachment) => {
        if (avalAttachment.id == loadedAttach.id) {
          loadedAttach["name"] = loadedAttach["type"];
          loadedAttach.name = avalAttachment.name;
          return loadedAttach;
        }
      });
    },
  );

  return (
    <div className="flex h-full flex-col items-center justify-between bg-neutral-900">
      <NavBar />
      <div className="w-8/12 px-4 py-4 text-neutral-200">
        <button
          onClick={() => {
            router.back();
          }}
          className="w-fit rounded-md px-3.5 py-2.5  text-left text-sm text-white duration-200 hover:bg-neutral-700 hover:text-lime-400"
        >
          {"<  Go Back"}
        </button>
      </div>
      <LoadoutModal
        imageSrc={getLoadout.data?.Weapon.image as string}
        loadoutName={getLoadout.data?.loadoutName as string}
        lastUpdated={getLoadout.data?.updatedAt}
        attachments={
          getLoadout.data?.attachments as unknown as Array<LoadoutAttachments>
        }
      />
      <CategoryTitle emoji="🔥" title={`Other builds by ${profile}`} />
      <div className="flex w-8/12 items-center justify-center">
        <div className="grid grid-cols-4 gap-6">
          {profileLoadoutsData ? (
            profileLoadoutsData.slice(0, 6).map((loadout) => {
              return (
                <SmallerLoadout
                  key={loadout.id}
                  loadoutLink={`/${profile}/${loadout.id}`}
                  imageSrc={loadout.Weapon.image as string}
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
      <Footer />
    </div>
  );
};

export default Loadout;
