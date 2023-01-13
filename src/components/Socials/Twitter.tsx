import { FaTwitter } from "react-icons/fa";

const Twitter = ({ twitter }: { twitter: string | null }) => {
  return (
    <>
      {twitter != null ? (
        <a href={twitter != null ? `${twitter}` : ""}>
          <FaTwitter
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

export default Twitter;
