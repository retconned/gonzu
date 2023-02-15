import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import Footer from "@components/Footer";
import NavBar from "@components/NavBar";
import { useSession } from "next-auth/react";
import Router from "next/router";
import type { ProfileInputOnboarding } from "../../types/types";
import { trpc } from "../../utils/trpc";

// import { Router } from "next/router";

const OnBoarding = () => {
  const { data: sessionData } = useSession();
  // console.log(sessionData?.user?.name);
  // console.log(sessionData);
  return (
    <div className="flex h-screen flex-col justify-between bg-neutral-900">
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

    setTimeout(() => {
      Router.push("/");
    }, 500);
  };

  const { mutate: profileCreate } =
    trpc.profile.createProfileOnboarding.useMutation();

  return (
    <div className="items-cent flex w-full flex-col justify-center">
      <main className="flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 text-center ">
          <h1 className=" text-2xl font-extrabold text-white">
            {"You're almost there"}
          </h1>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-[500px] flex-col gap-3 text-white"
            >
              <div className="flex flex-row justify-between ">
                <div className="flex w-full flex-col gap-4 p-4">
                  <label>Twitter</label>
                  <input
                    className="form-input rounded-md bg-neutral-800 p-1 text-center placeholder-neutral-400 placeholder:text-center"
                    type="text"
                    placeholder="@twitter"
                    {...register("twitter", {})}
                  />
                  <label>Youtube</label>
                  <input
                    className="rounded-md bg-neutral-800 p-1 text-center placeholder-neutral-400 placeholder:text-center"
                    type="text"
                    placeholder="youtube (url)"
                    {...register("youtube", {})}
                  />
                  <label>Tiktok</label>
                  <input
                    className="form-input rounded-md bg-neutral-800 p-1 text-center placeholder-neutral-400 placeholder:text-center"
                    type="text"
                    placeholder="tiktok"
                    {...register("tiktok", {})}
                  />
                  <label>Instagram</label>
                  <input
                    className="form-input rounded-md bg-neutral-800 p-1 text-center placeholder-neutral-400 placeholder:text-center"
                    type="text"
                    placeholder="instagram"
                    {...register("instagram", {})}
                  />
                </div>
                <div className="flex w-full flex-col gap-4 p-4">
                  <label>Are you a streamer?</label>
                  <select
                    className="form-select rounded-md bg-neutral-800 p-1 text-center placeholder:text-center"
                    {...register("is_streamer", {
                      setValueAs: (v) => Boolean(v),
                    })}
                  >
                    <option value={"true"}>Yes</option>
                    <option value={""}>No</option>
                  </select>
                  <label>What do you use</label>
                  <select
                    className="form-select rounded-md bg-neutral-800 p-1 text-center placeholder:text-center"
                    {...register("input", {})}
                  >
                    <option value={"mouse"}>🖱 mouse</option>
                    <option value={"controller"}>🎮 controller</option>
                  </select>
                  <label>Language/Region</label>
                  <input
                    type="text"
                    placeholder="language"
                    {...register("language", {})}
                    className="form-input rounded-md bg-neutral-800 p-1 text-center placeholder-neutral-400 placeholder:text-center"
                  />
                </div>
              </div>
              <input
                type="submit"
                className="rounded-md bg-red-500 p-2 font-bold text-white duration-150 hover:bg-red-700"
              />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
