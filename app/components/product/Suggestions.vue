<script setup lang="ts">
const props = defineProps<{
  slug: string;
}>();

const { data: productSuggestions, status } = useFetch(
  `/api/product/${props.slug}/suggestions`,
  {
    lazy: true,
    server: false,
    cache: 'force-cache',
  }
);
</script>
<template>
  <ClientOnly>
    <div
      v-if="status === 'pending'"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <USkeleton class="w-full h-52 rounded-md mb-4" />
      <USkeleton class="w-full h-52 rounded-md mb-4" />
      <USkeleton class="w-full h-52 rounded-md mb-4" />
    </div>

    <ProductsGrid v-else :products="productSuggestions || []" class="fade-in" />
  </ClientOnly>
</template>
