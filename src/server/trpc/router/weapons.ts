import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export const weaponRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
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
  getAllWeapons: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.weapon.findMany({
      include: {
        Attachments: true,
      },
    });
  }),
});
