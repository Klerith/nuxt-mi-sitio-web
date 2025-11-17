<template>
  <UPageCTA
    orientation="horizontal"
    title="Información de precios"
    description="Descubre nuestros precios y planes."
  >
    <template #default>
      <div class="flex items-center justify-center">
        <UIcon name="i-simple-icons-nuxtdotjs" :size="150" />
      </div>
    </template>
  </UPageCTA>

  <div class="mt-10" />

  <PricingTable />
</template>
