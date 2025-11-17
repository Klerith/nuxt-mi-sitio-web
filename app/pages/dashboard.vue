<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout',
  middleware: ['auth'],
});
</script>

<template>
  <div>
    <!-- <h3>Hola Mundo - dashboard Page</h3> -->
    <NuxtPage />
  </div>
</template>
