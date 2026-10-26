import { z } from 'zod';

export const listMembersSchema = z.object({ businessId: z.number() });
export const listInvitesSchema = z.object({ businessId: z.number() });

export const inviteMemberSchema = z.object({
  businessId: z.number(),
  email: z.string().email(),
  roleId: z.number(),
});

export const cancelInviteSchema = z.object({ businessId: z.number(), inviteId: z.number() });

export const removeMemberSchema = z.object({ businessId: z.number(), memberId: z.number() });

export const updateMemberRoleSchema = z.object({
  businessId: z.number(),
  memberId: z.number(),
  roleId: z.number(),
});

export const acceptInviteSchema = z.object({ code: z.string() });