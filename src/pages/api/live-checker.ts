import { type NextApiRequest, type NextApiResponse } from "next";

import { env } from "../../env/server.mjs";
import { prisma } from "../../server/db/client";
import type { twitchResponeBody } from "../../types/types.js";

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

const buildUri = async (profiles: { channel: string }[]) => {
  const base_url = "https://api.twitch.tv/helix/streams?";

  const streams: Array<string> = [];
  profiles.forEach((profile: { channel: string }, i: number) => {
    const getTwitchName = profile.channel?.split("/");
    const twitchUsername = getTwitchName?.at(-1);

    if (i < profiles.length - 1) {
      streams.push(`user_login=${twitchUsername}&`);
    } else {
      streams.push(`user_login=${twitchUsername}`);
    }
  });
  const textProcess = streams.toString();
  const usersQuery = textProcess.replaceAll(",", "");
  const finalStringUrl = base_url + usersQuery;

  return finalStringUrl;
};

const getData = async (url: string) => {
  const liveChannels: Array<string> = [];
  const accessToken = await getTwitchAccessToken();
  if (accessToken) {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": env.TWITCH_CLIENT_ID,
      },
    });
    const json = await response.json();
    if (json.data) {
      const { data } = json;
      console.log("fetched from twitch");
      data.forEach(async (channel: twitchResponeBody) => {
        const channelUrl = `https://www.twitch.tv/${channel.user_login}`;
        liveChannels.push(channelUrl);
      });
    }
  }
  return liveChannels;
};

const offlineChannelsData = (
  profiles: { channel: string }[],
  liveChannels: string | string[],
) => {
  const allStreams: Array<string> = [];

  profiles.forEach((profile: { channel: string }) => {
    allStreams.push(profile.channel.toLowerCase());
    return allStreams;
  });
  const offlineChannels = allStreams.filter(
    (item) => !liveChannels?.includes(item),
  );
  return offlineChannels;
};

const TwitchStatusChecker = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const profiles = await prisma.liveStatus.findMany();
  const url = await buildUri(profiles);

  const liveChannels = await getData(url);
  const offlineChannels = offlineChannelsData(profiles, liveChannels);

  // this persists online channels to db
  liveChannels?.forEach(async (channel) => {
    await prisma.liveStatus.update({
      where: {
        channel: channel,
      },
      data: {
        is_live: true,
      },
    });
    console.log(`made ${channel} online`);
  });

  // this persists offline channels to db
  offlineChannels.forEach(async (channel) => {
    await prisma.liveStatus.update({
      where: {
        channel: channel,
      },
      data: {
        is_live: false,
      },
    });
    console.log(`made ${channel} offline`);
  });

  await prisma.$disconnect();

  res.status(200).json(`Updated channel status 👍`);
};

export default TwitchStatusChecker;
