import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

import { trpc } from "../utils/trpc";

type AttachmentProps = {
  id: number;
  name: string;
  slot: string;
};

type WeaponBuild = {
  name: string;
  attachmentId: number;
  attachments: Array<AttachmentBuild | undefined>;
  likes: number;
  visible: boolean;
};

type AttachmentBuild = {
  Id: number;
  horizontalTune: string;
  verticalTune: string;
};

const Home: NextPage = () => {
  const [weapon, setWeapon] = useState("");
  const [weaponBuild, setWeaponBuild] = useState<WeaponBuild | null>(null);
  const [loadoutName, setLoadoutName] = useState<string>("");
  const [horizontalTune, setHorizontalTune] = useState<string>("");
  const [verticalTune, setVerticalTune] = useState<string>("");

  const { data: getAllWeapons } = trpc.weapons.getAllWeapons.useQuery();

  const { data: getWeaponByName } = trpc.weapons.getWeaponByName.useQuery({
    name: weapon,
  });

  const { mutate: finalBuild } = trpc.loadout.createLoadout.useMutation();

  const handleCreateLoadout = async () => {
    finalBuild({
      name: loadoutName,
      weaponBody: weapon,
      attachments: [{ id: 55, horizontalTune: "33", verticalTune: "33" }],
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
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="flex flex-col items-center gap-2">
            {/* auth button */}
            {/* <AuthShowcase /> */}
          </div>

          <form action="" className="flex">
            <input
              onChange={(e) => {
                setLoadoutName(e.target.value);
              }}
              type="text"
              placeholder="loadout name"
            />
            {/* WIP , this attachment sepicific instead of a state value */}
            {/* <div className="flex flex-col items-center justify-center text-black">
              <input
                onChange={(e) => {
                  setHorizontalTune(e.target.value);
                }}
                type="text"
                placeholder="horizontal tune"
              />
              <input
                onChange={(e) => {
                  setVerticalTune(e.target.value);
                }}
                type="text"
                placeholder="vertical tune"
              />
            </div> */}
          </form>

          <div>
            <button
              className=" rounded-full bg-blue-500 px-10 py-3  font-bold text-white"
              onClick={handleCreateLoadout}
              // disabled={mutation.isLoading}
            >
              createLoadout
            </button>
          </div>

          <div className="text-semibold bg-black text-white">
            <div>{weaponBuild?.name}</div>
            <div>{weaponBuild?.likes}</div>
            <div>{weaponBuild?.visible}</div>
            {/* <div>{weaponBuild?.attachments.}</div> */}
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
                          verticalTune={verticalTune}
                          horizontalTune={horizontalTune}
                          setHorizontalTune={setHorizontalTune}
                          setVerticalTune={setVerticalTune}
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

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

const AttachmentComponent = ({
  id,
  name,
  slot,
  setWeaponBuild,
  horizontalTune,
  verticalTune,
  setHorizontalTune,
  setVerticalTune,
}: {
  id: number;
  name: string;
  slot: string;
  weaponBuild: WeaponBuild | null;
  setWeaponBuild: Dispatch<SetStateAction<WeaponBuild | null>>;
  horizontalTune: string;
  verticalTune: string;
  setHorizontalTune: Dispatch<SetStateAction<string>>;
  setVerticalTune: Dispatch<SetStateAction<string>>;
}) => {
  const handleAttachmentClick = () => {
    //  *TODO this only adds a single id object instead of multiple objects with ids
    // expected result =  [{id:5,horizontalTune:"5",verticalTune:"9"},{id:7,horizontalTune:"3",verticalTune:"1"},{id:10,horizontalTune:"2",verticalTune:"4"}]
    // current result = [{id:5,horizontalTune:"5",verticalTune:"9"}]  ** only enteries a single entry when clicking multiple attachments

    setWeaponBuild((current: any) => {
      return current !== null
        ? {
            ...current,
            attachments: [
              ...current.attachments,
              {
                id: id,
                horizontalTune: horizontalTune,
                verticalTune: verticalTune,
              },
            ],
          }
        : null;
    });
  };

  return (
    <div className="flex flex-col bg-green-300 p-2">
      <div
        onClick={() => handleAttachmentClick()}
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
