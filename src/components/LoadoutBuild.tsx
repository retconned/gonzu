import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import TuneModal from "../components/TuneModal";
import type {
  AttachmentProps,
  WeaponBuild,
  WeaponWithAttach,
  buildAttachments,
} from "../types/types";

import { trpc } from "../utils/trpc";

const LoadoutBuilder = () => {
  const [weapon, setWeapon] = useState("");
  const [weaponBuild, setWeaponBuild] = useState<WeaponBuild | null>(null);
  const [loadoutName, setLoadoutName] = useState<string>("");
  const [selectedAttachment, setSelectedAttachment] = useState<number>(0);
  const [tuneModalVisibility, setTuneModalVisibility] =
    useState<boolean>(false);

  const [assignToUsername, setAssignToUsername] = useState<string>();
  const [lastLoadoutMade, setLastLoadoutMade] = useState<string>();
  const [successAlert, setSuccessAlert] = useState<string>();

  const { data: getAllWeapons } = trpc.weapons.getAllWeapons.useQuery();
  const { data: profileNames } = trpc.profile.getAllProfileNames.useQuery();

  const { data: getWeaponByName } =
    trpc.weapons.getWeaponByName.useQuery(weapon);

  const { mutate: finalBuild, isLoading: finalBuildLoading } =
    trpc.loadout.createLoadout.useMutation();

  const { mutate: addLoadoutToProfile } =
    trpc.profile.addLoadoutToProfile.useMutation();

  const handleCreateLoadout = async () => {
    finalBuild(
      {
        name: loadoutName,
        weaponBody: weapon,
        attachments: weaponBuild?.attachments as Array<buildAttachments>,
      },
      {
        onSuccess: (data) => {
          console.log(data.id);
          setLastLoadoutMade(data.id);
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

  const getCurrentLoadout = trpc.profile.getCurrentLoadout.useQuery(
    assignToUsername as string,
    {
      enabled: false,
    },
  );

  //TODO: it needs to double click to assign to profile ** FIX THIS ***
  const handleAddtoProfile = () => {
    getCurrentLoadout.refetch();

    if (getCurrentLoadout.data) {
      const currentLoadout = getCurrentLoadout.data[0]?.loadouts;
      const newLoadout = [
        ...(currentLoadout as Array<string>),
        lastLoadoutMade as string,
      ];
      addLoadoutToProfile(
        {
          username: assignToUsername as string,
          loadoutId: newLoadout,
        },
        {
          onSuccess: (data) => {
            setSuccessAlert(`Assigned loadout to ${data.username} !`);
          },
        },
      );
    }
  };
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {tuneModalVisibility && (
          <TuneModal
            setVisibility={setTuneModalVisibility}
            handleAttachmentAddition={handleAttachmentAddition}
          />
        )}
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Loadout
          </h1>
          <div className="flex flex-col items-center justify-center gap-2 text-white">
            <p className="mb-4 text-center text-2xl font-bold text-white">
              Select a profile:
            </p>
            <div className="">
              {assignToUsername ? (
                <p className="mb-4 text-neutral-400">
                  Selected profile:{" "}
                  <span className="font-bold text-white">
                    {assignToUsername}
                  </span>
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="grid grid-cols-6 items-center gap-2">
              {profileNames?.map((profileName, i) => {
                return (
                  <div
                    className="w-full rounded-md bg-neutral-800 px-2 py-1 text-center duration-150 hover:bg-neutral-700"
                    key={i}
                    onClick={() => {
                      setAssignToUsername(profileName.username);
                    }}
                  >
                    {profileName.username}
                  </div>
                );
              })}
            </div>
            <div></div>
          </div>

          <input
            className="form-input rounded-md bg-neutral-800 p-1 text-center text-white placeholder-neutral-400 placeholder:text-center"
            onChange={(e) => {
              setLoadoutName(e.target.value);
            }}
            type="text"
            placeholder="loadout name"
          />

          <button
            className="rounded-md  bg-blue-500 p-2 font-bold text-white duration-150 hover:bg-blue-700"
            onClick={handleCreateLoadout}
            disabled={finalBuildLoading}
          >
            Create Loadout
          </button>

          {lastLoadoutMade ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-md bg-neutral-700/30 p-4 text-white">
              <div>
                {lastLoadoutMade ? (
                  <p>
                    Created loadout:{" "}
                    <span className="font-bold">{lastLoadoutMade}</span>{" "}
                  </p>
                ) : (
                  "no loadouts made yet!"
                )}
              </div>
              <button
                className="w-fit rounded-md bg-red-500 p-2 font-bold text-white duration-150 hover:bg-red-700"
                onClick={handleAddtoProfile}
              >
                Assign to {assignToUsername}
              </button>
              <p className="text-green-500">
                {successAlert ? successAlert : ""}
              </p>
            </div>
          ) : (
            ""
          )}

          {weaponBuild != null &&
          weaponBuild.attachments != undefined &&
          weaponBuild.name ? (
            <div className="flex flex-col gap-2 rounded-md bg-neutral-800 p-2 text-center text-white">
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
          <div className="flex flex-col">
            <p className="mb-4 text-center text-2xl font-bold text-white">
              select your weapon:
            </p>
            <div className="grid grid-cols-6 gap-4 text-lg text-white ">
              {getAllWeapons
                ? getAllWeapons?.map((weapon: WeaponWithAttach) => {
                    return (
                      <button
                        onClick={() => {
                          setWeapon(weapon.name);
                        }}
                        className="h-14 w-full rounded-md bg-neutral-800 px-2 text-center duration-150 hover:bg-neutral-700"
                        key={weapon.name}
                      >
                        <p>{weapon.name}</p>
                      </button>
                    );
                  })
                : "Loading weapon..."}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="mb-4 text-2xl font-bold text-white">
              select your atatchments:
            </p>
            <div className="grid grid-cols-5 gap-4 text-xl text-white">
              {getWeaponByName
                ? getWeaponByName[0]?.Attachments.map(
                    (attachment: AttachmentProps) => {
                      return (
                        <AttachmentComponent
                          key={attachment.name}
                          id={attachment.id}
                          name={attachment.name}
                          slot={attachment.slot}
                          weaponBuild={weaponBuild}
                          // setWeaponBuild={setWeaponBuild}
                          setSelectedAttachment={setSelectedAttachment}
                          setTuneModalVisibility={setTuneModalVisibility}
                        />
                      );
                    },
                  )
                : "Loading attachments..."}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoadoutBuilder;

const AttachmentComponent = ({
  id,
  name,
  slot,
  setTuneModalVisibility,
  setSelectedAttachment,
}: {
  id: number;
  name: string;
  slot: string;
  weaponBuild: WeaponBuild | null;
  setSelectedAttachment: Dispatch<SetStateAction<number>>;
  setTuneModalVisibility: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleAttachmentSelect = () => {
    setSelectedAttachment(id);
    setTuneModalVisibility(true);
  };

  return (
    <button
      onClick={() => handleAttachmentSelect()}
      className=" rounded-md bg-neutral-800 px-2 py-1 text-center duration-150 hover:bg-neutral-700"
    >
      <p className="text-neutral-400 ">{slot}</p>
      <p>{name}</p>
    </button>
  );
};
