import { router, protectedProcedure } from '../../trpc/trpc';
import * as schema from './team.schema';
import * as teamService from './team.service';

export const teamRouter = router({
  listMembers: protectedProcedure.input(schema.listMembersSchema).query(({ input, ctx }) => teamService.listMembers(ctx.userId, input.businessId)),
  listInvites: protectedProcedure.input(schema.listInvitesSchema).query(({ input, ctx }) => teamService.listInvites(ctx.userId, input.businessId)),
  inviteMember: protectedProcedure.input(schema.inviteMemberSchema).mutation(({ input, ctx }) => teamService.inviteMember(ctx.userId, input)),
  cancelInvite: protectedProcedure.input(schema.cancelInviteSchema).mutation(({ input, ctx }) => teamService.cancelInvite(ctx.userId, input)),
  removeMember: protectedProcedure.input(schema.removeMemberSchema).mutation(({ input, ctx }) => teamService.removeMember(ctx.userId, input)),
  updateMemberRole: protectedProcedure.input(schema.updateMemberRoleSchema).mutation(({ input, ctx }) => teamService.updateMemberRole(ctx.userId, input)),
  acceptInvite: protectedProcedure.input(schema.acceptInviteSchema).mutation(({ input, ctx }) => teamService.acceptInvite(ctx.userId, input.code)),
});  