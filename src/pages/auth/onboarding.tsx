import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import Footer from "@components/Footer";
import NavBar from "@components/NavBar";
import { useSession } from "next-auth/react";
import type { ProfileInputOnboarding } from "../../types/types";
import { trpc } from "../../utils/trpc";

const OnBoarding = () => {
  const { data: sessionData } = useSession();
  // console.log(sessionData?.user?.name);
  // console.log(sessionData);
  return (
    <div className="flex h-screen flex-col justify-between bg-blue-300">
      <NavBar />
      <div className="flex">
        <ProfileOnBoarder sessionData={sessionData} />
      </div>
      <Footer />
    </div>
  );
};

export default OnBoarding;

const ProfileOnBoarder = ({ sessionData }: any) => {
  const { register, handleSubmit } = useForm<ProfileInputOnboarding>();

  // console.log(sessionData?.user?.image);

  const onSubmit: SubmitHandler<ProfileInputOnboarding> = (data) => {
    profileCreate(data);
    data.username = sessionData.user?.name.toLowerCase();
    data.twitch = sessionData.user?.name.toLowerCase();
    data.profile_image_url = sessionData.user?.image;
  };
  const { mutate: profileCreate } =
    trpc.profile.createProfileOnboarding.useMutation();
  return (
    <>
      <main className="flex flex-col items-start justify-start px-20">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-2xl font-extrabold text-white">
            {"You're almost there"}
          </h1>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" flex flex-col gap-3 text-white"
            >
              {/* <input
                className="form-input rounded-md bg-neutral-800 p-1 text-center placeholder-neutral-400 placeholder:text-center"
                type="text"
                placeholder="username"
                disabled
                // value={sessionData?.user?.name}
                {...register("username", {
                  value: sessionData?.user?.name,
                })}
              />
              <input
                className="form-input rounded-md bg-neutral-800 p-1 text-center placeholder-neutral-400 placeholder:text-center"
                type="text"
                disabled
                placeholder="@twitch"
                {...register("twitch", {
                  value: sessionData?.user?.name,
                })}
                // value={sessionData?.user?.name}
              /> */}
              <input
                className="form-input rounded-md bg-neutral-800 p-1 text-center placeholder-neutral-400 placeholder:text-center"
                type="text"
                placeholder="@twitter"
                {...register("twitter", {})}
              />
              <input
                className="rounded-md bg-neutral-800 p-1 text-center placeholder-neutral-400 placeholder:text-center"
                type="text"
                placeholder="youtube (url)"
                {...register("youtube", {})}
              />
              <input
                className="form-input rounded-md bg-neutral-800 p-1 text-center placeholder-neutral-400 placeholder:text-center"
                type="text"
                placeholder="tiktok"
                {...register("tiktok", {})}
              />
              <input
                className="form-input rounded-md bg-neutral-800 p-1 text-center placeholder-neutral-400 placeholder:text-center"
                type="text"
                placeholder="instagram"
                {...register("instagram", {})}
              />
              <select
                className="form-select rounded-md bg-neutral-800 p-1 text-center placeholder:text-center"
                {...register("is_streamer", {
                  setValueAs: (v) => Boolean(v),
                })}
              >
                <option value={"true"}>true</option>
                <option value={""}>false</option>
              </select>
              <select
                className="form-select rounded-md bg-neutral-800 p-1 text-center placeholder:text-center"
                {...register("input", {})}
              >
                <option value={"mouse"}>🖱 mouse</option>
                <option value={"controller"}>🎮 controller</option>
              </select>
              <input
                type="text"
                placeholder="language"
                {...register("language", {})}
                className="form-input rounded-md bg-neutral-800 p-1 text-center placeholder-neutral-400 placeholder:text-center"
              />

              <input
                type="submit"
                className="rounded-md bg-red-500 p-2 font-bold text-white duration-150 hover:bg-red-700"
              />
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
