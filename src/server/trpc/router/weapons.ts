import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export const weaponRouter = router({
  getWeaponByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input, ctx }) => {
      // console.log(input);
      return ctx.prisma.weapon.findMany({
        where: {
          name: input?.name,
        },
        include: {
          Attachments: true,
        },
      });
    }),
  getAttachmentById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      // console.log(input);
      return ctx.prisma.attachment.findUnique({
        where: {
          id: input?.id,
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
