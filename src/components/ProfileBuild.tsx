import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { ProfileInput } from "../types/types";
import { trpc } from "../utils/trpc";
const LoadoutBuilder = () => {
  const { register, handleSubmit } = useForm<ProfileInput>();
  const onSubmit: SubmitHandler<ProfileInput> = (data) => {
    profileCreate(data);
  };
  const { mutate: profileCreate } = trpc.profile.createProfile.useMutation();
  return (
    <>
      <main className="flex min-h-screen flex-col items-start justify-start ">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Profile
          </h1>
          <div className="flex flex-col items-center gap-2"></div>

          <div className="">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" flex flex-col gap-3 text-neutral-400"
            >
              <input
                className="form-input rounded-md bg-neutral-800 p-1 text-center placeholder-neutral-400 placeholder:text-center"
                type="text"
                placeholder="username"
                {...register("username", {})}
              />
              <input
                className="form-input rounded-md bg-neutral-800 p-1 text-center placeholder-neutral-400 placeholder:text-center"
                type="text"
                placeholder="twitch"
                {...register("twitch", {})}
              />
              <input
                className="form-input rounded-md bg-neutral-800 p-1 text-center placeholder-neutral-400 placeholder:text-center"
                type="text"
                placeholder="twitter"
                {...register("twitter", {})}
              />
              <input
                className="rounded-md bg-neutral-800 p-1 text-center placeholder-neutral-400 placeholder:text-center"
                type="text"
                placeholder="youtube"
                {...register("youtube", {})}
              />
              <input
                className="form-input rounded-md bg-neutral-800 p-1 text-center placeholder-neutral-400 placeholder:text-center"
                type="text"
                placeholder="tiktok"
                {...register("tiktok", {})}
              />
              <select
                className="form-select rounded-md bg-neutral-800 p-1 text-center placeholder:text-center"
                {...register("is_streamer", {
                  setValueAs: (v) => Boolean(v),
                })}
              >
                <option className="" value={"true"}>
                  true
                </option>
                <option value={""}>false</option>
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

export default LoadoutBuilder;
