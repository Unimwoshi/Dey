// server/src/trpc/router.ts
import { router } from './trpc';
import { authRouter } from '../modules/auth/auth.router';
import { teamRouter } from '../modules/team/team.router';

export const appRouter = router({
  auth: authRouter,
  team: teamRouter, 
});

export type AppRouter = typeof appRouter; // this is the only thing the client ever imports