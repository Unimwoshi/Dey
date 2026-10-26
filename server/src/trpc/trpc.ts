// server/src/trpc/trpc.ts
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import jwt from 'jsonwebtoken';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export function createContext({ req, res }: CreateExpressContextOptions) {
    const token = req.cookies?.token;
    let userId: number | null = null;
    if (token) {
        try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
        userId = payload.userId;
        } catch {
        // invalid/expired token → stays unauthenticated, not a crash
        }
    }
    return { req, res, userId };
}

type Context = ReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({ transformer: superjson });

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});