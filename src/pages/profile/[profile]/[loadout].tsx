import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type {
  AttachmentBuild,
  LoadedAttachmentType,
  LoadoutAttachments,
} from "../../../types/types";
import { trpc } from "../../../utils/trpc";

import CategoryTitle from "@components/CategoryTitle";
import Footer from "@components/Footer";
import LoadoutModal from "@components/LoadoutModal";
import NavBar from "@components/NavBar";
import SmallerLoadout from "@components/SmallerLoadout";
import SkeletonLoadoutModal from "@components/skeletons/SkeletonLoadoutModal";
import SkeletonSmallerLoadout from "@skeletons/SkeletonSmallerLoadout";
import { Button } from "@ui/Button";
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
    (loadedAttach: LoadedAttachmentType) => {
      // console.log(loadedAttach);
      getLoadout.data?.Weapon.Attachments.forEach(
        (avalAttachment: { id: number; name: string | number }) => {
          if (avalAttachment.id === loadedAttach.id) {
            // something might be buggy here
            loadedAttach["name"] =
              loadedAttach["type" as keyof LoadedAttachmentType];
            loadedAttach.name = avalAttachment.name;
            console.log(loadedAttach);
            return loadedAttach;
          } else {
            // console.log("xyz", avalAttachment.id);
          }
        },
      );
    },
  );

  return (
    <div className="flex h-full flex-col items-center justify-between bg-neutral-900">
      <NavBar />
      <div className="flex w-full flex-col items-center justify-between gap-y-4  py-6">
        <div className="w-8/12 px-4 text-neutral-200">
          <Button
            intent={"solid-grey"}
            onClick={() => {
              router.back();
            }}
          >
            {"<  Go Back"}
          </Button>
        </div>
        <div className="flex flex-row">
          {getLoadout ? (
            <LoadoutModal
              imageSrc={getLoadout.data?.Weapon.image as string}
              loadoutName={getLoadout.data?.loadoutName as string}
              lastUpdated={getLoadout.data?.updatedAt}
              attachments={
                getLoadout.data
                  ?.attachments as unknown as Array<LoadoutAttachments>
              }
            />
          ) : (
            <SkeletonLoadoutModal />
          )}
        </div>
        <CategoryTitle emoji="🔥" title={`Other builds by ${profile}`} />
        <div className="flex w-8/12 items-center justify-center">
          <div className="grid gap-6 sm:grid-cols-4">
            {profileLoadoutsData ? (
              profileLoadoutsData.slice(0, 6).map((loadout) => {
                return (
                  <SmallerLoadout
                    key={loadout.id}
                    loadoutLink={`/profile/${profile}/${loadout.id}`}
                    imageSrc={loadout.Weapon.image as string}
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
      <Footer />
    </div>
  );
};

export default Loadout;
