<script setup lang="ts">
import { computed } from 'vue'

import { formatDate } from '../config/constants'
import type { Announcement } from '../types'

const props = defineProps<{ announcement: Announcement }>()

const formattedDate = computed(() => formatDate(props.announcement.date_posted))
</script>

<template>
  <article class="announcement-card surface">
    <p class="announcement-date">{{ formattedDate }}</p>
    <h3 class="announcement-title">{{ announcement.title }}</h3>
    <p class="announcement-summary">{{ announcement.summary }}</p>
  </article>
</template>

<style scoped>
.announcement-card {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  height: 100%;
}

.announcement-date {
  margin: 0;
  color: var(--color-gray-700);
  font-size: 0.9rem;
}

.announcement-title {
  margin: 0;
  color: var(--color-green-700);
  font-size: 1.12rem;
}

.announcement-summary {
  margin: 0;
  color: var(--color-gray-900);
  line-height: 1.45;
}
</style>
