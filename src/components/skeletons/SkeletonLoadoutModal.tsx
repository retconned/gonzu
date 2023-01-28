const SkeletonLoadoutModal = () => {
  return (
    <>
      <div className="flex max-w-fit flex-col items-center justify-center gap-2 rounded-md bg-neutral-800 p-4">
        <div className="flex flex-col items-center justify-center gap-2 pt-4">
          <div className="h-6 w-60 select-none overflow-hidden rounded-md bg-neutral-600 ">
            <div className="h-20 w-60 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-100/10 to-transparent"></div>
          </div>
          <div className="h-6 w-60 select-none overflow-hidden rounded-md bg-neutral-600 ">
            <div className="h-20 w-60 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-100/10 to-transparent"></div>
          </div>
        </div>

        <div className="h-[146.25px] w-[292.5px] select-none  overflow-hidden rounded-md bg-neutral-600 ">
          <div className="h-[195px] w-[390px] -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-100/10 to-transparent"></div>
        </div>

        <div className="container m-auto flex flex-col items-center gap-4 md:grid md:grid-cols-2 md:flex-row md:flex-wrap-reverse md:justify-around md:gap-4 ">
          <div className="col-span-2 flex items-center justify-center">
            <SkeletonAttachmentComponent />
          </div>

          <SkeletonAttachmentComponent />
          <SkeletonAttachmentComponent />
          <SkeletonAttachmentComponent />
          <SkeletonAttachmentComponent />
        </div>
      </div>
    </>
  );
};

export default SkeletonLoadoutModal;

const SkeletonAttachmentComponent = () => {
  return (
    <div className="">
      <div className="flex h-24 w-72 flex-col items-stretch justify-center space-y-1 rounded-md border border-neutral-700 p-4">
        <div className="h-8 w-full select-none overflow-hidden rounded-md bg-neutral-600 ">
          <div className="h-20 w-full -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-100/10 to-transparent"></div>
        </div>
        <div className="h-8 w-full select-none overflow-hidden rounded-md bg-neutral-600 ">
          <div className="h-20 w-full -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-100/10 to-transparent"></div>
        </div>
        <div className="h-8 w-full select-none overflow-hidden rounded-md bg-neutral-600 ">
          <div className="h-20 w-full -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-100/10 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};
