import { useState } from "react";

import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
const LoadoutBuilder = () => {
  const [username, setUsername] = useState<string>("");
  const [data, setData] = useState<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    profileCreate(data);
  };
  // console.log(errors);

  const { mutate: profileCreate } = trpc.profile.createProfile.useMutation();
  return (
    <>
      <main className="flex min-h-screen flex-col items-start justify-start bg-gradient-to-b from-[#02246d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Profile
          </h1>
          <div className="flex flex-col items-center gap-2"></div>

          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <input
                type="text"
                placeholder="username"
                {...register("username", {})}
              />
              <input
                type="text"
                placeholder="twitch"
                {...register("twitch", {})}
              />
              <input
                type="text"
                placeholder="twitter"
                {...register("twitter", {})}
              />
              <input
                type="text"
                placeholder="youtube"
                {...register("youtube", {})}
              />
              <input
                type="text"
                placeholder="tiktok"
                {...register("tiktok", {})}
              />
              <select
                {...register("is_streamer", {
                  setValueAs: (v) => Boolean(v),
                })}
              >
                <option value={"true"}>true</option>
                <option value={""}>false</option>
              </select>
              <input
                type="text"
                placeholder="language"
                {...register("language", {})}
              />

              <input type="submit" className="rounded-md bg-red-500 p-2" />
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoadoutBuilder;
