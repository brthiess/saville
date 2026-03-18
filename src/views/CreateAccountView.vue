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
  <section class="page-section">
    <div class="container">
      <div class="create-account-shell surface">
        <h1 class="section-title">Create Curler Account</h1>
        <p class="section-subtitle">
          Register a member account using Directus. Role assignment is managed by Directus public registration settings.
        </p>

        <p v-if="formError" class="status-message error">{{ formError }}</p>
        <p v-if="successMessage" class="status-message loading">{{ successMessage }}</p>

        <form v-if="!appStore.isAuthenticated" class="create-account-form" @submit.prevent="onSubmit">
          <label>
            First Name
            <input v-model="registrationForm.firstName" type="text" required :disabled="isSubmitting" />
          </label>

          <label>
            Last Name
            <input v-model="registrationForm.lastName" type="text" required :disabled="isSubmitting" />
          </label>

          <label>
            Email
            <input
              v-model="registrationForm.email"
              type="email"
              required
              autocomplete="email"
              :disabled="isSubmitting"
            />
          </label>

          <label>
            Password
            <input
              v-model="registrationForm.password"
              type="password"
              required
              minlength="8"
              autocomplete="new-password"
              :disabled="isSubmitting"
            />
          </label>

          <label>
            Confirm Password
            <input
              v-model="registrationForm.confirmPassword"
              type="password"
              required
              minlength="8"
              autocomplete="new-password"
              :disabled="isSubmitting"
            />
          </label>

          <button type="submit" class="button-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Creating account...' : 'Create Account' }}
          </button>

          <RouterLink to="/member-login" class="account-link">Already have an account? Sign in</RouterLink>
        </form>

        <div v-else class="already-signed-in status-message loading">
          You are already signed in as {{ appStore.memberDisplayName }}.
          <RouterLink to="/" class="account-link">Go to homepage</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.create-account-shell {
  width: min(560px, 100%);
  margin: 0 auto;
}

.create-account-form {
  display: grid;
  gap: 1rem;
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

input:focus {
  outline: 2px solid rgba(47, 125, 80, 0.25);
  border-color: var(--color-green-600);
}

input:disabled {
  background: var(--color-gray-100);
}

button:disabled {
  opacity: 0.75;
  cursor: wait;
}

.account-link {
  width: fit-content;
  color: var(--color-green-700);
}

.account-link:hover {
  text-decoration: underline;
}

.already-signed-in {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
