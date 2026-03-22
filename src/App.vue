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
  padding-top: 69px;
}

.app-main {
  flex: 1;
}
</style>
