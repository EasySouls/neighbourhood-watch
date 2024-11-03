import { internal } from './_generated/api';
import { httpAction } from './_generated/server';
import { httpRouter } from 'convex/server';

const http = httpRouter();

export const handleClerkWebhook = httpAction(async (ctx, request) => {
  const { data, type } = await request.json();

  switch (type) {
    case 'user.created':
      console.log('Creating user:', data);
      await ctx.runMutation(internal.users.createUser, {
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        imageUrl: data.image_url,
        pushToken: data.pushToken,
      });
      break;
    case 'user.updated':
      console.log('Updating user:', data);
      await ctx.runMutation(internal.users.updateUser, {
        _id: data.id,
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        imageUrl: data.image_url,
        pushToken: data.pushToken,
      });
      break;
    case 'user.deleted':
      console.log('Deleting user:', data);
      await ctx.runMutation(internal.users.deleteUser, {
        _id: data.id,
      });
      break;
  }
  return new Response();
});

http.route({
  path: '/clerk-users-webhook',
  method: 'POST',
  handler: handleClerkWebhook,
});

export default http;
