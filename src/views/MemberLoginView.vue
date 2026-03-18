<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useAppStore } from '../stores/app'

const appStore = useAppStore()

const loginForm = reactive({
  email: '',
  password: '',
})

const formError = ref<string | null>(null)
const statusMessage = ref<string | null>(null)
const forgotPasswordUrl = `${(import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055').replace(/\/$/, '')}/admin/login`

const isSubmitting = computed(() => appStore.isAuthLoading)

async function onSubmit() {
  formError.value = null
  statusMessage.value = null

  try {
    await appStore.loginMember({
      email: loginForm.email.trim(),
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
  <section class="page-section">
    <div class="container">
      <div class="login-shell surface">
        <h1 class="section-title">Member Login</h1>
        <p class="section-subtitle">Sign in with your Directus member account.</p>

        <p v-if="formError" class="status-message error">{{ formError }}</p>
        <p v-if="statusMessage" class="status-message loading">{{ statusMessage }}</p>

        <div v-if="appStore.isAuthenticated" class="signed-in-panel">
          <p class="signed-in-title">
            Signed in as <strong>{{ appStore.memberDisplayName }}</strong>
          </p>
          <p v-if="appStore.memberRoleName" class="signed-in-role">Role: {{ appStore.memberRoleName }}</p>
          <button type="button" class="button-secondary" @click="onSignOut">Sign Out</button>
        </div>

        <form v-else class="login-form" @submit.prevent="onSubmit">
          <label>
            Email
            <input v-model="loginForm.email" type="email" required autocomplete="email" :disabled="isSubmitting" />
          </label>

          <label>
            Password
            <input
              v-model="loginForm.password"
              type="password"
              required
              minlength="6"
              autocomplete="current-password"
              :disabled="isSubmitting"
            />
          </label>

          <button type="submit" class="button-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Signing in...' : 'Login' }}
          </button>

          <RouterLink to="/create-account" class="create-account-link">
            New to the club? Create a Curler account
          </RouterLink>

          <a :href="forgotPasswordUrl" target="_blank" rel="noreferrer" class="forgot-link">Forgot password?</a>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.login-shell {
  width: min(520px, 100%);
  margin: 0 auto;
}

.login-form {
  display: grid;
  gap: 1rem;
}

.signed-in-panel {
  border: 1px solid var(--color-gray-300);
  border-radius: 0.7rem;
  padding: 1rem;
  margin-bottom: 1rem;
  display: grid;
  gap: 0.65rem;
}

.signed-in-title,
.signed-in-role {
  margin: 0;
}

label {
  display: grid;
  gap: 0.4rem;
  font-weight: 600;
}

input {
  border: 1px solid var(--color-gray-300);
  border-radius: 0.55rem;
  padding: 0.66rem 0.7rem;
  font: inherit;
}

input:disabled {
  background: var(--color-gray-100);
}

input:focus {
  outline: 2px solid rgba(47, 125, 80, 0.25);
  border-color: var(--color-green-600);
}

button:disabled {
  opacity: 0.75;
  cursor: wait;
}

.create-account-link,
.forgot-link {
  color: var(--color-green-700);
  width: fit-content;
}

.create-account-link:hover,
.forgot-link:hover {
  text-decoration: underline;
}
</style>
