export const usePaginatedProducts = async () => {
  const route = useRoute();

  const page = computed(() => {
    const pageParam = route.query.page as string;
    return isNaN(+pageParam) ? 1 : +pageParam;
  });

  const limit = computed(() => {
    const limitParam = route.query.limit as string;
    return isNaN(+limitParam) ? 10 : +limitParam;
  });

  const offset = computed(() => {
    return (page.value - 1) * limit.value;
  });

  const { data, error, status, execute, pending } = await useFetch(
    '/api/products',
    {
      query: {
        limit,
        offset,
      },

      watch: [page, limit],
    }
  );

  return {
    data, // Reactiva

    products: computed(() => data.value?.products || []),
    totalPages: computed(() => data.value?.totalPages || 0),
    currentPage: computed(() => data.value?.currentPage || 1),
    perPage: computed(() => data.value?.perPage || 10),
    total: computed(() => data.value?.total || 0),

    // Actions
    error,
    status,
    execute,
    pending,
  };
};
