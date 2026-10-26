import { drizzle } from 'drizzle-orm/neon-http';
import { eq, and } from 'drizzle-orm';
import { businessMembers, businessInvites, users } from '../../db/schema';
import { requireBusinessMember, requirePermission } from '../../lib/permissions';
import { TRPCError } from '@trpc/server';
import { customAlphabet } from 'nanoid';

const db = drizzle(process.env.DATABASE_URL!);
const generateCode = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 8);

async function assertPermission(userId: number, businessId: number, key: string) {
  const member = await requireBusinessMember(userId, businessId);
  const allowed = await requirePermission(member.id, member.roleId, key);
  if (!allowed) throw new TRPCError({ code: 'FORBIDDEN', message: `Missing permission: ${key}` });
  return member;
}

export async function listMembers(userId: number, businessId: number) {
  await assertPermission(userId, businessId, 'team:view');
  return db
    .select({ id: businessMembers.id, userId: businessMembers.userId, roleId: businessMembers.roleId, jobTitle: businessMembers.jobTitle, status: businessMembers.status, name: users.firstName })
    .from(businessMembers)
    .innerJoin(users, eq(businessMembers.userId, users.id))
    .where(and(eq(businessMembers.businessId, businessId), eq(businessMembers.status, 'active')));
}

export async function listInvites(userId: number, businessId: number) {
  await assertPermission(userId, businessId, 'team:view');
  return db.select().from(businessInvites).where(and(eq(businessInvites.businessId, businessId), eq(businessInvites.status, 'pending')));
}


const INVITE_EXPIRY_DAYS = 7;

export async function inviteMember(userId: number, input: { businessId: number; email: string; roleId: number }) {
  await assertPermission(userId, input.businessId, 'team:invite');
  const expiresAt = new Date(Date.now() + INVITE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
  const [invite] = await db
    .insert(businessInvites)
    .values({ businessId: input.businessId, email: input.email, roleId: input.roleId, code: generateCode(), invitedBy: userId, expiresAt })
    .returning();
  return invite;
}

export async function acceptInvite(userId: number, code: string) {
  const [invite] = await db.select().from(businessInvites).where(and(eq(businessInvites.code, code), eq(businessInvites.status, 'pending')));
  if (!invite) throw new TRPCError({ code: 'NOT_FOUND', message: 'Invalid or expired invite code' });

  if (invite.expiresAt && invite.expiresAt < new Date()) {
    await db.update(businessInvites).set({ status: 'expired' }).where(eq(businessInvites.id, invite.id));
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Invalid or expired invite code' });
  }

  await db.insert(businessMembers).values({ businessId: invite.businessId, userId, roleId: invite.roleId, status: 'active' });
  await db.update(businessInvites).set({ status: 'accepted' }).where(eq(businessInvites.id, invite.id));
  return { businessId: invite.businessId };
}

export async function cancelInvite(userId: number, input: { businessId: number; inviteId: number }) {
  await assertPermission(userId, input.businessId, 'team:invite');
  await db.update(businessInvites).set({ status: 'revoked' }).where(eq(businessInvites.id, input.inviteId));
  return { success: true };
}

export async function removeMember(userId: number, input: { businessId: number; memberId: number }) {
  await assertPermission(userId, input.businessId, 'team:remove');
  await db.update(businessMembers).set({ status: 'removed', removedAt: new Date() }).where(eq(businessMembers.id, input.memberId));
  return { success: true };
}

export async function updateMemberRole(userId: number, input: { businessId: number; memberId: number; roleId: number }) {
  await assertPermission(userId, input.businessId, 'team:update_role');
  await db.update(businessMembers).set({ roleId: input.roleId }).where(eq(businessMembers.id, input.memberId));
  return { success: true };
}