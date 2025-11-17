import prisma from '~~/lib/prisma';

export default defineEventHandler(async (event) => {
  // Idea: paginación
  const session = await getUserSession(event);

  const slug = getRouterParam(event, 'slug');
  const userId = session.user?.id || null;

  const productReviews = await prisma.productReview.findMany({
    where: {
      product: {
        slug: slug,
      },
    },
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
  });

  const userHasReview = await prisma.productReview.findFirst({
    where: {
      product: {
        slug: slug,
      },
      userId: Number(userId),
    },
  });

  return {
    productReviews: productReviews,
    hasUserPostedReview: !!userHasReview,
  };
});
