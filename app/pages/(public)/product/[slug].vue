<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;
// Simulación de productos - en producción esto vendría de una API

const { product } = await useProduct(slug);

useSeoMeta({
  title: () => product.value?.name || 'Producto',
  description: () => product.value?.description || '',
  ogTitle: () => product.value?.name || 'Producto',
  ogDescription: () => product.value?.description || 'Producto',
  ogImage: () => product.value?.images?.[0] || '',
});

// Si no se encuentra el producto, mostrar error 404
if (!product.value) {
  navigateTo('/404');
  // throw createError({
  //   statusCode: 404,
  //   statusMessage: 'Producto no encontrado',
  // });
}
// Estado para la imagen seleccionada
const selectedImageIndex = ref(0);
// Estado para cantidad
const quantity = ref(1);
const increaseQuantity = () => {
  quantity.value++;
};
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};
const totalPrice = computed(() => {
  return (product.value?.price || 0) * quantity.value;
});
</script>

<template>
  <div v-if="product" class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <UBreadcrumb
      class="mb-8"
      :items="[
        { label: 'Productos', to: '/products' },
        { label: product.name, to: `/product/${product.slug}` },
      ]"
    />

    <!-- Product Detail -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Images Section -->
      <div class="space-y-4">
        <!-- Main Image -->
        <div class="rounded-lg overflow-hidden bg-gray-100">
          <img
            :src="product.images[selectedImageIndex]"
            :alt="product.name"
            class="w-full h-96 object-cover"
            loading="lazy"
          />
        </div>

        <!-- Thumbnail Images -->
        <div class="grid grid-cols-3 gap-4">
          <button
            v-for="(image, index) in product.images"
            :key="index"
            @click="selectedImageIndex = index"
            class="rounded-lg overflow-hidden border-2 transition-all cursor-pointer"
            :class="
              selectedImageIndex === index
                ? 'border-primary-500'
                : 'border-gray-200 hover:border-gray-300'
            "
          >
            <img
              :src="image"
              :alt="`${product.name} - Image ${index + 1}`"
              class="w-full h-24 object-cover"
            />
          </button>
        </div>
      </div>

      <!-- Product Info Section -->
      <div class="space-y-6">
        <!-- Title and Price -->
        <div>
          <h1 class="text-3xl font-bold mb-2 capitalize">
            {{ product.name }}
          </h1>
          <p class="text-2xl font-bold text-primary-600">
            {{ formatCurrency(product.price) }}
          </p>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="tag in product.tags"
            :key="tag"
            color="primary"
            variant="subtle"
            class="capitalize"
          >
            {{ tag }}
          </UBadge>
        </div>

        <!-- Description -->
        <div>
          <h2 class="text-lg font-semibold mb-2">Descripción</h2>
          <p class="leading-relaxed">
            {{ product.description }}
          </p>
        </div>

        <USeparator />

        <!-- Quantity Selector -->
        <div>
          <h3 class="text-sm font-medium text-gray-900 mb-3">Cantidad</h3>
          <div class="flex items-center space-x-4">
            <div class="flex items-center border border-gray-300 rounded-lg">
              <UButton
                icon="i-lucide-minus"
                color="neutral"
                variant="ghost"
                @click="decreaseQuantity"
                :disabled="quantity <= 1"
              />
              <span class="px-4 py-2 font-semibold">{{ quantity }}</span>
              <UButton
                icon="i-lucide-plus"
                color="neutral"
                variant="ghost"
                @click="increaseQuantity"
              />
            </div>
            <p class="text-sm text-gray-500">
              Total: {{ formatCurrency(totalPrice) }}
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <UButton
            color="primary"
            size="xl"
            block
            icon="i-lucide-shopping-cart"
            label="Agregar al carrito"
          />
          <UButton
            color="neutral"
            size="xl"
            block
            variant="outline"
            icon="i-lucide-heart"
            label="Agregar a favoritos"
          />
        </div>
      </div>
    </div>

    <!-- <USeparator class="h-[3000px]" /> -->
    <USeparator class="my-10" icon="i-lucide-box" />

    <!-- Reviews -->
    <LazyProductReviews hydrate-on-visible :slug="slug" />

    <!-- Related Products Section (optional) -->
    <div v-if="product" class="mt-16">
      <h2 class="text-2xl font-bold text-gray-500 mb-6">
        Productos relacionados
      </h2>

      <!-- <LazyProductsGrid
        hydrate-on-visible
        :products="productSuggestions || []"
      /> -->
      <LazyProductSuggestions hydrate-on-visible :slug="slug" />
    </div>
  </div>
</template>

<style scoped></style>
