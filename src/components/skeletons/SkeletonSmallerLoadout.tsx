const SkeletonSmallerLoadout = () => {
  return (
    <>
      <div className="flex max-w-sm select-none flex-col items-center justify-center space-y-2 rounded-md border border-neutral-700 bg-neutral-800 p-4">
        <div className="h-[146.25px] w-[270px] select-none overflow-hidden rounded-md bg-neutral-600 ">
          <div className="h-[146.25px] w-[292.5px] -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-100/10 to-transparent"></div>
        </div>
        <div className="flex w-full flex-row items-end justify-between">
          <div className="flex flex-col gap-2">
            <div className="h-6 w-40 select-none overflow-hidden rounded-md bg-neutral-600 ">
              <div className="h-20 w-40 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-100/10 to-transparent"></div>
            </div>
            <div className="h-6 w-40 select-none overflow-hidden rounded-md bg-neutral-600 ">
              <div className="h-20 w-40 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-100/10 to-transparent"></div>
            </div>
          </div>
          <div className="h-6 w-11 select-none overflow-hidden rounded-md bg-neutral-600 ">
            <div className="h-20 w-10 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-100/10 to-transparent"></div>
          </div>
        </div>
        <div>
          <div className="mt-2 w-full  rounded-md border border-neutral-400 px-2 py-2 text-center text-neutral-400 ">
            View build {">"}
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonSmallerLoadout;
