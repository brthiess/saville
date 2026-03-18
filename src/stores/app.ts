import { defineStore } from 'pinia'

import {
  getCurrentMemberProfile,
  loginMemberWithDirectus,
  logoutMemberFromDirectus,
  registerMemberWithDirectus,
} from '../api/auth'
import { getSiteSettings } from '../api/siteSettings'
import {
  APP_NAME_FALLBACK,
  CONTACT_EMAIL_FALLBACK,
  ENFORCE_MEMBER_ROLE,
  MEMBER_ROLE_ALLOWLIST,
  TAGLINE_FALLBACK,
} from '../config/constants'
import type {
  DirectusAuthSession,
  MemberProfile,
  MemberRegistrationPayload,
  SiteSettings,
} from '../types'

const AUTH_STORAGE_KEY = 'saville-member-auth'

interface MemberCredentials {
  email: string
  password: string
}

interface CurlerRegistrationInput {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface AppState {
  siteSettings: SiteSettings | null
  isLoadingSettings: boolean
  settingsError: string | null
  authSession: DirectusAuthSession | null
  memberProfile: MemberProfile | null
  isAuthLoading: boolean
  authError: string | null
  isRegistrationLoading: boolean
  registrationError: string | null
}

interface AccessTokenClaims {
  role?: unknown
  roles?: unknown
  policies?: unknown
}

function normalizeIdentifier(value: string | null | undefined): string | null {
  const normalized = value?.trim()
  return normalized || null
}

function getMemberRoleIdentifiers(member: MemberProfile | null): string[] {
  if (!member?.role) {
    return []
  }

  if (typeof member.role === 'string') {
    const roleId = normalizeIdentifier(member.role)
    return roleId ? [roleId] : []
  }

  const identifiers = [member.role.name, member.role.id]
    .map((value) => normalizeIdentifier(value))
    .filter((value): value is string => Boolean(value))

  return Array.from(new Set(identifiers))
}

function getMemberPolicyIdentifiers(member: MemberProfile | null): string[] {
  if (!member?.policies) {
    return []
  }

  const rawPolicies = Array.isArray(member.policies) ? member.policies : [member.policies]

  const identifiers = rawPolicies.flatMap((policy): string[] => {
    if (!policy) {
      return []
    }

    if (typeof policy === 'string') {
      const policyId = normalizeIdentifier(policy)
      return policyId ? [policyId] : []
    }

    const policyName = normalizeIdentifier(policy.name)
    const policyId = normalizeIdentifier(policy.id)

    return [policyName, policyId].filter((value): value is string => Boolean(value))
  })

  return Array.from(new Set(identifiers))
}

function getMemberAccessIdentifiers(member: MemberProfile | null): string[] {
  return Array.from(new Set([...getMemberRoleIdentifiers(member), ...getMemberPolicyIdentifiers(member)]))
}

function getMemberAccessLabel(member: MemberProfile | null): string | null {
  const accessIdentifiers = getMemberAccessIdentifiers(member)
  return accessIdentifiers[0] || null
}

function getIdentifiersFromUnknownValue(value: unknown): string[] {
  if (typeof value === 'string') {
    const normalizedValue = normalizeIdentifier(value)
    return normalizedValue ? [normalizedValue] : []
  }

  if (Array.isArray(value)) {
    return value
      .flatMap((entry) => getIdentifiersFromUnknownValue(entry))
      .filter((entry, index, allEntries) => allEntries.indexOf(entry) === index)
  }

  return []
}

function decodeAccessTokenClaims(accessToken: string): AccessTokenClaims | null {
  const payloadSegment = accessToken.split('.')[1]

  if (!payloadSegment) {
    return null
  }

  try {
    const base64 = payloadSegment.replace(/-/g, '+').replace(/_/g, '/')
    const paddingLength = (4 - (base64.length % 4)) % 4
    const normalizedBase64 = base64 + '='.repeat(paddingLength)
    const json = atob(normalizedBase64)

    return JSON.parse(json) as AccessTokenClaims
  } catch {
    return null
  }
}

function getAccessIdentifiersFromSession(session: DirectusAuthSession | null): string[] {
  if (!session?.access_token) {
    return []
  }

  const claims = decodeAccessTokenClaims(session.access_token)

  if (!claims) {
    return []
  }

  const identifiers = [
    ...getIdentifiersFromUnknownValue(claims.role),
    ...getIdentifiersFromUnknownValue(claims.roles),
    ...getIdentifiersFromUnknownValue(claims.policies),
  ]

  return Array.from(new Set(identifiers))
}

function combineAccessIdentifiers(
  profile: MemberProfile | null,
  session: DirectusAuthSession | null,
): string[] {
  return Array.from(new Set([...getMemberAccessIdentifiers(profile), ...getAccessIdentifiersFromSession(session)]))
}

function isAccessAllowed(accessIdentifiers: string[]): boolean {
  if (!ENFORCE_MEMBER_ROLE) {
    return true
  }

  if (accessIdentifiers.length === 0) {
    return false
  }

  const normalizedIdentifiers = accessIdentifiers.map((value) => value.toLowerCase())

  return MEMBER_ROLE_ALLOWLIST.some(
    (allowedValue: string) => normalizedIdentifiers.includes(allowedValue.toLowerCase()),
  )
}

function getDeniedAccessErrorMessage(accessIdentifiers: string[]): string {
  const currentAccessText = accessIdentifiers.join(', ') || 'unknown'

  return `This account role/policy is not allowed for member login. Allowed names or IDs: ${MEMBER_ROLE_ALLOWLIST.join(', ')}. Current role/policy identifiers: ${currentAccessText}.`
}

function getErrorMessage(error: unknown, fallbackMessage: string): string {
  return error instanceof Error ? error.message : fallbackMessage
}

function loadStoredSession(): DirectusAuthSession | null {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY)

  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw) as Partial<DirectusAuthSession>

    if (
      typeof parsed.access_token !== 'string' ||
      typeof parsed.refresh_token !== 'string' ||
      typeof parsed.expires !== 'number'
    ) {
      return null
    }

    return {
      access_token: parsed.access_token,
      refresh_token: parsed.refresh_token,
      expires: parsed.expires,
    }
  } catch {
    return null
  }
}

