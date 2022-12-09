import { z } from "zod";

import { publicProcedure, router } from "../trpc";

export const loadoutRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
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
            horizontalTune: z.string(),
            verticalTune: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      console.log("input", input);
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
