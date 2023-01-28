import {
  FaInstagram,
  FaTiktok,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const SkeletonProfileComponent = () => {
  return (
    <>
      <div className="flex w-56 max-w-sm select-none flex-col items-center justify-between space-y-2 rounded-md border border-neutral-700 bg-neutral-800 px-4 py-4 duration-200 ">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="outline-5 outline-offset-2 outline-red-600">
            <div className="h-20 w-20 select-none overflow-hidden rounded-full bg-neutral-600 ">
              <div className="h-20 w-20 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-100/10 to-transparent"></div>
            </div>
          </div>
          <div className="h-6 w-32 select-none overflow-hidden rounded-md bg-neutral-600 ">
            <div className="h-20 w-20 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-100/10 to-transparent"></div>
          </div>
          <div className="h-7 w-24 select-none overflow-hidden rounded-md bg-neutral-600 ">
            <div className="h-20 w-20 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-100/10 to-transparent"></div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center space-x-4">
          <FaTwitch size={22} className="fill-neutral-400 " />
          <FaTwitter size={22} className="fill-neutral-400 " />
          <FaYoutube size={22} className="fill-neutral-400 " />
          <FaTiktok size={22} className="fill-neutral-400 " />
          <FaInstagram size={22} className="fill-neutral-400 " />
        </div>
        <div>
          <div className="mt-1 w-full select-none rounded-md bg-neutral-600 px-2 py-2 text-center font-medium text-neutral-100/50 duration-200 hover:text-neutral-100/80">
            View loadouts {">"}
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonProfileComponent;
