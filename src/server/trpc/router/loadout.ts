import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export const loadoutRouter = router({
  getLoadoutById: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.loadout.findUnique({
      where: {
        id: input,
      },
      include: {
        Weapon: {
          include: {
            Attachments: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });
  }),
  getProfileLoadout: publicProcedure
    .input(z.array(z.string()))
    .query(({ input, ctx }) => {
      return ctx.prisma.loadout.findMany({
        where: {
          id: {
            in: input,
          },
        },
        include: {
          Weapon: {
            include: {
              Attachments: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
        },
      });
    }),
  getAllLoadouts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.loadout.findMany();
  }),
  createLoadout: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        weaponBody: z.string(),
        attachments: z.array(
          z.object({
            id: z.number(),
            horizontalTune: z.number(),
            verticalTune: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.loadout.create({
        data: {
          loadoutName: input.name,
          weaponBody: input.weaponBody,
          attachments: input.attachments,
          likes: 0,
          visible: false,
        },
      });
    }),
  updateLoadoutById: publicProcedure
    .input(
      z.object({
        id: z.string(),
        attachments: z.array(
          z.object({
            id: z.number(),
            horizontalTune: z.number(),
            verticalTune: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.loadout.updateMany({
        where: {
          id: input.id,
        },
        data: {
          attachments: input.attachments,
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
  getCurrentUserLoadout: publicProcedure
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

  getLoadoutByIdForTrending: publicProcedure
    .input(z.string())
    .query(({ input, ctx }) => {
      return ctx.prisma.loadout.findUnique({
        where: {
          id: input,
        },
        include: {
          Weapon: {
            select: {
              image: true,
              type: true,
            },
          },
        },
      });
    }),
});
