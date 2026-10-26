// server/src/modules/auth/auth.service.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { users } from '../../db/schema';
import { TRPCError } from '@trpc/server';

const db = drizzle(process.env.DATABASE_URL!);
const JWT_SECRET = process.env.JWT_SECRET!;

export async function signup(input: { firstName: string; lastName: string; email: string; password: string }) {
  const existing = await db.select().from(users).where(eq(users.email, input.email));
  if (existing.length > 0) {
    throw new TRPCError({ code: 'CONFLICT', message: 'Email already in use' });
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const [user] = await db
    .insert(users)
    .values({ firstName: input.firstName, lastName: input.lastName, email: input.email, passwordHash })
    .returning();
  return issueToken(user.id);
}

export async function login(input: { email: string; password: string }) {
  const [user] = await db.select().from(users).where(eq(users.email, input.email));
  if (!user) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentials' });

  const valid = await bcrypt.compare(input.password, user.passwordHash);
  if (!valid) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentials' });

  return issueToken(user.id);
}

function issueToken(userId: number) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}