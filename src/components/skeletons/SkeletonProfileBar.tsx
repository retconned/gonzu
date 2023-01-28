const SkelatonProfileBar = () => {
  return (
    <div className="flex w-full flex-wrap items-center justify-between rounded-md border border-neutral-700 bg-neutral-800 px-10 py-4 text-neutral-200">
      <div className="flex flex-row items-center space-x-4">
        <div className=" flex items-center gap-4 text-neutral-200 ">
          <div className="h-[30px] w-[30px] select-none overflow-hidden rounded-full bg-neutral-600 ">
            <div className="h-20 w-20 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-100/10 to-transparent"></div>
          </div>
          <div className="h-7 w-40 select-none overflow-hidden rounded-md bg-neutral-600 ">
            <div className="h-20 w-40 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-100/10 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkelatonProfileBar;
