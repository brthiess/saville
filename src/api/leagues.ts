import { fetchDirectusItems } from './directus'
import type { League } from '../types'

interface LeagueRecord extends Omit<League, 'price'> {
  price: number | string
}

const LEAGUE_FIELDS = [
  'id',
  'name',
  'description',
  'day_of_week',
  'start_time',
  'skill_level',
  'registration_open',
  'price',
].join(',')

export async function getLeagues(limit?: number): Promise<League[]> {
  const leagues = await fetchDirectusItems<LeagueRecord>('leagues', {
    fields: LEAGUE_FIELDS,
    sort: 'name',
    limit,
  })

  return leagues.map((league) => ({
    ...league,
    price: (() => {
      const numericPrice =
        typeof league.price === 'string' ? Number.parseFloat(league.price) : league.price

      return Number.isFinite(numericPrice) ? numericPrice : 0
    })(),
  }))
}
