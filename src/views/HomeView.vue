<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { getAnnouncements } from '../api/announcements'
import { getLeagues } from '../api/leagues'
import AnnouncementCard from '../components/AnnouncementCard.vue'
import LeagueCard from '../components/LeagueCard.vue'
import { useAppStore } from '../stores/app'
import type { Announcement, League } from '../types'

const appStore = useAppStore()

const announcements = ref<Announcement[]>([])
const featuredLeagues = ref<League[]>([])
const isLoading = ref(true)
const errorMessage = ref<string | null>(null)

async function loadHomeData() {
  isLoading.value = true
  errorMessage.value = null

  try {
    const [announcementData, leagueData] = await Promise.all([
      getAnnouncements(3),
      getLeagues(3),
    ])

    announcements.value = announcementData
    featuredLeagues.value = leagueData
  } catch {
    errorMessage.value =
      'We are having trouble reaching the club content service right now. Please try again shortly.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  void loadHomeData()
})
</script>

<template>
  <section class="hero">
    <div class="container hero-inner">
      <h1>{{ appStore.clubName }}</h1>
      <p>{{ appStore.tagline }}</p>
      <RouterLink to="/leagues" class="button-secondary hero-button">Explore Leagues</RouterLink>
    </div>
  </section>

  <section class="page-section">
    <div class="container">
      <h2 class="section-title">Announcements</h2>

      <p v-if="isLoading" class="status-message loading">Loading announcements and featured leagues…</p>
      <p v-else-if="errorMessage" class="status-message error">{{ errorMessage }}</p>

      <div v-else class="grid announcements-grid">
        <AnnouncementCard
          v-for="announcement in announcements"
          :key="announcement.id"
          :announcement="announcement"
        />

        <p v-if="announcements.length === 0" class="surface">No announcements are available yet.</p>
      </div>
    </div>
  </section>

  <section class="page-section featured-leagues">
    <div class="container">
      <h2 class="section-title">Featured Leagues</h2>
      <p class="section-subtitle">A quick look at upcoming options for curlers of all levels.</p>

      <p v-if="isLoading" class="status-message loading">Loading featured leagues…</p>
      <p v-else-if="errorMessage" class="status-message error">{{ errorMessage }}</p>

      <div v-else class="grid leagues-grid">
        <LeagueCard v-for="league in featuredLeagues" :key="league.id" :league="league" />

        <p v-if="featuredLeagues.length === 0" class="surface">No leagues are featured yet.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--color-green-700), var(--color-green-600));
  color: var(--color-white);
}

.hero-inner {
  padding: 3.25rem 0;
}

.hero h1 {
  margin: 0;
  font-size: clamp(1.7rem, 4vw, 2.5rem);
}

.hero p {
  margin: 0.7rem 0 1.25rem;
  max-width: 48ch;
  line-height: 1.5;
}

.hero-button {
  display: inline-flex;
  border-color: var(--color-gold-500);
  color: var(--color-gold-500);
}

.announcements-grid,
.leagues-grid {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.featured-leagues {
  background: var(--color-gray-100);
  border-top: 1px solid var(--color-gray-300);
  border-bottom: 1px solid var(--color-gray-300);
}
</style>
