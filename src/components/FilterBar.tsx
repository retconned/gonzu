const FilterBar = () => {
  const filters = [
    "All",
    "AR",
    "BR",
    "SMG",
    "Shotgun",
    "LMG",
    "MR",
    "SR",
    "Melee",
    "Handgun",
    "Launcher",
  ];

  return (
    <div className="flex w-fit items-start  justify-start rounded-md border border-neutral-700 bg-neutral-800 px-10 py-4 text-neutral-200 md:w-fit md:items-center md:justify-center lg:w-8/12 ">
      <div className="grid grid-cols-3 items-center justify-center gap-y-2 gap-x-4 md:w-fit md:grid-cols-4 md:justify-start md:gap-y-2 lg:w-full lg:grid-cols-11 ">
        {filters.map((filter) => (
          <button
            key={filter}
            className="w-full truncate rounded-md bg-neutral-400/20 px-3 py-2 text-center text-sm text-neutral-400 duration-150 hover:bg-neutral-400/40"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
