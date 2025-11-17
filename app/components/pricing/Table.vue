<!-- PricingTable -->

<script setup lang="ts">
const tiers = [
  {
    id: 'solo',
    title: 'Solo',
    price: '$249',
    description: 'Para autónomos.',
    billingCycle: '/mes',
    button: { label: 'Comprar ahora', variant: 'subtle' as const },
  },
  {
    id: 'team',
    title: 'Equipo',
    price: '$499',
    description: 'Para equipos en crecimiento.',
    billingCycle: '/mes',
    button: { label: 'Comprar ahora' },
    highlight: true,
  },
  {
    id: 'enterprise',
    title: 'Empresarial',
    price: 'Personalizado',
    description: 'Para grandes organizaciones.',
    button: { label: 'Contactar ventas', color: 'neutral' as const },
  },
];
const sections = [
  {
    id: 'features',
    title: 'Características',
    features: [
      {
        id: 'developers',
        title: 'Cantidad de desarrolladores',
        tiers: { solo: '1', team: '5', enterprise: 'Ilimitado' },
      },
      {
        id: 'projects',
        title: 'Proyectos',
        tiers: { solo: true, team: true, enterprise: true },
      },
    ],
  },
  {
    id: 'security',
    title: 'Seguridad',
    features: [
      {
        title: 'SSO',
        tiers: { solo: false, team: true, enterprise: true },
      },
    ],
  },
];
const plans = ref([
  {
    title: 'Individual',
    description: 'Pensado para desarrolladores independientes.',
    price: '$249',
    features: ['Un desarrollador', 'Acceso de por vida'],
    button: {
      label: 'Comprar ahora',
    },
  },
  {
    title: 'Equipo',
    description: 'Ideal para pequeños equipos.',
    price: '$499',
    features: ['Hasta 5 desarrolladores', 'Todo en Individual'],
    button: {
      label: 'Comprar ahora',
    },
  },
  {
    title: 'Organización',
    description: 'Perfecto para equipos y organizaciones más grandes.',
    price: '$999',
    features: ['Hasta 20 desarrolladores', 'Todo en Equipo'],
    button: {
      label: 'Comprar ahora',
    },
  },
]);
</script>

<template>
  <UPricingTable :tiers="tiers" :sections="sections">
    <!-- Personalizar el título de un nivel específico -->
    <template #team-title="{ tier }">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-crown" class="size-4 text-amber-500" />
        {{ tier.title }}
      </div>
    </template>

    <!-- Personalizar el título de una sección específica -->
    <template #section-security-title="{ section }">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-shield-check" class="size-4 text-green-500" />
        <span class="font-semibold text-green-700">{{ section.title }}</span>
      </div>
    </template>

    <!-- Personalizar el valor de una característica específica -->
    <template #feature-developers-value="{ feature, tier }">
      <template v-if="feature.tiers?.[tier.id]">
        <UBadge
          :label="String(feature.tiers[tier.id])"
          color="primary"
          variant="soft"
        />
      </template>
      <UIcon v-else name="i-lucide-x" class="size-4 text-muted" />
    </template>
  </UPricingTable>

  <UPageSection
    headline="Precios"
    title="Precios"
    description="Descubre nuestros precios y planes."
  />

  <UPricingPlans orientation="vertical" :plans="plans" />
</template>
