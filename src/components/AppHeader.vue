<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

import { NAV_ITEMS } from '../config/constants'
import { useAppStore } from '../stores/app'

const appStore = useAppStore()
const route = useRoute()

function isActive(path: string): boolean {
  return route.path === path
}
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink to="/" class="brand">
        <span class="brand-mark" aria-hidden="true">●</span>
        <span>{{ appStore.clubName }}</span>
      </RouterLink>

      <nav aria-label="Main navigation" class="main-nav">
        <RouterLink
          v-for="item in NAV_ITEMS"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :class="{ active: isActive(item.to) }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  background: var(--color-green-700);
  color: var(--color-white);
}

.header-inner {
  min-height: 4.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 1.1rem;
  font-weight: 700;
}

.brand-mark {
  color: var(--color-gold-500);
  font-size: 0.9rem;
}

.main-nav {
  display: inline-flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.nav-link {
  padding: 0.45rem 0.72rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background 0.15s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.18);
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.24);
  color: var(--color-gold-500);
}
</style>
