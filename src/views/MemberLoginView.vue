<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useAppStore } from '../stores/app'

const appStore = useAppStore()

const loginForm = reactive({
  identifier: '',
  password: '',
  remember: false,
})

const formError = ref<string | null>(null)
const statusMessage = ref<string | null>(null)
const showPassword = ref(false)
const forgotPasswordUrl = `${(import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055').replace(/\/$/, '')}/admin/login`

const isSubmitting = computed(() => appStore.isAuthLoading)

async function onSubmit() {
  formError.value = null
  statusMessage.value = null

  try {
    await appStore.loginMember({
      email: loginForm.identifier.trim(),
      password: loginForm.password,
    })

    loginForm.password = ''
    statusMessage.value = 'Login successful. Your member session is now active.'
  } catch (error) {
    formError.value = error instanceof Error ? error.message : 'Unable to sign in right now.'
  }
}

async function onSignOut() {
  await appStore.logoutMember()
  statusMessage.value = 'You have been signed out.'
}
</script>

<template>
  <section class="flex flex-grow items-center justify-center px-6 pb-12 pt-24">
    <div
      class="relative grid w-full max-w-[1100px] overflow-hidden rounded-xl border border-outline-variant/15 bg-surface-container-lowest shadow-xl md:grid-cols-2"
    >
      <div class="relative hidden overflow-hidden bg-primary md:block">
        <img
          src="https://images.unsplash.com/photo-1551524589-2dca60c78926?q=80&w=1200&auto=format&fit=crop"
          alt="Close up of a professional curling stone on ice"
          class="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-overlay"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-transparent"></div>

        <div class="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <div>
            <span
              class="mb-4 block font-label text-sm font-bold uppercase tracking-[0.2em] text-secondary"
              >Athletic Excellence</span
            >
            <h1 class="font-headline text-5xl font-bold leading-tight tracking-tight">
              Precision.<br />Performance.<br />Pebble.
            </h1>
          </div>

          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-secondary-container/30"
              >
                <span class="material-symbols-outlined text-secondary-container">sports_score</span>
              </div>
              <p class="text-sm leading-relaxed text-primary-fixed-dim">
                Access league standings, practice bookings, and member-exclusive coaching sessions.
              </p>
            </div>
          </div>
        </div>

        <div class="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"></div>
      </div>

      <div class="flex flex-col justify-center p-8 md:p-16">
        <div class="mb-10">
          <h2 class="mb-2 font-headline text-3xl font-bold text-on-surface">Member Login</h2>
          <p class="font-medium text-on-surface-variant">
            Welcome back to the University of Alberta's home of curling.
          </p>
        </div>

        <p v-if="formError" class="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {{ formError }}
        </p>
        <p
          v-if="statusMessage"
          class="mb-6 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary"
        >
          {{ statusMessage }}
        </p>

        <div v-if="appStore.isAuthenticated" class="space-y-6">
          <div class="rounded-xl border border-outline-variant/20 bg-surface-container-low p-6">
            <p class="text-on-surface">
              Signed in as <strong>{{ appStore.memberDisplayName }}</strong>
            </p>
            <p v-if="appStore.memberRoleName" class="mt-1 text-sm text-on-surface-variant">
              Role: {{ appStore.memberRoleName }}
            </p>
          </div>
          <button
            type="button"
            class="flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-4 font-headline text-lg font-bold text-on-primary shadow-lg transition-all hover:scale-[1.01] hover:bg-primary-container active:scale-[0.98]"
            @click="onSignOut"
          >
            Sign Out
            <span class="material-symbols-outlined">logout</span>
          </button>
        </div>

        <form v-else class="space-y-6" @submit.prevent="onSubmit">
          <div class="space-y-2">
            <label
              for="username"
              class="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
              >Username or Email</label
            >
            <div class="group relative">
              <span
                class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary"
                >person</span
              >
              <input
                id="username"
                v-model="loginForm.identifier"
                type="text"
                required
                autocomplete="username"
                :disabled="isSubmitting"
                placeholder="curler_1924"
                class="w-full rounded-lg border-none bg-surface-container-high py-4 pl-12 pr-4 font-body text-on-surface placeholder:text-outline/50 transition-all focus:bg-surface-container-highest focus:ring-0"
              />
              <div
                class="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-secondary transition-all duration-300 group-focus-within:w-full"
              ></div>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex items-end justify-between">
              <label
                for="password"
                class="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                >Password</label
              >
              <a
                :href="forgotPasswordUrl"
                target="_blank"
                rel="noreferrer"
                class="text-xs font-bold text-primary transition-colors hover:text-primary-container"
                >Forgot Password?</a
              >
            </div>

            <div class="group relative">
              <span
                class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary"
                >lock</span
              >
              <input
                id="password"
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                required
                minlength="6"
                autocomplete="current-password"
                :disabled="isSubmitting"
                placeholder="••••••••"
                class="w-full rounded-lg border-none bg-surface-container-high py-4 pl-12 pr-12 font-body text-on-surface placeholder:text-outline/50 transition-all focus:bg-surface-container-highest focus:ring-0"
              />
              <button
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-outline transition-colors hover:text-on-surface"
                :disabled="isSubmitting"
                @click="showPassword = !showPassword"
              >
                <span class="material-symbols-outlined">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
              <div
                class="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-secondary transition-all duration-300 group-focus-within:w-full"
              ></div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <input
              id="remember"
              v-model="loginForm.remember"
              type="checkbox"
              class="h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary"
            />
            <label for="remember" class="cursor-pointer text-sm font-medium text-on-surface-variant"
              >Remember me on this device</label
            >
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="group flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-4 font-headline text-lg font-bold text-on-primary shadow-lg transition-all hover:scale-[1.01] hover:bg-primary-container active:scale-[0.98]"
          >
            {{ isSubmitting ? 'Signing in...' : 'Login to Portal' }}
            <span class="material-symbols-outlined transition-transform group-hover:translate-x-1"
              >arrow_forward</span
            >
          </button>
        </form>

        <div class="mt-12 border-t border-surface-container-highest pt-8">
          <div class="rounded-xl border border-outline-variant/10 bg-surface-container-low p-6">
            <h3 class="mb-1 font-headline text-lg font-bold text-on-surface">New Member?</h3>
            <p class="mb-4 text-sm text-on-surface-variant">
              Join our community to start booking ice time and competing in elite leagues.
            </p>
            <RouterLink
              to="/create-account"
              class="inline-flex items-center gap-2 font-bold text-primary transition-all hover:gap-3"
            >
              Create one for approval
              <span class="material-symbols-outlined text-sm">open_in_new</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
