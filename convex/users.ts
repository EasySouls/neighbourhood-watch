import { v } from 'convex/values';
import { internalMutation, query } from './_generated/server';
import { User } from './schema';

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query('users').collect();
    return users;
  },
});

export const createUser = internalMutation({
  args: {
    ...User,
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert('users', {
      ...args,
    });
    return userId;
  },
});

export const updateUser = internalMutation({
  args: {
    ...User,
    _id: v.id('users'),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.patch(args._id, {
      ...args,
    });
    return userId;
  },
});

export const deleteUser = internalMutation({
  args: {
    _id: v.id('users'),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args._id);
  },
});
