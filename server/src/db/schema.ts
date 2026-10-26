import { pgTable, serial, varchar, integer, boolean, timestamp, pgEnum, primaryKey, text } from 'drizzle-orm/pg-core';

export const memberStatusEnum = pgEnum('member_status', ['active', 'removed']);
export const overrideEffectEnum = pgEnum('override_effect', ['allow', 'deny']);
export const modulePricingEnum = pgEnum('module_pricing', ['free', 'paid']);
export const moduleStatusEnum = pgEnum('module_status', ['draft', 'published', 'deprecated']);
export const registrationStatusEnum = pgEnum('registration_status', [
  'registered',
  'in_registration',
  'not_registered',
]);

export const inviteStatusEnum = pgEnum('invite_status', ['pending', 'accepted', 'expired', 'revoked']);
export const taskStatusEnum = pgEnum('task_status', ['todo', 'in_progress', 'done']);
export const financeAccountTypeEnum = pgEnum('finance_account_type', ['cash', 'bank', 'mobile_money', 'other']);
export const transactionTypeEnum = pgEnum('transaction_type', ['income', 'expense']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(), // login identifier — TODO confirm vs. Profile step's personalEmail
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 30 }),
  avatarUrl: varchar('avatar_url', { length: 512 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const plans = pgTable('plans', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(), // internal codename, e.g. 'tier_1', 'student'
  displayName: varchar('display_name', { length: 100 }).notNull(),
  isPublic: boolean('is_public').default(true).notNull(), // e.g. student might be invite/verify-only
});

export const businesses = pgTable('businesses', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  ownerId: integer('owner_id').notNull().references(() => users.id),
  planId: integer('plan_id').notNull().references(() => plans.id), 
  description: text('description'),
  businessType: varchar('business_type', { length: 100 }),
  businessEmail: varchar('business_email', { length: 255 }),
  industryType: varchar('industry_type', { length: 100 }),
  phone: varchar('phone', { length: 30 }),
  location: varchar('location', { length: 100 }),
  logoUrl: varchar('logo_url', { length: 512 }),
  registrationStatus: registrationStatusEnum('registration_status'),
  registrationPrefix: varchar('registration_prefix', { length: 10 }), 
  registrationNumber: varchar('registration_number', { length: 50 }),
  registrationDate: timestamp('registration_date'),
  onboardingStep: varchar('onboarding_step', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(), // 'owner', 'manager', 'employee'
});

export const planRoles = pgTable('plan_roles', {
  planId: integer('plan_id').notNull().references(() => plans.id),
  roleId: integer('role_id').notNull().references(() => roles.id),
}, (t) => ({ pk: primaryKey({ columns: [t.planId, t.roleId] }) }));

export const businessMembers = pgTable('business_members', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  userId: integer('user_id').notNull().references(() => users.id),
  roleId: integer('role_id').notNull().references(() => roles.id),
  jobTitle: varchar('job_title', { length: 100 }), // descriptive only — no permission meaning
  status: memberStatusEnum('status').default('active').notNull(),
  invitedAt: timestamp('invited_at').defaultNow().notNull(),
  removedAt: timestamp('removed_at'),
});

export const modules = pgTable('modules', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  isFree: boolean('is_free').default(false).notNull(),
  developerId: integer('developer_id').references(() => users.id), // NULL = built in-house by you
  pricing: modulePricingEnum('pricing').default('free').notNull(),
  price: integer('price'), // in kobo, nullable when pricing = 'free'
  status: moduleStatusEnum('status').default('draft').notNull(), // marketplace listing state
});

export const planModules = pgTable('plan_modules', {
  planId: integer('plan_id').notNull().references(() => plans.id),
  moduleId: integer('module_id').notNull().references(() => modules.id),
}, (t) => [ primaryKey({ columns: [t.planId, t.moduleId] }) ]);

export const businessModules = pgTable('business_modules', {
  businessId: integer('business_id').notNull().references(() => businesses.id),
  moduleId: integer('module_id').notNull().references(() => modules.id),
  enabledAt: timestamp('enabled_at').defaultNow().notNull(),
}, (t) => ({ pk: primaryKey({ columns: [t.businessId, t.moduleId] }) }));

export const permissions = pgTable('permissions', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 100 }).notNull().unique(), // 'finance:read', 'team:invite'
});

export const rolePermissions = pgTable('role_permissions', {
  roleId: integer('role_id').notNull().references(() => roles.id),
  permissionId: integer('permission_id').notNull().references(() => permissions.id),
}, (t) => ({ pk: primaryKey({ columns: [t.roleId, t.permissionId] }) }));

export const memberPermissionOverrides = pgTable('member_permission_overrides', {
  id: serial('id').primaryKey(),
  businessMemberId: integer('business_member_id').notNull().references(() => businessMembers.id),
  permissionId: integer('permission_id').notNull().references(() => permissions.id),
  effect: overrideEffectEnum('effect').notNull(), // 'allow' overrides a missing role perm, 'deny' revokes one they'd otherwise have
});

export const modulePurchases = pgTable('module_purchases', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  moduleId: integer('module_id').notNull().references(() => modules.id),
  pricePaid: integer('price_paid').notNull(), // 0 for free/plan-included
  purchasedAt: timestamp('purchased_at').defaultNow().notNull(),
});

export const businessInvites = pgTable('business_invites', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  email: varchar('email', { length: 255 }).notNull(),
  roleId: integer('role_id').notNull().references(() => roles.id),
  code: varchar('code', { length: 12 }).notNull().unique(), // used as ?invite=CODE and for manual entry
  status: inviteStatusEnum('status').default('pending').notNull(),
  invitedBy: integer('invited_by').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at'),
});

export const announcements = pgTable('announcements', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  authorId: integer('author_id').notNull().references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  pinned: boolean('pinned').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  assigneeId: integer('assignee_id').references(() => users.id), // nullable — unassigned
  status: taskStatusEnum('status').default('todo').notNull(),
  dueDate: timestamp('due_date'),
  createdBy: integer('created_by').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const workspaceChannels = pgTable('workspace_channels', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 100 }).notNull(),
  isDefault: boolean('is_default').default(false).notNull(), // e.g. auto-created "general"
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const workspaceMessages = pgTable('workspace_messages', {
  id: serial('id').primaryKey(),
  channelId: integer('channel_id').notNull().references(() => workspaceChannels.id),
  authorId: integer('author_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  editedAt: timestamp('edited_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const financeAccounts = pgTable('finance_accounts', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  name: varchar('name', { length: 100 }).notNull(), // e.g. "Main till", "GTBank"
  type: financeAccountTypeEnum('type').notNull(),
  balance: integer('balance').default(0).notNull(), // stored in kobo, same pattern as module pricing
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const financeCategories = pgTable('finance_categories', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').references(() => businesses.id), // nullable = global default category
  name: varchar('name', { length: 100 }).notNull(),
  type: transactionTypeEnum('type').notNull(), // a category is either income-side or expense-side
});

export const financeTransactions = pgTable('finance_transactions', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id),
  accountId: integer('account_id').notNull().references(() => financeAccounts.id),
  categoryId: integer('category_id').references(() => financeCategories.id),
  type: transactionTypeEnum('type').notNull(),
  amount: integer('amount').notNull(), // kobo
  description: varchar('description', { length: 255 }),
  receiptUrl: varchar('receipt_url', { length: 512 }),
  recordedBy: integer('recorded_by').notNull().references(() => users.id),
  occurredAt: timestamp('occurred_at').notNull(), // when the transaction happened
  createdAt: timestamp('created_at').defaultNow().notNull(), // when it was logged
});