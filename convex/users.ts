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
