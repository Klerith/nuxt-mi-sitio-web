export const useAdminProduct = async (id: string) => {
  const { data, error, status, execute, refresh, pending } = await useFetch(
    `/api/admin/product/${id}`
  );

  const createOrUpdate = async (data: Partial<Product>, files?: File[]) => {
    const isCreating = data.id === 0;
    const formData = new FormData();

    formData.append('data', JSON.stringify(data));

    // Si hay archivos cárgalos
    if (files) {
      files.forEach((file) => {
        formData.append('files', file); // files: [file1, file2, file3]
      });
    }

    if (isCreating) {
      // TODO: crear endpoint
      const { product } = await $fetch('/api/admin/product', {
        method: 'POST',
        body: data,
      });

      return product;
    }

    if (!isCreating) {
      try {
        const { product } = await $fetch(`/api/admin/product/${id}`, {
          method: 'PATCH',
          body: formData,
        });

        return product;
      } catch (error) {
        throw createError({
          status: 400,
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    throw createError({
      status: 501,
      message: 'Product creation is not implemented yet',
    });
  };

  return {
    data,
    error,
    status,
    execute,
    pending,

    // Methods
    createOrUpdate,
    refresh,
  };
};
