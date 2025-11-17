<script setup lang="ts">
// https://ui.nuxt.com/docs/components/dashboard-sidebar
import type {
  CommandPaletteGroup,
  CommandPaletteItem,
  NavigationMenuItem,
} from '@nuxt/ui';

const { user } = useAuthentication();

const items: NavigationMenuItem[][] = [
  [
    {
      label: 'Inicio',
      icon: 'i-lucide-house',
      to: '/dashboard',
      exact: true,
    },
    {
      label: 'Productos',
      icon: 'i-lucide-inbox',
      badge: '4',
      to: '/dashboard/products',
      exact: false,
    },
    {
      label: 'Contacts',
      icon: 'i-lucide-users',
    },
    {
      label: 'Settings',
      icon: 'i-lucide-settings',
      defaultOpen: true,
      children: [
        {
          label: 'General',
        },
        {
          label: 'Members',
        },
        {
          label: 'Notifications',
        },
      ],
    },
  ],
  [
    {
      label: 'Feedback',
      icon: 'i-lucide-message-circle',
      to: 'https://github.com/nuxt-ui-templates/dashboard',
      target: '_blank',
    },
    {
      label: 'Help & Support',
      icon: 'i-lucide-info',
      to: 'https://github.com/nuxt/ui',
      target: '_blank',
    },
  ],
];
const searchGroups = ref<CommandPaletteGroup<CommandPaletteItem>[]>([
  {
    label: 'Productos',
    id: 'products',
    highlightedIcon: 'i-lucide-box',
    items: [
      {
        label: 'Nuevo Producto',
        id: 'new-product',
        icon: 'i-lucide-plus',
        to: '/dashboard/products/new',
      },
    ],
  },
]);
</script>

<template>
  <UDashboardSidebar
    collapsible
    resizable
    :ui="{ footer: 'border-t border-default' }"
  >
    <template #header="{ collapsed }" class="flex items-center gap-2">
      <NuxtLink to="/" class="flex flex-row items-center justify-center">
        <UDashboardSidebarCollapse variant="subtle" class="mr-2" />

        <IconsNuxtui class="h-6 w-auto" v-if="!collapsed" />
      </NuxtLink>
    </template>

    <template #default="{ collapsed }">
      <UDashboardSearchButton />
      <UDashboardSearch title="Buscar" :groups="searchGroups" />
      <!-- <UButton
        :label="collapsed ? undefined : 'Search...'"
        icon="i-lucide-search"
        color="neutral"
        variant="outline"
        block
        :square="collapsed"
      >
        <template v-if="!collapsed" #trailing>
          <div class="flex items-center gap-0.5 ms-auto">
            <UKbd value="meta" variant="subtle" />
            <UKbd value="K" variant="subtle" />
          </div>
        </template>
      </UButton> -->

      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[0]"
        orientation="vertical"
      />

      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[1]"
        orientation="vertical"
        class="mt-auto"
      />

      <div class="">
        <UDashboardSidebarCollapse
          color="neutral"
          variant="ghost"
          square
          class="w-full"
          :title="collapsed ? 'Expandir' : 'Contraer'"
        />
      </div>
    </template>

    <template #footer="{ collapsed }">
      <UButton
        :avatar="{
          src: 'https://github.com/benjamincanac.png',
        }"
        :label="collapsed ? undefined : user?.name"
        color="neutral"
        variant="ghost"
        class="w-full"
        :block="collapsed"
      />
    </template>
  </UDashboardSidebar>
</template>
