import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { loadoutRouter } from "./loadout";
import { profileRouter } from "./profile";
import { weaponRouter } from "./weapons";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  weapons: weaponRouter,
  loadout: loadoutRouter,
  profile: profileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
