export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api/admin')) {
    return;
  }

  const session = await requireUserSession(event);
  const hasAdminRole = session.user.roles.includes('admin');

  if (!hasAdminRole) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }
});
