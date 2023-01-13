import { FaTiktok } from "react-icons/fa";

const Tiktok = ({ tiktok }: { tiktok: string | null }) => {
  return (
    <>
      {tiktok != null ? (
        <a href={tiktok != null ? `${tiktok}` : ""}>
          <FaTiktok
            size={22}
            className="fill-lime-400 duration-100 hover:fill-lime-600"
          />
        </a>
      ) : (
        ""
      )}
    </>
  );
};

export default Tiktok;
