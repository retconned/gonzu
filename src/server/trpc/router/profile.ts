import { z } from "zod";

import { publicProcedure, router } from "../trpc";

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
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.profile.create({
        data: {
          username: input.username.toLowerCase(),
          loadouts: [],
          twitch: `https://www.twitch.tv/${input.twitch}`,
          twitter: `https://www.twitter.com/${input.twitter}`,
          youtube: input.youtube,
          tiktok: `https://www.tiktok.com/@${input.tiktok}`,
          instagram: `https://www.instagram.com/${input.instagram}`,
          is_streamer: input.is_streamer,
          language: input.language,
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
