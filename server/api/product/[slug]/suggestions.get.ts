import prisma from '~~/lib/prisma';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  const product = await prisma.product.findUnique({
    where: {
      slug: slug,
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 2500));

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: `Product with slug ${slug} not found`,
      data: {
        slug,
        state: process.env.STAGE,
      },

      stack: process.env.STAGE !== 'prod' ? new Error().stack : '',
    });
  }

  const suggestions = await prisma.product.findMany({
    where: {
      tags: {
        hasSome: product.tags,
      },
      NOT: {
        id: product.id,
      },
    },
    take: 3,
  });

  return suggestions;
});
