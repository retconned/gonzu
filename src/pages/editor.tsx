import { useEffect, useState } from "react";

import { FilteredATtachment } from "../components/LoadoutBuild";
import TuneModal from "../components/TuneModal";
import type {
  WeaponBuild,
  WeaponWithAttach,
  buildAttachments,
} from "../types/types";
import { trpc } from "../utils/trpc";

const LoadoutEditor = () => {
  const [weapon, setWeapon] = useState<string>("");
  const [weaponBuild, setWeaponBuild] = useState<WeaponBuild | null>(null);
  const [selectedAttachment, setSelectedAttachment] = useState<number>(0);
  const [tuneModalVisibility, setTuneModalVisibility] =
    useState<boolean>(false);

  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const [selectedLoadout, setSelectedLoadout] = useState<string>("");
  const [profileLoadouts, setProfileLoadouts] = useState<string[]>([]);

  const [successAlert, setSuccessAlert] = useState<string>();

  const { data: getAllWeapons } = trpc.weapons.getAllWeapons.useQuery();
  const { data: profileNames } = trpc.profile.getAllProfileNames.useQuery();

  const { data: getWeaponByName } =
    trpc.weapons.getWeaponByName.useQuery(weapon);

  const getProfileLoadouts = trpc.loadout.getProfileLoadout.useQuery(
    profileLoadouts,
    {
      enabled: false,
    },
  );

  const { mutate: finalBuildUpdate } =
    trpc.loadout.updateLoadoutById.useMutation();

  const handleCreateLoadout = async () => {
    finalBuildUpdate(
      {
        id: selectedLoadout as string,
        attachments: weaponBuild?.attachments as Array<buildAttachments>,
      },
      {
        onSuccess: (data, result) => {
          setSuccessAlert(`updated: ${result.id}`);
        },
      },
    );
  };

  useEffect(() => {
    if (typeof getWeaponByName !== "undefined") {
      const clone = { ...getWeaponByName[0] } as unknown;
      delete (clone as WeaponWithAttach)["Attachments"];

      setWeaponBuild({
        ...(clone as WeaponBuild),
        attachments: [],
      });
    }
  }, [getWeaponByName]);

  const handleAttachmentAddition = (
    verticalTune: number,
    horizontalTune: number,
  ) => {
    setWeaponBuild((current) => {
      return current !== null
        ? {
            ...current,
            attachments: [
              ...current.attachments,
              {
                id: selectedAttachment,
                horizontalTune: horizontalTune,
                verticalTune: verticalTune,
              },
            ],
          }
        : null;
    });
    setTuneModalVisibility(false);
  };

  const handleGetLoadouts = () => {
    getCurrentLoadout.refetch();

    if (getCurrentLoadout.data) {
      console.log(getCurrentLoadout.data[0]?.loadouts);

      setProfileLoadouts(getCurrentLoadout.data[0]?.loadouts as Array<string>);

      getProfileLoadouts.refetch();
      if (getProfileLoadouts) {
        console.log(getProfileLoadouts.data);
      }
    }
  };

  const getCurrentLoadout = trpc.loadout.getCurrentUserLoadout.useQuery(
    selectedProfile as string,
    {
      enabled: false,
    },
  );

  const allAttachmentsSlots: Array<string> = [];
  getAllWeapons?.map((weapon) => {
    weapon.Attachments.map((attachment) => {
      allAttachmentsSlots.push(attachment.slot);
    });
    return allAttachmentsSlots;
  });
  const attachmentSlotNames = [...new Set(allAttachmentsSlots)];

  return (
    <>
      <main className="flex min-h-screen  flex-col items-center justify-center bg-neutral-900">
        {tuneModalVisibility && (
          <TuneModal
            setVisibility={setTuneModalVisibility}
            handleAttachmentAddition={handleAttachmentAddition}
          />
        )}
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Update loadout
          </h1>
          <div className="flex w-full flex-col items-center justify-center gap-2 text-white">
            <p className="mb-4 text-center text-2xl font-bold text-white">
              Select a profile:
            </p>
            <div className="">
              {selectedProfile ? (
                <p className="mb-4 text-neutral-400">
                  Selected profile:{" "}
                  <span className="font-bold text-white">
                    {selectedProfile}
                  </span>
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="grid w-full grid-cols-6 items-center gap-4">
              {profileNames?.map((profileName, i) => {
                return (
                  <button
                    className="w-full rounded-md bg-neutral-800 px-2 py-2 text-center duration-150 hover:bg-neutral-700"
                    key={i}
                    onClick={() => {
                      setSelectedProfile(profileName.username);
                    }}
                  >
                    {profileName.username}
                  </button>
                );
              })}
            </div>
            <div></div>
          </div>
          <button
            className="w-fit rounded-md bg-red-500 p-2 font-bold text-white duration-150 hover:bg-red-700"
            onClick={handleGetLoadouts}
          >
            Get {selectedProfile}
            {`'`}s loadouts
          </button>
          <div className="grid gap-2">
            {getProfileLoadouts.data?.map((loadout) => {
              return (
                <button
                  className="w-full rounded-md bg-purple-500 p-2 text-center font-bold text-white duration-150 hover:bg-purple-700"
                  key={loadout.id}
                  onClick={() => {
                    setSelectedLoadout(loadout.id);
                    setWeapon(loadout.weaponBody);
                  }}
                >
                  {loadout.loadoutName}
                </button>
              );
            })}
          </div>

          <p className="text-green-500">{successAlert ? successAlert : ""}</p>

          <button
            className="rounded-md  bg-blue-500 p-2 font-bold text-white duration-150 hover:bg-blue-700"
            onClick={handleCreateLoadout}
          >
            Update Loadout
          </button>
          <div>
            {weaponBuild != null &&
            weaponBuild.attachments != undefined &&
            weaponBuild.name ? (
              <div className="flex flex-col rounded-md bg-neutral-800 p-2 text-center text-white">
                <p>Build preview!</p>
                <p>
                  Body: <span className="font-bold">{weaponBuild?.name}</span>
                </p>
                <div className="flex flex-col gap-2">
                  {weaponBuild?.attachments.map((attachment, i) => {
                    return (
                      <div
                        className="flex flex-row gap-2 bg-neutral-700/30 px-4"
                        key={i}
                      >
                        <p>id: {attachment?.id}</p>
                        <p>hor: {attachment?.verticalTune}</p>
                        <p>vert: {attachment?.horizontalTune}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          {getWeaponByName && weapon != "" ? (
            <div className="flex flex-col items-center">
              <p className="mb-4 text-2xl font-bold text-white">
                select your attatchments:
              </p>
              {attachmentSlotNames.map((attachmentName, i) => {
                return (
                  <FilteredATtachment
                    key={i}
                    filterBy={attachmentName}
                    getWeaponByName={getWeaponByName}
                    setSelectedAttachment={setSelectedAttachment}
                    setTuneModalVisibility={setTuneModalVisibility}
                    weaponBuild={weaponBuild}
                  />
                );
              })}
            </div>
          ) : (
            <p className="mb-4 text-2xl font-bold text-red-500">
              select a loadout to edit!
            </p>
          )}
        </div>
      </main>
    </>
  );
};

export default LoadoutEditor;
