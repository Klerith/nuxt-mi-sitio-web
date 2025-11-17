<script setup lang="ts">
const props = defineProps<{
  slug: string;
}>();

const { isLoggedIn, user } = useAuthentication();

const { data, status, refresh } = useFetch(
  `/api/product/${props.slug}/reviews`,
  {
    server: false,
    lazy: true,
  }
);

const hasUserPostedReview = computed(() => {
  return data.value?.hasUserPostedReview || false;
});

const handleReviewPosted = async () => {
  console.log('handleReviewPosted');
  await refresh();
};
</script>

<template>
  <ClientOnly>
    <UCard class="mb-8" icon="i-lucide-star">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-star" class="text-primary-500 text-2xl" />
          <div>
            <h2 class="text-xl font-semibold">Reseñas</h2>
            <p class="text-gray-600 text-sm">
              Nuestras reseñas de clientes satisfechos.
            </p>
          </div>
        </div>
        <!-- <UButton
        color="primary"
        icon="i-lucide-plus-circle"
        size="md"
        class="ml-4"
        label="Añadir reseña"
      /> -->
        <ModalReview
          v-if="isLoggedIn && !hasUserPostedReview"
          :slug="slug"
          :user="user"
          @review-posted="handleReviewPosted"
          button-label="Añadir reseña"
        />
      </div>
    </UCard>

    <div
      v-if="status === 'pending'"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <USkeleton class="w-full h-48 rounded-md mb-4" />
      <USkeleton class="w-full h-48 rounded-md mb-4" />
      <USkeleton class="w-full h-48 rounded-md mb-4" />
    </div>

    <UPageColumns v-else-if="data?.productReviews">
      <UPageCard
        v-for="(review, index) in data.productReviews"
        class="fade-in"
        :key="index"
        variant="subtle"
        :description="review.review"
        :ui="{
          description:
            'before:content-[open-quote] after:content-[close-quote]',
        }"
      >
        <template #footer>
          <div class="flex items-center gap-2 mb-2">
            <UIcon
              name="i-lucide-star"
              class="text-primary-500 text-xl"
              v-for="star in review.rating"
              :key="star"
            />
          </div>
          <UUser
            :avatar="{
              alt: review.name,
              name: review.name,
            }"
            :name="review.name"
            :description="review.userTitle"
            size="xl"
          />
        </template>
      </UPageCard>
    </UPageColumns>
  </ClientOnly>
</template>
