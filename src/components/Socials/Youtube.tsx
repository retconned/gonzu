import { FaYoutube } from "react-icons/fa";

const Youtube = ({ youtube }: { youtube: string | null }) => {
  return (
    <>
      {youtube != null ? (
        <a href={youtube != null ? `${youtube}` : ""}>
          <FaYoutube
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

export default Youtube;
