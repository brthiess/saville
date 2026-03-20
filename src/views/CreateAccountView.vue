<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useAppStore } from '../stores/app'

const appStore = useAppStore()

const registrationForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const formError = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const isSubmitting = computed(() => appStore.isRegistrationLoading)

async function onSubmit() {
  formError.value = null
  successMessage.value = null

  const email = registrationForm.email.trim()
  const firstName = registrationForm.firstName.trim()
  const lastName = registrationForm.lastName.trim()

  if (registrationForm.password.length < 8) {
    formError.value = 'Password must be at least 8 characters.'
    return
  }

  if (registrationForm.password !== registrationForm.confirmPassword) {
    formError.value = 'Password and confirmation do not match.'
    return
  }

  try {
    await appStore.registerCurlerAccount({
      firstName,
      lastName,
      email,
      password: registrationForm.password,
    })

    registrationForm.password = ''
    registrationForm.confirmPassword = ''
    successMessage.value = 'Your account has been created. You can now sign in on the Member Login page.'
  } catch (error) {
    formError.value = error instanceof Error ? error.message : 'Unable to create your account.'
  }
}
</script>

<template>
  <section class="flex flex-grow items-center justify-center px-6 pb-12 pt-24">
    <div
      class="relative grid w-full max-w-[1100px] overflow-hidden rounded-xl border border-outline-variant/15 bg-surface-container-lowest shadow-xl md:grid-cols-2"
    >
      <div class="relative hidden overflow-hidden bg-primary md:block">
        <img
          src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1200&auto=format&fit=crop"
          alt="Curling team preparing on the ice"
          class="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-overlay"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-transparent"></div>

        <div class="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <div>
            <span
              class="mb-4 block font-label text-sm font-bold uppercase tracking-[0.2em] text-secondary"
              >Join the Club</span
            >
            <h1 class="font-headline text-5xl font-bold leading-tight tracking-tight">
              Build.<br />Belong.<br />Bonspiel.
            </h1>
          </div>

          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-secondary-container/30"
              >
                <span class="material-symbols-outlined text-secondary-container">app_registration</span>
              </div>
              <p class="text-sm leading-relaxed text-primary-fixed-dim">
                Create your member profile to register for leagues, manage bookings, and access
                member-only updates.
              </p>
            </div>
          </div>
        </div>

        <div class="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"></div>
      </div>

      <div class="flex flex-col justify-center p-8 md:p-16">
        <div class="mb-10">
          <h2 class="mb-2 font-headline text-3xl font-bold text-on-surface">Create Account</h2>
          <p class="font-medium text-on-surface-variant">
            Register your member profile for the University of Alberta's home of curling.
          </p>
        </div>

        <p v-if="formError" class="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {{ formError }}
        </p>
        <p
          v-if="successMessage"
          class="mb-6 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary"
        >
          {{ successMessage }}
        </p>

        <div v-if="appStore.isAuthenticated" class="space-y-6">
          <div class="rounded-xl border border-outline-variant/20 bg-surface-container-low p-6">
            <p class="text-on-surface">
              You are already signed in as <strong>{{ appStore.memberDisplayName }}</strong>.
            </p>
          </div>
          <RouterLink
            to="/"
            class="flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-4 font-headline text-lg font-bold text-on-primary shadow-lg transition-all hover:scale-[1.01] hover:bg-primary-container active:scale-[0.98]"
          >
            Go to Homepage
            <span class="material-symbols-outlined">arrow_forward</span>
          </RouterLink>
        </div>

        <form v-else class="space-y-6" @submit.prevent="onSubmit">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div class="space-y-2">
              <label
                for="firstName"
                class="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                >First Name</label
              >
              <div class="group relative">
                <span
                  class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary"
                  >badge</span
                >
                <input
                  id="firstName"
                  v-model="registrationForm.firstName"
                  type="text"
                  required
                  autocomplete="given-name"
                  :disabled="isSubmitting"
                  placeholder="Alex"
                  class="w-full rounded-lg border-none bg-surface-container-high py-4 pl-12 pr-4 font-body text-on-surface placeholder:text-outline/50 transition-all focus:bg-surface-container-highest focus:ring-0"
                />
                <div
                  class="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-secondary transition-all duration-300 group-focus-within:w-full"
                ></div>
              </div>
            </div>

            <div class="space-y-2">
              <label
                for="lastName"
                class="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                >Last Name</label
              >
              <div class="group relative">
                <span
                  class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary"
                  >badge</span
                >
                <input
                  id="lastName"
                  v-model="registrationForm.lastName"
                  type="text"
                  required
                  autocomplete="family-name"
                  :disabled="isSubmitting"
                  placeholder="Martin"
                  class="w-full rounded-lg border-none bg-surface-container-high py-4 pl-12 pr-4 font-body text-on-surface placeholder:text-outline/50 transition-all focus:bg-surface-container-highest focus:ring-0"
                />
                <div
                  class="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-secondary transition-all duration-300 group-focus-within:w-full"
                ></div>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <label
              for="email"
              class="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
              >Email</label
            >
            <div class="group relative">
              <span
                class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary"
                >mail</span
              >
              <input
                id="email"
                v-model="registrationForm.email"
                type="email"
                required
                autocomplete="email"
                :disabled="isSubmitting"
                placeholder="curler@ualberta.ca"
                class="w-full rounded-lg border-none bg-surface-container-high py-4 pl-12 pr-4 font-body text-on-surface placeholder:text-outline/50 transition-all focus:bg-surface-container-highest focus:ring-0"
              />
              <div
                class="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-secondary transition-all duration-300 group-focus-within:w-full"
              ></div>
            </div>
          </div>

          <div class="space-y-2">
            <label
              for="password"
              class="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
              >Password</label
            >
            <div class="group relative">
              <span
                class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary"
                >lock</span
              >
              <input
                id="password"
                v-model="registrationForm.password"
                :type="showPassword ? 'text' : 'password'"
                required
                minlength="8"
                autocomplete="new-password"
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

          <div class="space-y-2">
            <label
              for="confirmPassword"
              class="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
              >Confirm Password</label
            >
            <div class="group relative">
              <span
                class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary"
                >verified_user</span
              >
              <input
                id="confirmPassword"
                v-model="registrationForm.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                minlength="8"
                autocomplete="new-password"
                :disabled="isSubmitting"
                placeholder="••••••••"
                class="w-full rounded-lg border-none bg-surface-container-high py-4 pl-12 pr-12 font-body text-on-surface placeholder:text-outline/50 transition-all focus:bg-surface-container-highest focus:ring-0"
              />
              <button
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-outline transition-colors hover:text-on-surface"
                :disabled="isSubmitting"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <span class="material-symbols-outlined">{{ showConfirmPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
              <div
                class="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-secondary transition-all duration-300 group-focus-within:w-full"
              ></div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="group flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-4 font-headline text-lg font-bold text-on-primary shadow-lg transition-all hover:scale-[1.01] hover:bg-primary-container active:scale-[0.98]"
          >
            {{ isSubmitting ? 'Creating account...' : 'Create Account' }}
            <span class="material-symbols-outlined transition-transform group-hover:translate-x-1"
              >arrow_forward</span
            >
          </button>

          <div class="mt-2 border-t border-surface-container-highest pt-6">
            <RouterLink
              to="/member-login"
              class="inline-flex items-center gap-2 font-bold text-primary transition-all hover:gap-3"
            >
              Already have an account? Sign in
              <span class="material-symbols-outlined text-sm">login</span>
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
