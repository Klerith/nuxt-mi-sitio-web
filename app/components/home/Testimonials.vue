<script setup lang="ts">
const { data: testimonials } = await useFetch('/api/home/reviews');
</script>

<template>
  <div>
    <UPageSection
      title="Testimonios"
      description="Nuestros testimonios de clientes satisfechos"
      headline="Testimonios"
    />

    <UPageColumns>
      <UPageCard
        variant="solid"
        to="https://cloudflare.com"
        icon="i-logos-cloudflare-icon"
        title="Cloudflare's Workers LaunchPad"
        description="NuxtHub is part of the Cloudflare's Workers Launchpad Cohort to make sure you get a first-class experience on top of Cloudflare's network."
        :ui="{ leadingIcon: 'size-10' }"
      />

      <UPageCard
        v-for="(testimonial, index) in testimonials"
        :key="index"
        variant="subtle"
        :description="testimonial.description"
        :ui="{
          description:
            'before:content-[open-quote] after:content-[close-quote]',
        }"
      >
        <template #footer>
          <UUser
            :name="testimonial.name"
            :description="testimonial.subtitle"
            :avatar="{
              src: testimonial.profileImage,
              alt: `${testimonial.name}'s profile image`,
            }"
            size="xl"
          />
        </template>
      </UPageCard>
    </UPageColumns>
  </div>
</template>
