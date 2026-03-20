<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import { useAppStore } from './stores/app'

const appStore = useAppStore()

onMounted(() => {
  void Promise.all([appStore.loadSiteSettings(), appStore.initializeMemberSession()])
})
</script>

<template>
  <div class="app-layout">
    <AppHeader />

    <p v-if="appStore.settingsError" class="global-notice">
      We could not load club settings from Directus. Showing fallback details for now.
    </p>

    <main class="app-main">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
}

.app-main {
  flex: 1;
}

.global-notice {
  margin: 0;
  padding: 0.75rem 1rem;
  background: rgba(214, 165, 58, 0.18);
  border-bottom: 1px solid rgba(185, 132, 31, 0.3);
  color: var(--color-gray-900);
  text-align: center;
  font-size: 0.92rem;
}
</style>
