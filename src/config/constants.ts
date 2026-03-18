export const APP_NAME_FALLBACK = 'Saville Curling Centre'
export const TAGLINE_FALLBACK = 'Community curling, leagues, and events in Edmonton.'
export const CONTACT_EMAIL_FALLBACK = 'info@savillecurling.ca'

const enforceMemberRoleValue: string = import.meta.env.VITE_DIRECTUS_ENFORCE_MEMBER_ROLE || 'false'
const memberRoleAllowlistSource: string =
  import.meta.env.VITE_DIRECTUS_MEMBER_ROLE_ALLOWLIST || 'Curler,Customer,Member'

export const ENFORCE_MEMBER_ROLE = enforceMemberRoleValue.toLowerCase() === 'true'
export const MEMBER_ROLE_ALLOWLIST: string[] = memberRoleAllowlistSource
  .split(',')
  .map((value: string) => value.trim())
  .filter(Boolean)

export const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Leagues', to: '/leagues' },
  { label: 'Create Account', to: '/create-account' },
  { label: 'Member Login', to: '/member-login' },
] as const

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatDate(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en-CA', {
    dateStyle: 'medium',
  }).format(date)
}

export function formatTime(value: string): string {
  const [hoursText, minutesText = '0'] = value.split(':')
  const hours = Number.parseInt(hoursText, 10)
  const minutes = Number.parseInt(minutesText, 10)

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return value
  }

  const date = new Date()
  date.setHours(hours, minutes, 0, 0)

  return new Intl.DateTimeFormat('en-CA', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}
