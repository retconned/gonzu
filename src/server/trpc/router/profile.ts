import { z } from "zod";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const profileRouter = router({
  getAllProfiles: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.profile.findMany();
  }),
  getUnqiueProfile: publicProcedure
    .input(z.string())
    .query(({ input, ctx }) => {
      return ctx.prisma.profile.findUnique({
        where: {
          username: input,
        },
      });
    }),
  createProfile: publicProcedure
    .input(
      z.object({
        username: z.string(),
        loadouts: z.array(z.string().nullish()).nullish(),
        twitch: z.string().optional(),
        twitter: z.string().optional(),
        youtube: z.string().optional(),
        tiktok: z.string().optional(),
        instagram: z.string().optional(),
        is_streamer: z.boolean(),
        language: z.string().optional(),
        input: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.profile.create({
        data: {
          username: input.username.toLowerCase(),
          loadouts: [],
          twitch: `https://www.twitch.tv/${input.twitch?.toLowerCase()}`,
          twitter: `https://www.twitter.com/${input.twitter}`,
          youtube: input.youtube,
          tiktok: `https://www.tiktok.com/@${input.tiktok}`,
          instagram: `https://www.instagram.com/${input.instagram}`,
          is_streamer: input.is_streamer,
          language: input.language,
          input: input.input,
          LiveStatus: {
            connectOrCreate: {
              where: {
                channel: `https://www.twitch.tv/${input.twitch?.toLowerCase()}`,
              },
              create: {
                is_live: false,
              },
            },
          },
        },
      });
    }),
  createProfileOnboarding: protectedProcedure
    .input(
      z.object({
        username: z.string(),
        loadouts: z.array(z.string().nullish()).nullish(),
        twitch: z.string().optional(),
        twitter: z.string().optional(),
        youtube: z.string().optional(),
        tiktok: z.string().optional(),
        instagram: z.string().optional(),
        is_streamer: z.boolean(),
        language: z.string().optional(),
        input: z.string(),
        profile_image_url: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.profile.create({
        data: {
          username: input.username.toLowerCase(),
          loadouts: [],
          twitch: `https://www.twitch.tv/${input.twitch?.toLowerCase()}`,
          twitter: `https://www.twitter.com/${input.twitter}`,
          youtube: input.youtube,
          tiktok: `https://www.tiktok.com/@${input.tiktok}`,
          instagram: `https://www.instagram.com/${input.instagram}`,
          is_streamer: input.is_streamer,
          language: input.language,
          input: input.input,
          profile_image_url: input.input,
          LiveStatus: {
            connectOrCreate: {
              where: {
                channel: `https://www.twitch.tv/${input.twitch?.toLowerCase()}`,
              },
              create: {
                is_live: false,
              },
            },
          },
          // LiveStatus: {
          //   connect: {
          //     channel: `https://www.twitch.tv/${input.twitch?.toLowerCase()}`,
          //   },
          // },
        },
      });
    }),
  updateProfile: publicProcedure
    .input(
      z.object({
        username: z.string(),
        twitch: z.string().optional(),
        twitter: z.string().optional(),
        youtube: z.string().optional(),
        tiktok: z.string().optional(),
        instagram: z.string().optional(),
        language: z.string().optional(),
        input: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.profile.updateMany({
        where: {
          username: input.username.toLowerCase(),
        },
        data: {
          twitch:
            input.twitch != ""
              ? `https://www.twitch.tv/${input.twitch?.toLowerCase()}`
              : null,
          twitter:
            input.twitter != ""
              ? `https://www.twitter.com/${input.twitter}`
              : null,
          youtube: input.youtube != "" ? input.youtube : null,
          tiktok:
            input.tiktok != ""
              ? `https://www.tiktok.com/@${input.tiktok}`
              : null,
          instagram:
            input.instagram != ""
              ? `https://www.instagram.com/${input.instagram}`
              : null,
          language: input.language != "" ? input.language : "en",
          input: input.input,
        },
      });
    }),
  getAllProfileNames: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.profile.findMany({
      select: {
        username: true,
      },
    });
  }),
});
