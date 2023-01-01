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
  // getProfileLoadoutOld: publicProcedure
  //   .input(z.array(z.string()))
  //   .query(({ input, ctx }) => {
  //     console.log(input);
  //     return ctx.prisma.loadout.findMany({
  //       where: {
  //         id: {
  //           in: input,
  //         },
  //       },
  //       include: {
  //         Weapon: {
  //           select: {
  //             type: true,
  //             image: true,
  //           },
  //         },
  //       },
  //     });
  //   }),
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
});
