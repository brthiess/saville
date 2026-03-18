export interface DirectusRole {
  id: string
  name?: string
}

export interface DirectusPolicy {
  id: string
  name?: string
}

export interface MemberProfile {
  id: string
  email?: string
  first_name?: string | null
  last_name?: string | null
  status?: string
  role: DirectusRole | string | null
  policies?: Array<DirectusPolicy | string> | string | null
}

export interface DirectusAuthSession {
  access_token: string
  refresh_token: string
  expires: number
}

export interface MemberRegistrationPayload {
  email: string
  password: string
  first_name?: string
  last_name?: string
}
