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
          twitch: input.twitch,
          twitter: input.twitter,
          youtube: input.youtube,
          tiktok: input.tiktok,
          instagram: input.instagram,
          is_streamer: input.is_streamer,
          language: input.language,
        },
      });
    }),
  addLoadoutToProfile: publicProcedure
    .input(
      z.object({
        username: z.string(),
        loadoutId: z.array(z.string()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.profile.update({
        where: {
          username: input.username,
        },
        data: {
          loadouts: input.loadoutId,
        },
      });
    }),
  getCurrentLoadout: publicProcedure
    .input(z.string())
    .query(({ input, ctx }) => {
      return ctx.prisma.profile.findMany({
        where: {
          username: input,
        },
        select: {
          loadouts: true,
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