function persistSession(session: DirectusAuthSession | null) {
  if (typeof window === 'undefined') {
    return
  }

  if (!session) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    return
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    siteSettings: null,
    isLoadingSettings: false,
    settingsError: null,
    authSession: null,
    memberProfile: null,
    isAuthLoading: false,
    authError: null,
    isRegistrationLoading: false,
    registrationError: null,
  }),
  getters: {
    clubName: (state) => state.siteSettings?.club_name || APP_NAME_FALLBACK,
    tagline: (state) => state.siteSettings?.tagline || TAGLINE_FALLBACK,
    contactEmail: (state) => state.siteSettings?.contact_email || CONTACT_EMAIL_FALLBACK,
    isAuthenticated: (state) => Boolean(state.authSession?.access_token && state.memberProfile),
    memberDisplayName: (state) => {
      if (!state.memberProfile) {
        return ''
      }

      const firstName = state.memberProfile.first_name?.trim() || ''
      const lastName = state.memberProfile.last_name?.trim() || ''
      const fullName = `${firstName} ${lastName}`.trim()
      const email = state.memberProfile.email?.trim() || ''

      return fullName || email || 'Member'
    },
    memberRoleName: (state) => {
      const memberLabel = getMemberAccessLabel(state.memberProfile)

      if (memberLabel) {
        return memberLabel
      }

      const sessionIdentifiers = getAccessIdentifiersFromSession(state.authSession)
      return sessionIdentifiers[0] || null
    },
  },
  actions: {
    async loadSiteSettings() {
      if (this.isLoadingSettings) {
        return
      }

      this.isLoadingSettings = true
      this.settingsError = null

      try {
        this.siteSettings = await getSiteSettings()
      } catch {
        this.settingsError = 'Unable to load site settings.'
      } finally {
        this.isLoadingSettings = false
      }
    },
    async initializeMemberSession() {
      const storedSession = loadStoredSession()

      if (!storedSession) {
        return
      }

      this.authSession = storedSession
      this.isAuthLoading = true

      try {
        const profile = await getCurrentMemberProfile(storedSession.access_token)
        const accessIdentifiers = combineAccessIdentifiers(profile, storedSession)

        if (!isAccessAllowed(accessIdentifiers)) {
          this.clearAuthState()
          return
        }

        this.memberProfile = profile
      } catch {
        this.clearAuthState()
      } finally {
        this.isAuthLoading = false
      }
    },
    async loginMember(credentials: MemberCredentials) {
      this.isAuthLoading = true
      this.authError = null

      try {
        const session = await loginMemberWithDirectus(credentials.email, credentials.password)
        this.authSession = session
        persistSession(session)

        const profile = await getCurrentMemberProfile(session.access_token)
        const accessIdentifiers = combineAccessIdentifiers(profile, session)

        if (!isAccessAllowed(accessIdentifiers)) {
          await this.logoutMember(false)
          throw new Error(getDeniedAccessErrorMessage(accessIdentifiers))
        }

        this.memberProfile = profile
      } catch (error) {
        this.clearAuthState()
        this.authError = getErrorMessage(error, 'Login failed. Please verify your credentials and try again.')
        throw new Error(this.authError)
      } finally {
        this.isAuthLoading = false
      }
    },
    async logoutMember(invalidateOnServer = true) {
      const refreshToken = this.authSession?.refresh_token

      this.clearAuthState()

      if (!invalidateOnServer || !refreshToken) {
        return
      }

      try {
        await logoutMemberFromDirectus(refreshToken)
      } catch {
        // Ignore logout network errors after local cleanup.
      }
    },
    async registerCurlerAccount(input: CurlerRegistrationInput) {
      this.isRegistrationLoading = true
      this.registrationError = null

      const payload: MemberRegistrationPayload = {
        email: input.email,
        password: input.password,
        first_name: input.firstName || undefined,
        last_name: input.lastName || undefined,
      }

      try {
        await registerMemberWithDirectus(payload)
      } catch (error) {
        this.registrationError = getErrorMessage(
          error,
          'Unable to create your account right now. Please try again.',
        )
        throw new Error(this.registrationError)
      } finally {
        this.isRegistrationLoading = false
      }
    },
    clearAuthState() {
      this.authSession = null
      this.memberProfile = null
      this.authError = null
      this.registrationError = null
      persistSession(null)
    },
  },
})
