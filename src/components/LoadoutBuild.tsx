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

  const { data: getWeaponByName } = trpc.weapons.getWeaponByName.useQuery({
    name: weapon,
  });

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
    console.log(weaponBuild);
  }, [weaponBuild]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
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

          <form action="" className="flex">
            <input
              onChange={(e) => {
                setLoadoutName(e.target.value);
              }}
              type="text"
              placeholder="loadout name"
            />
          </form>

          <div>
            <button
              className=" rounded-full bg-blue-500 px-10 py-3  font-bold text-white"
              onClick={handleCreateLoadout}
              disabled={finalBuildLoading}
            >
              createLoadout
            </button>
          </div>

          <div className="text-semibold bg-black text-white">
            <div>{weaponBuild?.name}</div>
            <div>{weaponBuild?.likes}</div>
            <div>{weaponBuild?.visible}</div>
          </div>
          <div className="flex flex-col">
            <p className="mb-4 text-2xl font-bold text-white ">
              select your weapon:
            </p>
            <div className="flex flex-col space-y-4 text-2xl text-white">
              {getAllWeapons
                ? getAllWeapons?.map((weapon: any) => {
                    return (
                      <div
                        onClick={() => {
                          setWeapon(weapon.name);
                        }}
                        className="bg-slate-700 px-4"
                        key={weapon.name}
                      >
                        <p>{weapon.name}</p>
                      </div>
                    );
                  })
                : "Loading weapon..."}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="mb-4 text-2xl font-bold text-white ">
              select your atatchments:
            </p>
            <div className="text-2xl text-white">
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
    <div className="flex flex-col bg-green-300 p-2">
      <div
        onClick={() => handleAttachmentSelect()}
        className="flex items-center justify-between bg-blue-300"
      >
        <p>{id}</p>
        <div className="bg-red-500">
          <p>{slot}</p>
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
};