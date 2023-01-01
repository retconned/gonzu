import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import TuneModal from "../components/TuneModal";
import type { AttachmentProps, WeaponBuild } from "../types/types";

import { trpc } from "../utils/trpc";

const LoadoutBuilder = () => {
  const [weapon, setWeapon] = useState("");
  const [weaponBuild, setWeaponBuild] = useState<WeaponBuild | null>(null);
  const [loadoutName, setLoadoutName] = useState<string>("");
  const [selectedAttachment, setSelectedAttachment] = useState<number>(0);
  const [tuneModalVisibility, setTuneModalVisibility] =
    useState<boolean>(false);

  const { data: getAllWeapons } = trpc.weapons.getAllWeapons.useQuery();

  const { data: getWeaponByName } =
    trpc.weapons.getWeaponByName.useQuery(weapon);

  const { mutate: finalBuild, isLoading: finalBuildLoading } =
    trpc.loadout.createLoadout.useMutation();

  const handleCreateLoadout = async () => {
    finalBuild({
      name: loadoutName,
      weaponBody: weapon,
      attachments: weaponBuild?.attachments as any,
    });
  };
  useEffect(() => {
    if (typeof getWeaponByName !== "undefined") {
      const clone: any = { ...getWeaponByName[0] };
      delete clone["Attachments"];
      setWeaponBuild({
        ...clone,
        attachments: [],
      });
    }
  }, [getWeaponByName]);

  const handleAttachmentAddition = (
    verticalTune: number,
    horizontalTune: number,
  ) => {
    setWeaponBuild((current: any) => {
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

  useEffect(() => {
    // console.log(weaponBuild);
  }, [weaponBuild]);

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
          <div className="flex flex-col items-center gap-2"></div>

          <input
            className="rounded-md bg-neutral-800 p-1 text-center placeholder:text-center"
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
                ? getAllWeapons?.map((weapon: any) => {
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
                          setWeaponBuild={setWeaponBuild}
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
  setWeaponBuild,
  setTuneModalVisibility,
  setSelectedAttachment,
}: {
  id: number;
  name: string;
  slot: string;
  weaponBuild: WeaponBuild | null;
  setWeaponBuild: Dispatch<SetStateAction<WeaponBuild | null>>;
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
      className=" rounded-md bg-neutral-800 p-2 text-center duration-150 hover:bg-neutral-700"
    >
      <p className="underline underline-offset-2">{slot}</p>
      <p>{name}</p>
    </button>
  );
};
