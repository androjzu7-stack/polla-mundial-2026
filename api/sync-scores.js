import { createClient } from '@supabase/supabase-js'

// Maps football-data.org English names → Spanish names used in the DB
const TEAM_MAP = {
  'Mexico': 'México',
  'Jamaica': 'Jamaica',
  'Honduras': 'Honduras',
  'Kazakhstan': 'Kazajistán',
  'Brazil': 'Brasil',
  'Morocco': 'Marruecos',
  'Croatia': 'Croacia',
  'Cameroon': 'Camerún',
  'Spain': 'España',
  'Serbia': 'Serbia',
  'Estonia': 'Estonia',
  'Bolivia': 'Bolivia',
  'Argentina': 'Argentina',
  'Chile': 'Chile',
  'Peru': 'Perú',
  'New Zealand': 'Nueva Zelanda',
  'France': 'Francia',
  'Denmark': 'Dinamarca',
  'South Africa': 'Sudáfrica',
  'Saudi Arabia': 'Arabia Saudita',
  'Germany': 'Alemania',
  'Netherlands': 'Países Bajos',
  'Scotland': 'Escocia',
  'Paraguay': 'Paraguay',
  'Portugal': 'Portugal',
  'Turkey': 'Turquía',
  'Türkiye': 'Turquía',
  'Uzbekistan': 'Uzbekistán',
  'Guinea': 'Guinea',
  'Colombia': 'Colombia',
  'Ecuador': 'Ecuador',
  'Venezuela': 'Venezuela',
  'Iraq': 'Irak',
  'Uruguay': 'Uruguay',
  'Canada': 'Canadá',
  'Iran': 'Irán',
  'Togo': 'Togo',
  'Belgium': 'Bélgica',
  'Italy': 'Italia',
  'Slovakia': 'Eslovaquia',
  'Costa Rica': 'Costa Rica',
  'England': 'Inglaterra',
  'Senegal': 'Senegal',
  'Ghana': 'Ghana',
  'Guatemala': 'Guatemala',
  'United States': 'EE.UU.',
  'USA': 'EE.UU.',
  'Panama': 'Panamá',
  "Côte d'Ivoire": 'Costa de Marfil',
  'Ivory Coast': 'Costa de Marfil',
  'Algeria': 'Argelia',
}

function mapStatus(apiStatus) {
  if (apiStatus === 'FINISHED') return 'finished'
  if (apiStatus === 'IN_PLAY' || apiStatus === 'PAUSED') return 'live'
  return 'scheduled'
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify secret token
  const auth = req.headers.authorization
  if (!auth || auth !== `Bearer ${process.env.SYNC_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    // Fetch live and finished matches from football-data.org
    const apiRes = await fetch(
      'https://api.football-data.org/v4/competitions/WC/matches?status=IN_PLAY,PAUSED,FINISHED',
      { headers: { 'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY } }
    )

    if (!apiRes.ok) {
      const text = await apiRes.text()
      return res.status(502).json({ error: 'football-data.org error', detail: text })
    }

    const { matches: apiMatches } = await apiRes.json()

    // Only process matches finished in the last 4 hours or currently live
    const now = Date.now()
    const relevant = apiMatches.filter(m => {
      if (m.status === 'IN_PLAY' || m.status === 'PAUSED') return true
      if (m.status === 'FINISHED') {
        const matchTime = new Date(m.utcDate).getTime()
        return (now - matchTime) < 4 * 60 * 60 * 1000
      }
      return false
    })

    if (relevant.length === 0) {
      return res.status(200).json({ message: 'No live or recent matches', processed: 0 })
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const results = []

    for (const match of relevant) {
      const homeEs = TEAM_MAP[match.homeTeam.name]
      const awayEs = TEAM_MAP[match.awayTeam.name]

      if (!homeEs || !awayEs) {
        results.push({ skipped: `${match.homeTeam.name} vs ${match.awayTeam.name} (no mapping)` })
        continue
      }

      const status = mapStatus(match.status)
      const homeScore = match.score?.fullTime?.home ?? null
      const awayScore = match.score?.fullTime?.away ?? null

      const { data, error } = await supabase
        .from('matches')
        .update({ status, home_score: homeScore, away_score: awayScore })
        .eq('home_team', homeEs)
        .eq('away_team', awayEs)
        .select('id')
        .single()

      if (error) {
        results.push({ error: error.message, match: `${homeEs} vs ${awayEs}` })
        continue
      }

      // Recalculate points when match finishes
      if (status === 'finished' && data?.id) {
        await supabase.rpc('recalculate_points_for_match', { p_match_id: data.id })
      }

      results.push({ updated: `${homeEs} vs ${awayEs}`, score: `${homeScore}-${awayScore}`, status })
    }

    return res.status(200).json({ processed: relevant.length, results })

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
