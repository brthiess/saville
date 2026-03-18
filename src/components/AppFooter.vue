<script setup lang="ts">
import { computed } from 'vue'

import { useAppStore } from '../stores/app'

const appStore = useAppStore()
const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <p class="footer-copy">© {{ year }} {{ appStore.clubName }}</p>
      <a :href="`mailto:${appStore.contactEmail}`" class="footer-link">
        {{ appStore.contactEmail }}
      </a>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 2rem;
  background: var(--color-gray-100);
  border-top: 1px solid var(--color-gray-300);
}

.footer-inner {
  min-height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.footer-copy {
  margin: 0;
  color: var(--color-gray-700);
}

.footer-link {
  color: var(--color-green-700);
  font-weight: 600;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
