export const useProduct = async (slug: string) => {
  const { data, error, status, clear, execute, refresh, pending } =
    await useFetch(`/api/product/${slug}`);

  return {
    data,

    product: data,
    error,
    status,
    execute,
    clear,
    refresh,
    pending,
  };
};
