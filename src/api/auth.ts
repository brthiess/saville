import { directusRequest } from './directus'
import type { DirectusAuthSession, MemberProfile, MemberRegistrationPayload } from '../types'

interface DirectusDataResponse<T> {
  data: T
}

const MEMBER_PROFILE_FIELDS = [
  'id',
  'email',
  'first_name',
  'last_name',
  'status',
  'role',
  'role.id',
  'role.name',
  'policies',
  'policies.id',
  'policies.name',
].join(',')

export async function loginMemberWithDirectus(
  email: string,
  password: string,
): Promise<DirectusAuthSession> {
  const payload = await directusRequest<DirectusDataResponse<DirectusAuthSession>>('auth/login', {
    method: 'POST',
    body: {
      email,
      password,
      mode: 'json',
    },
    fallbackErrorMessage: 'Unable to sign in',
  })

  return payload.data
}

export async function getCurrentMemberProfile(accessToken: string): Promise<MemberProfile> {
  const payload = await directusRequest<DirectusDataResponse<MemberProfile>>('users/me', {
    params: {
      fields: MEMBER_PROFILE_FIELDS,
    },
    token: accessToken,
    fallbackErrorMessage: 'Unable to load member profile',
  })

  return payload.data
}

export async function logoutMemberFromDirectus(refreshToken: string): Promise<void> {
  await directusRequest<void>('auth/logout', {
    method: 'POST',
    body: {
      refresh_token: refreshToken,
      mode: 'json',
    },
    fallbackErrorMessage: 'Unable to sign out',
  })
}

export async function registerMemberWithDirectus(payload: MemberRegistrationPayload): Promise<void> {
  await directusRequest<void>('users/register', {
    method: 'POST',
    body: payload,
    fallbackErrorMessage: 'Unable to create account',
  })
}
