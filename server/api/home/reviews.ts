import prisma from '~~/lib/prisma';

export default defineEventHandler(async (event) => {
  const reviews = await prisma.siteReview.findMany({
    take: 10,
    orderBy: {
      id: 'desc',
    },
    select: {
      name: true,
      subtitle: true,
      description: true,
      profileImage: true,
    },
  });

  return reviews;
});
