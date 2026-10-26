// server/src/test-team.ts
import 'dotenv/config'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { businesses, plans, users, roles, businessMembers, businessInvites } from './db/schema';
import type { AppRouter } from './trpc/router';

const db = drizzle(process.env.DATABASE_URL!);

function makeClient() {
  let cookie = '';
  const client = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({
      url: 'http://localhost:5000/trpc',
      transformer: superjson,
      fetch: async (url, opts) => {
        const res = await fetch(url, { ...opts, headers: { ...opts?.headers, cookie } });
        const setCookie = res.headers.get('set-cookie');
        if (setCookie) cookie = setCookie.split(';')[0];
        return res;
      },
    })],
  });
  return client;
}

async function main() {
  const owner = makeClient();
  const invitee = makeClient();

  const runId = Date.now();
    const ownerEmail = `owner-test-${runId}@example.com`;
    const inviteeEmail = `invitee-test-${runId}@example.com`;

  await owner.auth.signup.mutate({ firstName: 'Owner', lastName: 'Test', email: ownerEmail, password: 'password123' });
  await invitee.auth.signup.mutate({ firstName: 'Invitee', lastName: 'Test', email: inviteeEmail, password: 'password123' });

  const [ownerUser] = await db.select().from(users).where(eq(users.email, ownerEmail));
  const [freePlan] = await db.select().from(plans).where(eq(plans.name, 'free'));
  const [business] = await db.insert(businesses).values({ name: 'Test Biz', ownerId: ownerUser.id, planId: freePlan.id }).returning();

  const [ownerRole] = await db.select().from(roles).where(eq(roles.name, 'owner'));
    await db.insert(businessMembers).values({ businessId: business.id, userId: ownerUser.id, roleId: ownerRole.id });

    const [employeeRole] = await db.select().from(roles).where(eq(roles.name, 'employee'));
    const [managerRole] = await db.select().from(roles).where(eq(roles.name, 'manager'));

    const invite = await owner.team.inviteMember.mutate({ businessId: business.id, email: inviteeEmail, roleId: employeeRole.id });
    console.log('Invite created:', invite);

  const accepted = await invitee.team.acceptInvite.mutate({ code: invite.code });
  console.log('Invite accepted:', accepted);

  const members = await owner.team.listMembers.query({ businessId: business.id });
  console.log('Members after accept:', members);

  // --- cancelInvite ---
const secondInvite = await owner.team.inviteMember.mutate({ businessId: business.id, email: 'canceled@example.com', roleId: employeeRole.id });
await owner.team.cancelInvite.mutate({ businessId: business.id, inviteId: secondInvite.id });
console.log('Invite canceled — confirming it can no longer be accepted...');
try {
  await invitee.team.acceptInvite.mutate({ code: secondInvite.code });
  console.error('FAIL: canceled invite was accepted — should have thrown');
} catch (err) {
  console.log('PASS: canceled invite correctly rejected');
}

// --- expiration ---
const thirdInvite = await owner.team.inviteMember.mutate({ businessId: business.id, email: 'expired@example.com', roleId: employeeRole.id });
// manually backdate it to simulate time passing — this bypasses the API on purpose, it's test setup, not a real flow
await db.update(businessInvites).set({ expiresAt: new Date(Date.now() - 1000) }).where(eq(businessInvites.id, thirdInvite.id));
try {
  await invitee.team.acceptInvite.mutate({ code: thirdInvite.code });
  console.error('FAIL: expired invite was accepted — should have thrown');
} catch (err) {
  console.log('PASS: expired invite correctly rejected');
}

// --- updateMemberRole ---
const membersBefore = await owner.team.listMembers.query({ businessId: business.id });
const inviteeMember = membersBefore.find((m) => m.userId !== ownerUser.id);
await owner.team.updateMemberRole.mutate({ businessId: business.id, memberId: inviteeMember!.id, roleId: managerRole.id }); // need managerRole fetched same way as employeeRole
const membersAfterRoleChange = await owner.team.listMembers.query({ businessId: business.id });
console.log('Role updated:', membersAfterRoleChange.find((m) => m.id === inviteeMember!.id));

// --- removeMember ---
await owner.team.removeMember.mutate({ businessId: business.id, memberId: inviteeMember!.id });
const membersAfterRemoval = await owner.team.listMembers.query({ businessId: business.id });
console.log('Members after removal (should be owner only):', membersAfterRemoval);
}

main().catch((err) => console.error('Team test failed:', err));