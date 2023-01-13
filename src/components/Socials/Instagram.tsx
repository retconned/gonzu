import { FaInstagram } from "react-icons/fa";

const Instagram = ({ instagram }: { instagram: string | null }) => {
  return (
    <>
      {instagram != null ? (
        <a href={instagram != null ? `${instagram}` : ""}>
          <FaInstagram
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

export default Instagram;
