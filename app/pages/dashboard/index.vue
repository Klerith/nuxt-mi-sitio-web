<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Bienvenido a tu Dashboard
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        Aquí puedes ver un resumen de tu panel administrativo
      </p>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Products
            </span>
            <UIcon name="i-lucide-package" class="w-5 h-5 text-blue-500" />
          </div>
        </template>

        <div class="flex items-baseline gap-2">
          <span class="text-2xl font-bold text-gray-900 dark:text-white">
            127
          </span>
          <span class="text-xs text-green-600 dark:text-green-400">
            +12 this week
          </span>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Active Orders
            </span>
            <UIcon
              name="i-lucide-shopping-cart"
              class="w-5 h-5 text-green-500"
            />
          </div>
        </template>

        <div class="flex items-baseline gap-2">
          <span class="text-2xl font-bold text-gray-900 dark:text-white">
            24
          </span>
          <span class="text-xs text-green-600 dark:text-green-400">
            +8 new
          </span>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Revenue
            </span>
            <UIcon
              name="i-lucide-dollar-sign"
              class="w-5 h-5 text-purple-500"
            />
          </div>
        </template>

        <div class="flex items-baseline gap-2">
          <span class="text-2xl font-bold text-gray-900 dark:text-white">
            $12,456
          </span>
          <span class="text-xs text-green-600 dark:text-green-400">
            +15% from last month
          </span>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Users
            </span>
            <UIcon name="i-lucide-users" class="w-5 h-5 text-orange-500" />
          </div>
        </template>

        <div class="flex items-baseline gap-2">
          <span class="text-2xl font-bold text-gray-900 dark:text-white">
            1,234
          </span>
          <span class="text-xs text-green-600 dark:text-green-400">
            +45 new users
          </span>
        </div>
      </UCard>
    </div>

    <!-- Recent Activities Section -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Recent Activities</h2>
          <UButton variant="ghost" color="neutral" label="View all" />
        </div>
      </template>

      <div class="space-y-4">
        <div
          v-for="index in 3"
          :key="index"
          class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
        >
          <div class="flex items-center gap-3">
            <UAvatar
              :alt="`User ${index}`"
              size="md"
              :src="`https://github.com/user${index}.png`"
            />
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                User activity {{ index }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ index }} hours ago
              </p>
            </div>
          </div>
          <UBadge variant="subtle">Active</UBadge>
        </div>
      </div>
    </UCard>
  </div>
</template>
