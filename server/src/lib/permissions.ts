import { drizzle } from 'drizzle-orm/neon-http';
import { eq, and } from 'drizzle-orm';
import { businessMembers, rolePermissions, memberPermissionOverrides, permissions } from '../db/schema';
import { TRPCError } from '@trpc/server';

const db = drizzle(process.env.DATABASE_URL!);

export async function requireBusinessMember(userId: number, businessId: number) {
  const [member] = await db
    .select()
    .from(businessMembers)
    .where(and(eq(businessMembers.userId, userId), eq(businessMembers.businessId, businessId), eq(businessMembers.status, 'active')));

  if (!member) throw new TRPCError({ code: 'FORBIDDEN', message: 'Not a member of this business' });
  return member; // this is the ABAC scoping — resolving strictly within businessId
}

export async function requirePermission(businessMemberId: number, roleId: number, key: string) {
  const [perm] = await db.select().from(permissions).where(eq(permissions.key, key));
  if (!perm) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Unknown permission: ${key}` });

  const [override] = await db
    .select()
    .from(memberPermissionOverrides)
    .where(and(eq(memberPermissionOverrides.businessMemberId, businessMemberId), eq(memberPermissionOverrides.permissionId, perm.id)));

  if (override) return override.effect === 'allow'; // PBAC wins outright, allow or deny

  const [roleGrant] = await db
    .select()
    .from(rolePermissions)
    .where(and(eq(rolePermissions.roleId, roleId), eq(rolePermissions.permissionId, perm.id)));

  return !!roleGrant; // fall back to RBAC default
}