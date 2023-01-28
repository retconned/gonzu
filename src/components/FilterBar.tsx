import type { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { useState } from "react";

const FilterBar = ({
  setQuery,
}: {
  setQuery: Dispatch<SetStateAction<string>>;
}) => {
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
  const [activeButton, setActiveButton] = useState<string>("");

  return (
    <div className="flex w-fit items-start justify-start self-start rounded-md px-0 py-2 text-neutral-200 md:w-fit md:items-center md:justify-start lg:w-full ">
      <div className="grid grid-cols-3 items-center justify-center gap-y-2 gap-x-4 md:w-full md:grid-cols-4 md:justify-start md:gap-y-2 lg:w-fit lg:min-w-fit lg:grid-cols-11">
        {filters.map((filter) => (
          <FilterButton
            activeButton={activeButton}
            key={filter}
            filter={filter}
            onClick={() => {
              setActiveButton(filter);
              if (filter == "All") {
                setQuery("");
              } else {
                setQuery(filter);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterBar;

const FilterButton = ({
  onClick,
  filter,
  activeButton,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  filter: string;
  activeButton: string;
}) => {
  return (
    <button
      className={
        activeButton === filter
          ? `w-full truncate rounded-md bg-neutral-300/40 px-3 py-2 text-center text-sm text-neutral-200 duration-150 hover:bg-neutral-400/40 `
          : `w-full truncate rounded-md bg-neutral-400/20 px-3 py-2 text-center text-sm text-neutral-200 duration-150 hover:bg-neutral-400/40 `
      }
      onClick={onClick}
    >
      {filter}
    </button>
  );
};
