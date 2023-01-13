import { FaTwitch } from "react-icons/fa";

const Twitch = ({ twitch }: { twitch: string | null }) => {
  return (
    <>
      {twitch != null ? (
        <a href={twitch != null ? `${twitch}` : ""}>
          <FaTwitch
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

export default Twitch;
