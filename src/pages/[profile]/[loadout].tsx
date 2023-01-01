import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategoryTitle from "../../components/CategoryTitle";
import LoadoutModal from "../../components/LoadoutModal";
import SmallerLoadout from "../../components/SmallerLoadout";
import type { LoadoutAttachments } from "../../types/types";
import { trpc } from "../../utils/trpc";

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

  (getLoadout.data?.attachments as Array<any>)?.forEach((loadedAttach) => {
    getLoadout.data?.Weapon.Attachments.forEach((avalAttachment) => {
      if (avalAttachment.id == loadedAttach.id) {
        loadedAttach["name"] = loadedAttach["type"];
        loadedAttach.name = avalAttachment.name;
        return loadedAttach;
      }
    });
  });

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white">
      <LoadoutModal
        imageSrc="/m4.png"
        loadoutName={getLoadout.data?.loadoutName as string}
        lastUpdated={getLoadout.data?.updatedAt}
        attachments={
          getLoadout.data?.attachments as unknown as Array<LoadoutAttachments>
        }
      />
      <CategoryTitle emoji="🔥" title={`Other builds by ${profile}`} />
      <div className="flex flex-row gap-2">
        {profileLoadoutsData ? (
          profileLoadoutsData.map((loadout) => {
            return (
              <SmallerLoadout
                key={loadout.id}
                loadoutLink={`/${profile}/${loadout.id}`}
                imageSrc="/m4.png"
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
  );
};

export default Loadout;
