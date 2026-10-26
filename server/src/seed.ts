// server/src/seed.ts
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { roles, plans, planRoles, permissions, rolePermissions } from './db/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function upsertRole(name: string) {
  await db.insert(roles).values({ name }).onConflictDoNothing();
  const [role] = await db.select().from(roles).where(eq(roles.name, name));
  return role;
}

async function upsertPlan(name: string, displayName: string) {
  const [existing] = await db.select().from(plans).where(eq(plans.name, name));
  if (existing) return existing;
  const [plan] = await db.insert(plans).values({ name, displayName, isPublic: true }).returning();
  return plan;
}

async function upsertPermission(key: string) {
  await db.insert(permissions).values({ key }).onConflictDoNothing();
  const [perm] = await db.select().from(permissions).where(eq(permissions.key, key));
  return perm;
}

async function main() {
  const owner = await upsertRole('owner');
  const manager = await upsertRole('manager');
  const employee = await upsertRole('employee');

  const freePlan = await upsertPlan('free', 'Free');

  await db.insert(planRoles).values([
    { planId: freePlan.id, roleId: owner.id },
    { planId: freePlan.id, roleId: manager.id },
    { planId: freePlan.id, roleId: employee.id },
  ]).onConflictDoNothing();

  const permKeys = ['team:view', 'team:invite', 'team:remove', 'team:update_role'];
  const permEntries = await Promise.all(permKeys.map(async (key) => [key, await upsertPermission(key)] as const));
  const perms = Object.fromEntries(permEntries);

  await db.insert(rolePermissions).values([
    { roleId: owner.id, permissionId: perms['team:view'].id },
    { roleId: owner.id, permissionId: perms['team:invite'].id },
    { roleId: owner.id, permissionId: perms['team:remove'].id },
    { roleId: owner.id, permissionId: perms['team:update_role'].id },
    { roleId: manager.id, permissionId: perms['team:view'].id },
    { roleId: manager.id, permissionId: perms['team:invite'].id },
    { roleId: employee.id, permissionId: perms['team:view'].id },
  ]).onConflictDoNothing();

  console.log('Seed complete:', { roles: { owner, manager, employee }, plan: freePlan });
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});