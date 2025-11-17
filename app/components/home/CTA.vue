<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const { data } = await useFetch('/api/hello-world');

const links = ref<ButtonProps[]>([
  {
    label: 'Empezando',
    color: 'neutral',
  },
  {
    label: 'Más información',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right',
  },
]);
</script>

<template>
  <UPageCTA
    :title="data?.message"
    :description="data?.description"
    orientation="horizontal"
    :links="links"
  >
    <img
      src="https://picsum.photos/640/728"
      width="320"
      height="364"
      alt="Illustration"
      class="w-full rounded-lg"
    />

    <!-- <template #body>
      <h1>Hola</h1>
    </template> -->
  </UPageCTA>
</template>
