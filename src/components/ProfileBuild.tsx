import { useState } from "react";

import { trpc } from "../utils/trpc";

const LoadoutBuilder = () => {
  //   const [username, setWeapon] = useState("");
  //   const [weaponBuild, setWeaponBuild] = useState<WeaponBuild | null>(null);
  const [username, setUsername] = useState<string>("");
  const { data: getAllProfiles } = trpc.profile.getAllProfiles.useQuery();

  const { mutate: profileCreate, isLoading: profileCreateLoading } =
    trpc.profile.createProfile.useMutation();

  const handleCreateLoadout = async () => {
    profileCreate({
      username: username,
    });
  };

  console.log(getAllProfiles);

  return (
    <>
      <main className="flex min-h-screen flex-col items-start justify-start bg-gradient-to-b from-[#02246d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Profile
          </h1>
          <div className="flex flex-col items-center gap-2"></div>

          <form action="" className="flex">
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              placeholder="streamer name"
            />
          </form>

          <div>
            <button
              className=" rounded-full bg-blue-500 px-10 py-3  font-bold text-white"
              onClick={handleCreateLoadout}
              disabled={profileCreateLoading}
            >
              create profile
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoadoutBuilder;
