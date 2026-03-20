<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <section class="relative flex h-[600px] w-full items-center overflow-hidden bg-primary lg:h-[750px]">
      <div class="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR9HXgoh2X0uu_hEk6tXsgjeeEoXs_rSM7BAXOKtSOUqm0-g7rHMB1vriOYZN9J80ZwNMUQ93CDBlYcu0RmRjq81hGJL3kgiLsv-8CrY6FUCab8Ojjf85NY95e_yD6my_F4nfqa3FBNlAm0GgDmFhkOca8J5UzpPzjZXZ5bWFD_BM5UXPFWvzi2Zsb0AM_oOqOt4lNWTtWZ_SgzgFOnH-J73ySHnAWUyBKB8c2nDZaysjh_zCl7u_RAkD9e3ww8EJesB2GNthyv9Uh"
          alt="Saville Curling Ice Sheets"
          class="h-full w-full object-cover opacity-50"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent"></div>
      </div>

      <div class="relative z-10 mx-auto w-full max-w-screen-2xl px-6 lg:px-10">
        <div class="max-w-2xl">
          <h1 class="mb-6 font-headline text-5xl font-bold leading-tight text-white lg:text-7xl">
            Find Your Perfect <span class="text-secondary">League</span>
          </h1>
          <p class="mb-10 text-lg font-medium leading-relaxed text-white/90 lg:text-xl">
            Programs for all skill levels — from beginner to competitive. Join Western Canada's
            premier curling destination.
          </p>
          <div class="flex flex-wrap gap-4">
            <RouterLink
              to="/create-account"
              class="font-label rounded-lg bg-secondary px-8 py-4 text-lg font-bold text-primary transition-all hover:shadow-xl"
            >
              Register Now
            </RouterLink>
            <RouterLink
              to="/leagues"
              class="font-label rounded-lg border border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              Explore Leagues
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="border-b border-surface-container bg-white py-12">
      <div class="mx-auto max-w-screen-2xl px-6 lg:px-10">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <RouterLink
            to="/create-account"
            class="group flex items-center justify-between rounded-xl bg-primary p-6 text-white transition-all hover:bg-opacity-95"
          >
            <div class="text-left">
              <p class="mb-1 text-xs font-bold uppercase tracking-widest text-secondary">Registration</p>
              <h3 class="font-headline text-xl font-bold">Register for League</h3>
            </div>
            <span class="material-symbols-outlined text-4xl transition-transform group-hover:translate-x-1"
              >app_registration</span
            >
          </RouterLink>

          <RouterLink
            to="/member-login"
            class="group flex items-center justify-between rounded-xl bg-secondary p-6 text-primary transition-all hover:opacity-95"
          >
            <div class="text-left">
              <p class="mb-1 text-xs font-bold uppercase tracking-widest text-primary/70">Secure Access</p>
              <h3 class="font-headline text-xl font-bold">Member Login</h3>
            </div>
            <span class="material-symbols-outlined text-4xl transition-transform group-hover:translate-x-1"
              >login</span
            >
          </RouterLink>

          <button
            type="button"
            class="group flex items-center justify-between rounded-xl border-2 border-primary bg-surface-container p-6 text-primary transition-all hover:bg-primary hover:text-white"
          >
            <div class="text-left">
              <p class="mb-1 text-xs font-bold uppercase tracking-widest opacity-70">Rentals</p>
              <h3 class="font-headline text-xl font-bold">Book Ice / Rentals</h3>
            </div>
            <span class="material-symbols-outlined text-4xl transition-transform group-hover:translate-x-1"
              >calendar_today</span
            >
          </button>

          <button
            type="button"
            class="group flex items-center justify-between rounded-xl border-2 border-primary bg-surface-container p-6 text-primary transition-all hover:bg-primary hover:text-white"
          >
            <div class="text-left">
              <p class="mb-1 text-xs font-bold uppercase tracking-widest opacity-70">Schedules</p>
              <h3 class="font-headline text-xl font-bold">View Calendar</h3>
            </div>
            <span class="material-symbols-outlined text-4xl transition-transform group-hover:translate-x-1"
              >event_available</span
            >
          </button>
        </div>
      </div>
    </section>

    <section class="bg-surface py-24">
      <div class="mx-auto max-w-screen-2xl px-6 lg:px-10">
        <div class="mb-12">
          <h2 class="text-4xl font-headline font-bold tracking-tight text-primary">Leagues &amp; Programs</h2>
          <p class="mt-2 text-on-surface-variant">
            Find the right environment for your skill level and goals.
          </p>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          <div
            class="group flex flex-col overflow-hidden rounded-xl border border-surface-container bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div class="relative h-40 overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3Fkmtjw1eh_nAqrzAe9iEKieit4EZLCF8jaqx6u2VLehCuuWlXCSZrr2KxpXNstNt_HNgY1CqThYNQk8Tdm9eXFTRsDMicRSI1GlISL3-W6AtgvPjD2w3D9LKu6Q6N-m89POvbwZEuw1_GRI7PkwcBPY7PBgv11PcCk6BZnAo_ImR6c9pitpxyyZv20dAC7l5trPaKRYVyyla_Fq6BEvui6oAhRE5jvj3LZkv-EkGJFx3OEtmZyLScbDuJDhP-q_J4NAo5BKRO8RP"
                alt="Learn to Curl"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-primary/10"></div>
            </div>
            <div class="flex flex-grow flex-col p-5">
              <div class="mb-3">
                <h3 class="text-lg font-headline font-bold text-primary">Learn to Curl</h3>
                <p class="text-xs font-bold uppercase text-secondary">(Smart Start)</p>
              </div>
              <p class="mb-6 text-sm text-on-surface-variant">
                The perfect introduction for new curlers. Learn the basics in a supportive
                environment.
              </p>
              <div class="mt-auto flex flex-col gap-2">
                <RouterLink
                  to="/create-account"
                  class="w-full rounded bg-primary py-2 text-center text-sm font-bold text-white transition-colors hover:bg-opacity-90"
                  >Register</RouterLink
                >
                <RouterLink
                  to="/leagues"
                  class="w-full rounded border border-primary py-2 text-center text-sm font-bold text-primary transition-colors hover:bg-primary/5"
                  >View Details</RouterLink
                >
              </div>
            </div>
          </div>

          <div
            class="group flex flex-col overflow-hidden rounded-xl border border-surface-container bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div class="relative h-40 overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWbcfcQiy1IEqIeMmAHaalxYiojnLrdp8G44MOYkiL5DfqhH3b9-bbizXsUH5MA-dc4L3GLQHUewMUoBOQDHyeeF0aj9bplYokRvkt4DvBpX1gUj5hCr_FU7H7MPwXgAuDe29uReOyo-vdlKEno5V3c8TnAA4WT_wSANiGYv4ZBZwpJrw4glAko5yFHgG_Ordm9I7sonj6Ep1LiZ0dpflL--AAKtNTwu0BRga5aFXJajAm4Lq1kbm-WDoDWlx4D-OZUMz6BW2bFV0s"
                alt="Rookie League"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-primary/10"></div>
            </div>
            <div class="flex flex-grow flex-col p-5">
              <div class="mb-3">
                <h3 class="text-lg font-headline font-bold text-primary">Rookie League</h3>
                <p class="text-xs font-bold uppercase text-secondary">Novice Play</p>
              </div>
              <p class="mb-6 text-sm text-on-surface-variant">
                For those with 1-3 years of experience. Refine your game with social competition.
              </p>
              <div class="mt-auto flex flex-col gap-2">
                <RouterLink
                  to="/create-account"
                  class="w-full rounded bg-primary py-2 text-center text-sm font-bold text-white transition-colors hover:bg-opacity-90"
                  >Register</RouterLink
                >
                <RouterLink
                  to="/leagues"
                  class="w-full rounded border border-primary py-2 text-center text-sm font-bold text-primary transition-colors hover:bg-primary/5"
                  >View Details</RouterLink
                >
              </div>
            </div>
          </div>

          <div
            class="group flex flex-col overflow-hidden rounded-xl border border-surface-container bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div class="relative h-40 overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOe5Z6dYE5cpYebapM6FSNme9y6P2J_VhAAQaq-b7lT9uh39syVcmEBfxHgxsVescMNdNR4ZCL7TVgWkWv6wjk-Uhq_TtgnutfWKVczFjmm08KBYfPQU7SmOWbV548pu4rYNRgJ3Y9a-4XRP0HQK1PdRGVAGnYpDkkRwlUo6eqY5TmBJlfIrfdLQJj2kLOKLKu0dwc3XScwOxbOBAjMPLxHlzDy_72bnU_fmGdtG241jXeifcyaGt19JqKDs4RiFuM4MiNwlyRgu6o"
                alt="Competitive Leagues"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-primary/10"></div>
            </div>
            <div class="flex flex-grow flex-col p-5">
              <div class="mb-3">
                <h3 class="text-lg font-headline font-bold text-primary">Competitive Leagues</h3>
                <p class="text-xs font-bold uppercase text-secondary">Elite Stream</p>
              </div>
              <p class="mb-6 text-sm text-on-surface-variant">
                High-intensity play for experienced teams looking for provincial-level challenge.
              </p>
              <div class="mt-auto flex flex-col gap-2">
                <RouterLink
                  to="/create-account"
                  class="w-full rounded bg-primary py-2 text-center text-sm font-bold text-white transition-colors hover:bg-opacity-90"
                  >Register</RouterLink
                >
                <RouterLink
                  to="/leagues"
                  class="w-full rounded border border-primary py-2 text-center text-sm font-bold text-primary transition-colors hover:bg-primary/5"
                  >View Details</RouterLink
                >
              </div>
            </div>
          </div>

          <div
            class="group flex flex-col overflow-hidden rounded-xl border border-surface-container bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div class="relative h-40 overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCavEm5fVsd_bkT4S8QaEWCydlDH5RXQO_zrGIzUeHW8VPZOMeVnV9Fc9zxeK8WaoyBOJDl1cXdKPu5VOJFKTeECcrfa8WeONHb8wTsygyIy_tqtV2-xUsJGCYiuPbcnLroUGRAy7dcp6aD8F1r1TZJozHlXkbYAA852af_49V3Y1kyi1vWaIdGq1BaDkXMiqAa7ryz1VtY7kmGCZuD7iV6CLZEmLLnzMs6fC94qUjApIrfQfA-IQU9ZeWkoA5HjuBQS7X5aVVso9ba"
                alt="Youth Programs"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-primary/10"></div>
            </div>
            <div class="flex flex-grow flex-col p-5">
              <div class="mb-3">
                <h3 class="text-lg font-headline font-bold text-primary">Youth Programs</h3>
                <p class="text-xs font-bold uppercase text-secondary">Ages 6-18</p>
              </div>
              <p class="mb-6 text-sm text-on-surface-variant">
                Developing the next generation of curlers through fun, skill-based training.
              </p>
              <div class="mt-auto flex flex-col gap-2">
                <RouterLink
                  to="/create-account"
                  class="w-full rounded bg-primary py-2 text-center text-sm font-bold text-white transition-colors hover:bg-opacity-90"
                  >Register</RouterLink
                >
                <RouterLink
                  to="/leagues"
                  class="w-full rounded border border-primary py-2 text-center text-sm font-bold text-primary transition-colors hover:bg-primary/5"
                  >View Details</RouterLink
                >
              </div>
            </div>
          </div>

          <div
            class="group flex flex-col overflow-hidden rounded-xl border border-surface-container bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div class="relative h-40 overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZmqS_oL8P8Rv4Pso-57sCT99hNaDHL8uhwGwEr-j0KjenWHijR8hoJ7FqaibceUHr2MH9Db4r2Ua4iSZpM70wAM6rLQknokFGUmrQGEGSrNvWIkyIblpZxmQCr_NGDJ5QJ7bIVbvtcHWZ1GOWfaiHXu-o9v1lDwEQKv7FkhOqLfrn2JpohdvttuNQ2TEvOQM1aGMMks-8R0XU8QCPDb-7Gli2FJE1wi3DEXLHuoKBMbwX5VKg7iPkhKWwXzQyxwfDqNShDD-n4VeV"
                alt="Clinics"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-primary/10"></div>
            </div>
            <div class="flex flex-grow flex-col p-5">
              <div class="mb-3">
                <h3 class="text-lg font-headline font-bold text-primary">Clinics</h3>
                <p class="text-xs font-bold uppercase text-secondary">Skill Building</p>
              </div>
              <p class="mb-6 text-sm text-on-surface-variant">
                Targeted coaching for delivery, strategy, and sweeping from expert instructors.
              </p>
              <div class="mt-auto flex flex-col gap-2">
                <RouterLink
                  to="/create-account"
                  class="w-full rounded bg-primary py-2 text-center text-sm font-bold text-white transition-colors hover:bg-opacity-90"
                  >Register</RouterLink
                >
                <RouterLink
                  to="/leagues"
                  class="w-full rounded border border-primary py-2 text-center text-sm font-bold text-primary transition-colors hover:bg-primary/5"
                  >View Details</RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-24">
      <div class="mx-auto max-w-screen-2xl px-6 lg:px-10">
        <div class="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 class="text-4xl font-headline font-bold tracking-tight text-primary">Upcoming Events</h2>
            <p class="mt-2 text-on-surface-variant">
              Join our specialized clinics and competitive showcases.
            </p>
          </div>
          <p class="rounded bg-primary/5 px-4 py-2 text-sm font-bold italic text-primary">
            Note: Some events require login before registering.
          </p>
        </div>

        <div class="space-y-4">
          <div
            class="flex flex-col items-center justify-between gap-6 rounded-xl border-l-8 border-transparent bg-surface-container p-6 transition-all hover:border-secondary md:flex-row"
          >
            <div class="flex w-full items-center gap-6 md:w-auto">
              <div
                class="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-primary text-white"
              >
                <span class="text-xs font-bold uppercase">Nov</span>
                <span class="text-2xl font-black">12</span>
              </div>
              <div>
                <h4 class="text-xl font-headline font-bold text-primary">
                  Specialized Strategy Clinic: Intermediate delivery
                </h4>
                <p class="flex items-center gap-2 text-sm text-on-surface-variant">
                  <span class="material-symbols-outlined text-sm">schedule</span> 6:30 PM - 8:30 PM
                </p>
              </div>
            </div>

            <div class="flex w-full items-center justify-between gap-8 md:w-auto md:justify-end">
              <span class="text-xl font-black text-primary">$45.00</span>
              <RouterLink
                to="/member-login"
                class="rounded bg-primary px-8 py-2 font-bold text-white transition-colors hover:bg-opacity-90"
                >Register</RouterLink
              >
            </div>
          </div>

          <div
            class="flex flex-col items-center justify-between gap-6 rounded-xl border-l-8 border-transparent bg-surface-container p-6 transition-all hover:border-secondary md:flex-row"
          >
            <div class="flex w-full items-center gap-6 md:w-auto">
              <div
                class="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-primary text-white"
              >
                <span class="text-xs font-bold uppercase">Nov</span>
                <span class="text-2xl font-black">18</span>
              </div>
              <div>
                <h4 class="text-xl font-headline font-bold text-primary">U18 Regional Qualifier</h4>
                <p class="flex items-center gap-2 text-sm text-on-surface-variant">
                  <span class="material-symbols-outlined text-sm">schedule</span> Full Day Event
                </p>
              </div>
            </div>

            <div class="flex w-full items-center justify-between gap-8 md:w-auto md:justify-end">
              <span class="text-xl font-black text-primary">$120.00 / Team</span>
              <RouterLink
                to="/member-login"
                class="rounded bg-primary px-8 py-2 font-bold text-white transition-colors hover:bg-opacity-90"
                >Register</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-primary py-24 text-white">
      <div class="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-10">
        <div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 class="mb-6 text-4xl font-headline font-bold lg:text-5xl">
              Your Season, <span class="text-secondary">Connected.</span>
            </h2>
            <p class="mb-8 text-lg leading-relaxed text-white/80">
              Log in to access your personalized dashboard. Manage team rosters, track real-time
              standings, and view full season schedules in one streamlined interface.
            </p>

            <div class="mb-8 space-y-4">
              <div class="flex items-start gap-4">
                <span class="material-symbols-outlined text-secondary">check_circle</span>
                <p>Interactive league schedules and score reporting</p>
              </div>
              <div class="flex items-start gap-4">
                <span class="material-symbols-outlined text-secondary">check_circle</span>
                <p>Live standings and detailed team statistics</p>
              </div>
              <div class="flex items-start gap-4">
                <span class="material-symbols-outlined text-secondary">check_circle</span>
                <p>Direct communication with league coordinators</p>
              </div>
            </div>

            <RouterLink
              to="/member-login"
              class="font-label rounded-lg bg-secondary px-8 py-3 font-bold text-primary transition-all hover:opacity-90"
            >
              Access Portal
            </RouterLink>
          </div>

          <div class="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
            <div class="overflow-hidden rounded-lg bg-white text-xs text-on-surface">
              <div class="flex items-center justify-between border-b bg-surface-container p-3">
                <span class="font-bold uppercase tracking-tighter text-primary"
                  >Current Standings: Monday Night Mixed</span
                >
                <span class="material-symbols-outlined text-sm">more_horiz</span>
              </div>
              <table class="w-full">
                <thead class="border-b bg-surface">
                  <tr>
                    <th class="p-3 text-left">Team Name</th>
                    <th class="p-3 text-center">W</th>
                    <th class="p-3 text-center">L</th>
                    <th class="p-3 text-center">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b">
                    <td class="p-3 font-bold">Stone Cold Sweepers</td>
                    <td class="p-3 text-center">8</td>
                    <td class="p-3 text-center">1</td>
                    <td class="p-3 text-center font-bold text-primary">16</td>
                  </tr>
                  <tr class="border-b bg-primary/5">
                    <td class="p-3 font-bold">The Granite Gurus</td>
                    <td class="p-3 text-center">7</td>
                    <td class="p-3 text-center">2</td>
                    <td class="p-3 text-center font-bold text-primary">14</td>
                  </tr>
                  <tr class="border-b">
                    <td class="p-3 font-bold">House Hunters</td>
                    <td class="p-3 text-center">6</td>
                    <td class="p-3 text-center">3</td>
                    <td class="p-3 text-center font-bold text-primary">12</td>
                  </tr>
                </tbody>
              </table>
              <div class="bg-surface p-3 text-center">
                <span class="cursor-pointer font-bold text-primary hover:underline"
                  >View Full Schedule &amp; Results →</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"></div>
    </section>

    <section class="bg-white py-24">
      <div class="mx-auto max-w-screen-2xl px-6 lg:px-10">
        <div class="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2">
          <div class="group relative overflow-hidden rounded-2xl bg-surface-container">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR9HXgoh2X0uu_hEk6tXsgjeeEoXs_rSM7BAXOKtSOUqm0-g7rHMB1vriOYZN9J80ZwNMUQ93CDBlYcu0RmRjq81hGJL3kgiLsv-8CrY6FUCab8Ojjf85NY95e_yD6my_F4nfqa3FBNlAm0GgDmFhkOca8J5UzpPzjZXZ5bWFD_BM5UXPFWvzi2Zsb0AM_oOqOt4lNWTtWZ_SgzgFOnH-J73ySHnAWUyBKB8c2nDZaysjh_zCl7u_RAkD9e3ww8EJesB2GNthyv9Uh"
              alt="Corporate Event at Saville"
              class="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 text-white"
            >
              <h3 class="mb-2 text-3xl font-headline font-bold">Corporate &amp; Group Events</h3>
              <p class="mb-6 max-w-md opacity-90">
                The perfect venue for team building, parties, and school groups. Our facility can
                accommodate groups of 10 to 100+.
              </p>
              <button
                type="button"
                class="w-fit rounded-lg bg-secondary px-8 py-3 font-bold text-primary transition-colors hover:bg-white"
              >
                Request Booking
              </button>
            </div>
          </div>

          <div class="flex flex-col justify-center p-4 lg:p-8">
            <h2 class="mb-6 text-4xl font-headline font-bold text-primary">Facility &amp; Ice Rentals</h2>
            <div class="space-y-6">
              <div class="flex gap-4">
                <div
                  class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <span class="material-symbols-outlined">meeting_room</span>
                </div>
                <div>
                  <h4 class="text-lg font-bold">Practice Ice</h4>
                  <p class="text-sm text-on-surface-variant">
                    Individual sheets available for booking daily. Refine your delivery on
                    world-class ice.
                  </p>
                </div>
              </div>

              <div class="flex gap-4">
                <div
                  class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <span class="material-symbols-outlined">restaurant</span>
                </div>
                <div>
                  <h4 class="text-lg font-bold">Lounge &amp; Amenities</h4>
                  <p class="text-sm text-on-surface-variant">
                    Full-service lounge overlooking the ice. Perfect for post-game refreshments or
                    catering for corporate functions.
                  </p>
                </div>
              </div>

              <div class="flex gap-4">
                <div
                  class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <span class="material-symbols-outlined">sports_handball</span>
                </div>
                <div>
                  <h4 class="text-lg font-bold">Equipment Included</h4>
                  <p class="text-sm text-on-surface-variant">
                    All group rentals include sliders, brooms, and basic instruction to get you
                    started safely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-surface-container py-24">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.45),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.35),transparent_38%),radial-gradient(circle_at_60%_75%,rgba(255,255,255,0.28),transparent_35%)]"
      ></div>

      <div class="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-10">
        <div class="mx-auto mb-16 max-w-3xl text-center">
          <h2 class="mb-6 text-4xl font-headline font-bold text-primary lg:text-5xl">
            Western Canada's Premier Training Venue
          </h2>
          <p class="text-lg text-on-surface-variant">
            Experience the atmosphere where provincial, national, and Olympic champions are forged.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div class="rounded-2xl bg-white p-10 text-center shadow-sm">
            <span class="mb-2 block text-6xl font-black text-primary">10</span>
            <p class="mb-4 font-bold uppercase tracking-widest text-secondary">Sheets of Ice</p>
            <p class="text-on-surface-variant">
              Consistently maintained to World Curling Federation standards by elite ice
              technicians.
            </p>
          </div>

          <div class="z-20 rounded-2xl bg-primary p-10 text-white shadow-xl lg:scale-110">
            <span class="material-symbols-outlined mb-4 block text-6xl text-secondary"
              >workspace_premium</span
            >
            <h3 class="mb-4 text-2xl font-headline font-bold">National Training Centre</h3>
            <p class="leading-relaxed opacity-90">
              Designated High-Performance site for Curling Canada. State-of-the-art analysis
              equipment available for competitive athletes.
            </p>
          </div>

          <div class="rounded-2xl bg-white p-10 text-center shadow-sm">
            <span class="material-symbols-outlined mb-2 block text-6xl text-primary">visibility</span>
            <p class="mb-4 font-bold uppercase tracking-widest text-secondary">Viewing Lounge</p>
            <p class="text-on-surface-variant">
              Expansive elevated views of all 10 sheets. The best seat in the house for spectators
              and social events.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-24">
      <div class="mx-auto max-w-screen-2xl px-6 lg:px-10">
        <div class="mb-12 flex items-center justify-between">
          <h2 class="text-4xl font-headline font-bold text-primary">Latest Updates</h2>
          <button
            type="button"
            class="flex items-center gap-2 font-bold text-primary transition-colors hover:underline"
          >
            View All News <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div
            class="group cursor-pointer rounded-xl border border-surface-container p-6 transition-colors hover:border-primary"
          >
            <p class="mb-2 text-xs font-bold uppercase text-secondary">Registration</p>
            <h4 class="mb-4 text-xl font-headline font-bold text-primary group-hover:text-primary/80">
              Winter League Registration Now Open
            </h4>
            <p class="mb-6 text-sm text-on-surface-variant">
              Secure your team's spot for the upcoming January-March session. Early bird rates
              apply until Nov 30.
            </p>
            <span class="flex items-center gap-1 text-sm font-bold text-primary"
              >Read More <span class="material-symbols-outlined text-xs">open_in_new</span></span
            >
          </div>

          <div
            class="group cursor-pointer rounded-xl border border-surface-container p-6 transition-colors hover:border-primary"
          >
            <p class="mb-2 text-xs font-bold uppercase text-secondary">Clinics Available</p>
            <h4 class="mb-4 text-xl font-headline font-bold text-primary group-hover:text-primary/80">
              Specialized Sweeping Clinic - Dec 5
            </h4>
            <p class="mb-6 text-sm text-on-surface-variant">
              Learn advanced sweeping techniques and effective weight judgment from certified
              instructors.
            </p>
            <span class="flex items-center gap-1 text-sm font-bold text-primary"
              >Read More <span class="material-symbols-outlined text-xs">open_in_new</span></span
            >
          </div>

          <div
            class="group cursor-pointer rounded-xl border border-surface-container p-6 transition-colors hover:border-primary"
          >
            <p class="mb-2 text-xs font-bold uppercase text-secondary">Facility News</p>
            <h4 class="mb-4 text-xl font-headline font-bold text-primary group-hover:text-primary/80">
              Pro Shop Holiday Sale Event
            </h4>
            <p class="mb-6 text-sm text-on-surface-variant">
              Up to 20% off all curling apparel and equipment. Members get an additional 5%
              discount.
            </p>
            <span class="flex items-center gap-1 text-sm font-bold text-primary"
              >Read More <span class="material-symbols-outlined text-xs">open_in_new</span></span
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
