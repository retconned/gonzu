import {
  FaDiscord,
  FaInstagram,
  FaTiktok,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export const Twitter = ({ twitter }: { twitter: string | null }) => {
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

export const Youtube = ({ youtube }: { youtube: string | null }) => {
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

export const Twitch = ({ twitch }: { twitch: string | null }) => {
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

export const Tiktok = ({ tiktok }: { tiktok: string | null }) => {
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

export const Instagram = ({ instagram }: { instagram: string | null }) => {
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
export const Discord = ({ discord }: { discord: string | null }) => {
  return (
    <>
      {discord != null ? (
        <a href={discord != null ? `${discord}` : ""}>
          <FaDiscord
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
