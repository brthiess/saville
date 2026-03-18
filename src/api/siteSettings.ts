import { fetchDirectusItems } from './directus'
import type { SiteSettings } from '../types'

const SITE_SETTINGS_FIELDS = ['id', 'club_name', 'tagline', 'contact_email'].join(',')

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const settings = await fetchDirectusItems<SiteSettings>('site_settings', {
    fields: SITE_SETTINGS_FIELDS,
    limit: 1,
  })

  return settings[0] ?? null
}
