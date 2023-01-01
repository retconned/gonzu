import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export const weaponRouter = router({
  getWeaponByName: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.weapon.findMany({
      where: {
        name: input,
      },
      include: {
        Attachments: true,
      },
    });
  }),
  getAttachmentById: publicProcedure
    .input(z.number())
    .query(({ input, ctx }) => {
      return ctx.prisma.attachment.findUnique({
        where: {
          id: input,
        },
      });
    }),
  getAttachments: publicProcedure
    .input(z.array(z.number()))
    .query(({ input, ctx }) => {
      return ctx.prisma.attachment.findMany({
        where: {
          id: {
            in: input,
          },
        },
      });
    }),
  getAllWeapons: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.weapon.findMany({
      include: {
        Attachments: true,
      },
    });
  }),
});
