<script setup lang="ts">
import { computed } from 'vue'

import { formatCurrency, formatTime } from '../config/constants'
import type { League } from '../types'

const props = defineProps<{ league: League }>()

const formattedPrice = computed(() => formatCurrency(props.league.price))
const formattedTime = computed(() => formatTime(props.league.start_time))
</script>

<template>
  <article class="league-card surface">
    <div class="league-card-head">
      <h3 class="league-title">{{ league.name }}</h3>
      <span :class="['league-status', league.registration_open ? 'open' : 'closed']">
        {{ league.registration_open ? 'Registration Open' : 'Registration Closed' }}
      </span>
    </div>

    <p class="league-description">{{ league.description }}</p>

    <dl class="league-meta">
      <div>
        <dt>Day</dt>
        <dd>{{ league.day_of_week }}</dd>
      </div>
      <div>
        <dt>Start Time</dt>
        <dd>{{ formattedTime }}</dd>
      </div>
      <div>
        <dt>Skill Level</dt>
        <dd>{{ league.skill_level }}</dd>
      </div>
      <div>
        <dt>Price</dt>
        <dd>{{ formattedPrice }}</dd>
      </div>
    </dl>

    <button class="button-primary register-button" type="button">Register</button>
  </article>
</template>

<style scoped>
.league-card {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  height: 100%;
}

.league-card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}

.league-title {
  margin: 0;
  color: var(--color-green-700);
  font-size: 1.15rem;
}

.league-status {
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.28rem 0.6rem;
  white-space: nowrap;
}

.league-status.open {
  color: var(--color-green-700);
  background: rgba(47, 125, 80, 0.15);
}

.league-status.closed {
  color: var(--color-gold-600);
  background: rgba(185, 132, 31, 0.18);
}

.league-description {
  margin: 0;
  color: var(--color-gray-900);
  line-height: 1.45;
}

.league-meta {
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
}

.league-meta div {
  min-width: 0;
}

.league-meta dt {
  margin: 0;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--color-gray-700);
}

.league-meta dd {
  margin: 0.1rem 0 0;
  font-weight: 600;
}

.register-button {
  margin-top: auto;
  width: fit-content;
}

@media (max-width: 560px) {
  .league-meta {
    grid-template-columns: 1fr;
  }
}
</style>
