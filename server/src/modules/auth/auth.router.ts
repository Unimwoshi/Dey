import { router, publicProcedure, protectedProcedure } from '../../trpc/trpc';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { users } from '../../db/schema';
import { signupSchema, loginSchema } from './auth.schema';
import * as authService from './auth.service';

const db = drizzle(process.env.DATABASE_URL!);

export const authRouter = router({
  signup: publicProcedure
    .input(signupSchema)
    .mutation(async ({ input, ctx }) => {
      const token = await authService.signup(input);
      ctx.res.cookie('token', token, { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
      return { success: true };
    }),

  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input, ctx }) => {
      const token = await authService.login(input);
      ctx.res.cookie('token', token, { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
      return { success: true };
    }),

    
    me: protectedProcedure.query(async ({ ctx }) => {
      const [user] = await db.select().from(users).where(eq(users.id, ctx.userId));
      return user ? { id: user.id, name: user.name, email: user.email } : null;
    }),
});