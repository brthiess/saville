<script setup lang="ts">
import { computed } from 'vue'

import { useAppStore } from '../stores/app'

const appStore = useAppStore()
const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="bg-[#002114] text-white">
    <div class="mx-auto max-w-screen-2xl px-6 pb-10 pt-20 lg:px-10">
      <div class="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div class="col-span-1 lg:col-span-1">
          <div class="mb-6 font-headline text-2xl font-black uppercase tracking-tighter text-white">
            {{ appStore.clubName }}
          </div>
          <p class="mb-8 text-sm leading-relaxed text-white/60">
            University of Alberta Athletics dedicated facility. Excellence in curling training and
            community play since 2004.
          </p>
          <div class="flex gap-4">
            <span class="material-symbols-outlined cursor-pointer text-secondary hover:text-white">public</span>
            <span class="material-symbols-outlined cursor-pointer text-secondary hover:text-white"
              >social_leaderboard</span
            >
            <span class="material-symbols-outlined cursor-pointer text-secondary hover:text-white"
              >alternate_email</span
            >
          </div>
        </div>

        <div>
          <h4 class="mb-6 text-xs font-bold uppercase tracking-widest text-secondary">Quick Links</h4>
          <ul class="space-y-4 text-sm text-white/70">
            <li><a class="transition-colors hover:text-white" href="#">League Standings</a></li>
            <li><a class="transition-colors hover:text-white" href="#">Find a Spare</a></li>
            <li><a class="transition-colors hover:text-white" href="#">Facility Rentals</a></li>
            <li><a class="transition-colors hover:text-white" href="#">U of A Affiliation</a></li>
          </ul>
        </div>

        <div>
          <h4 class="mb-6 text-xs font-bold uppercase tracking-widest text-secondary">
            Contact Details
          </h4>
          <div class="space-y-4 text-sm text-white/70">
            <p class="flex items-start gap-3">
              <span class="material-symbols-outlined text-lg text-secondary">location_on</span>
              11610 65 Ave NW, Edmonton, AB T6G 2E1
            </p>
            <p class="flex items-center gap-3">
              <span class="material-symbols-outlined text-lg text-secondary">call</span>
              <a class="transition-colors hover:text-white" href="tel:+17804921000">(780) 492-1000</a>
            </p>
            <p class="flex items-center gap-3">
              <span class="material-symbols-outlined text-lg text-secondary">mail</span>
              <a :href="`mailto:${appStore.contactEmail}`" class="transition-colors hover:text-white">
                {{ appStore.contactEmail }}
              </a>
            </p>
          </div>
        </div>

        <div>
          <h4 class="mb-6 text-xs font-bold uppercase tracking-widest text-secondary">Affiliation</h4>
          <div class="flex items-center gap-4">
            <div
              class="flex h-16 w-32 items-center justify-center rounded bg-white p-2 grayscale brightness-200"
            >
              <div class="text-center text-[10px] font-black leading-none text-primary">
                UNIVERSITY OF ALBERTA<br /><span class="text-lg">ATHLETICS</span>
              </div>
            </div>
          </div>
          <p class="mt-4 text-xs text-white/50">
            Part of the University of Alberta Athletics Department.
          </p>
        </div>
      </div>

      <div class="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 md:flex-row">
        <p class="text-xs text-white/40">© {{ year }} {{ appStore.clubName }}. All Rights Reserved.</p>
        <div class="flex gap-8 text-xs font-bold uppercase tracking-widest text-secondary">
          <a class="hover:text-white" href="#">Privacy Policy</a>
          <a class="hover:text-white" href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>
