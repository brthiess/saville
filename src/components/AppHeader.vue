<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { useAppStore } from '../stores/app'

const appStore = useAppStore()
</script>

<template>
  <nav class="fixed top-0 z-50 w-full border-b border-surface-container bg-white/80 backdrop-blur-md">
    <div class="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-6 py-4 lg:px-10">
      <RouterLink
        to="/"
        class="font-headline text-xl font-black uppercase tracking-tighter text-primary lg:text-2xl"
      >
        {{ appStore.clubName }}
      </RouterLink>

      <div class="hidden items-center gap-6 md:flex" aria-label="Main navigation">
        <RouterLink
          to="/leagues"
          class="font-label text-sm font-semibold text-on-surface transition-colors hover:text-primary"
          >Leagues</RouterLink
        >
        <a
          class="font-label text-sm font-semibold text-on-surface transition-colors hover:text-primary"
          href="#"
          >Rentals</a
        >
        <a
          class="font-label text-sm font-semibold text-on-surface transition-colors hover:text-primary"
          href="#"
          >Programs</a
        >
        <a
          class="font-label text-sm font-semibold text-on-surface transition-colors hover:text-primary"
          href="#"
          >Calendar</a
        >
      </div>

      <div class="flex items-center gap-4">
        <RouterLink
          to="/member-login"
          class="font-label text-sm font-bold text-primary hover:underline"
          >Member Login</RouterLink
        >
        <RouterLink
          to="/create-account"
          class="font-label rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white transition-all hover:bg-opacity-90"
          >Register Now</RouterLink
        >
      </div>
    </div>
  </nav>
</template>
