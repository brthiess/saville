<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getLeagues } from '../api/leagues'
import LeagueCard from '../components/LeagueCard.vue'
import type { League } from '../types'

const leagues = ref<League[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

async function loadLeagues() {
  isLoading.value = true
  errorMessage.value = null

  try {
    leagues.value = await getLeagues()
  } catch {
    errorMessage.value =
      'Unable to reach Directus right now. Please check your connection and try again.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  void loadLeagues()
})
</script>

<template>
  <section class="page-section">
    <div class="container">
      <h1 class="section-title">Leagues</h1>
      <p class="section-subtitle">Browse all current Saville Curling Centre league options.</p>

      <p v-if="isLoading" class="status-message loading">Loading leagues from Directus…</p>
      <p v-else-if="errorMessage" class="status-message error">{{ errorMessage }}</p>

      <div v-else class="grid leagues-grid">
        <LeagueCard v-for="league in leagues" :key="league.id" :league="league" />

        <p v-if="leagues.length === 0" class="surface">No leagues were returned by Directus.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.leagues-grid {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}
</style>
