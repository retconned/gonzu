import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { ProfileInput } from "../types/types";
import { trpc } from "../utils/trpc";
const ProfileUpdater = () => {
  const { register, handleSubmit } = useForm<ProfileInput>();
  const onSubmit: SubmitHandler<ProfileInput> = (data) => {
    // console.log(data);
    profileUpdate(data);
  };
  const { mutate: profileUpdate } = trpc.profile.updateProfile.useMutation();
  return (
    <>
      <main className="flex flex-col items-start justify-start px-20">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <p className="text-center text-2xl font-bold ">Update Profile</p>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" flex flex-col gap-3 text-white"
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
                placeholder=""
                value="Update Profile"
              />
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfileUpdater;
