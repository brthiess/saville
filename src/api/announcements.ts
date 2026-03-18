import { fetchDirectusItems } from './directus'
import type { Announcement } from '../types'

const ANNOUNCEMENT_FIELDS = ['id', 'title', 'summary', 'date_posted'].join(',')

export async function getAnnouncements(limit = 3): Promise<Announcement[]> {
  return fetchDirectusItems<Announcement>('announcements', {
    fields: ANNOUNCEMENT_FIELDS,
    sort: '-date_posted',
    limit,
  })
}
