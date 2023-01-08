import { type NextApiRequest, type NextApiResponse } from "next";

import { env } from "../../env/server.mjs";
import { prisma } from "../../server/db/client";

const getTwitchAccessToken = async () => {
  const authUrl = `https://id.twitch.tv/oauth2/token?client_id=${env.TWITCH_CLIENT_ID}&client_secret=${env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;
  const response = await fetch(authUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  if (response) {
    const json = await response.json();
    return json.access_token;
  }
};

const getProfilePicture = async (channel: string) => {
  const accessToken = await getTwitchAccessToken();
  if (accessToken) {
    const response = await fetch(
      `https://api.twitch.tv/helix/users?login=${channel}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": env.TWITCH_CLIENT_ID,
        },
      },
    );
    const json = await response.json();
    if (json.data) {
      const { data } = json;
      const foundChannel = data.find((channel: unknown) => channel);

      if (foundChannel) {
        if (foundChannel.profile_image_url) {
          return foundChannel.profile_image_url;
        }
        return;
      }
    }
  }
};

const updateProfilePuictures = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const profiles = await prisma.profile.findMany({
    select: {
      twitch: true,
    },
  });
  for (const profile of profiles) {
    const getTwitchName = profile.twitch?.split("/");
    const twitchUsername = getTwitchName?.at(-1);
    if (twitchUsername != undefined) {
      const imageUrl = await getProfilePicture(twitchUsername);
      if (imageUrl) {
        await prisma.profile.updateMany({
          where: {
            twitch: profile.twitch,
          },
          data: {
            profile_image_url: imageUrl,
          },
        });
      } else
        await prisma.profile.updateMany({
          where: {
            twitch: profile.twitch,
          },
          data: {
            profile_image_url: null,
          },
        });
    }
  }
  await prisma.$disconnect();
  res.status(200).json(`Updated ${profiles.length} profiles`);
};

export default updateProfilePuictures;
