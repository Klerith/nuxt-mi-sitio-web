<script setup lang="ts">
defineProps<{
  product: Product;
}>();
</script>

<template>
  <UCard class="w-full" :ui="{ body: 'px-20' }">
    <img
      :src="product.images[0]"
      alt="Product Image"
      class="w-full h-52 object-cover rounded-md"
    />

    <div class="mt-4">
      <h3 class="text-lg font-bold">{{ product.name }}</h3>
      <p class="text-sm text-gray-500">{{ product.description }}</p>
    </div>

    <template #footer>
      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">{{ formatCurrency(product.price) }}</p>
        <UButton
          :to="`/product/${product.slug}`"
          color="primary"
          variant="ghost"
          label="Saber más"
        />
      </div>
    </template>
  </UCard>
</template>
