import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const User = {
  clerkId: v.string(),
  email: v.string(),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
  imageUrl: v.optional(v.string()),
  pushToken: v.optional(v.string()),
};

export const CivilGuard = {
  userId: v.id('users'),
  badgeNumber: v.string(),
  rank: v.string(),
  status: v.union(v.literal('active'), v.literal('inactive')),
};

export enum DutyType {
  Patrol = 'patrol',
  Event = 'event',
}
export const Duty = {
  civilGuardId: v.id('civilGuards'),
  startedAt: v.number(),
  endedAt: v.optional(v.number()),
  description: v.optional(v.string()),
  dutyType: v.union(v.literal(DutyType.Patrol), v.literal(DutyType.Event)),
};

export default defineSchema({
  users: defineTable(User)
    .index('by_email', ['email'])
    .index('by_clerk_id', ['clerkId']),
  civilGuards: defineTable(CivilGuard),
  duties: defineTable(Duty),
});
