import supabase from '../utils/supabaseClient.js'

const parseStat = (val) => {
  const n = parseFloat(val)
  return isNaN(n) ? -Infinity : n
}

const parseStatLow = (val) => {
  const n = parseFloat(val)
  return isNaN(n) ? Infinity : n
}

const fmt = (player, statKey, statGroup) => ({
  player_id: player.player_id,
  name: player.name,
  avatar: player.avatar,
  team_abv: player.team_abv,
  value: player.stats[statGroup][statKey],
})

const buildLeagueLeaders = (players, isAL) => {
  const qualified = (group) => players.filter((p) => p._league === (isAL ? 'AL' : 'NL') && p.stats?.[group])

  const qualHitters = qualified('Hitting').filter((p) => p._qualifiedHitter)
  const qualPitchers = qualified('Pitching').filter((p) => p._qualifiedPitcher)
  // SV leaders: any pitcher in the league, no IP threshold
  const allPitchers = players.filter((p) => p._league === (isAL ? 'AL' : 'NL') && p.stats?.Pitching)

  const topN = (arr, n = 5) => arr.slice(0, n)

  return {
    hitting: {
      avg:  topN([...qualHitters].sort((a, b) => parseStat(b.stats.Hitting.avg) - parseStat(a.stats.Hitting.avg)).map(p => fmt(p, 'avg', 'Hitting'))),
      hr:   topN([...qualHitters].sort((a, b) => parseStat(b.stats.Hitting.homeRuns) - parseStat(a.stats.Hitting.homeRuns)).map(p => fmt(p, 'homeRuns', 'Hitting'))),
      rbi:  topN([...qualHitters].sort((a, b) => parseStat(b.stats.Hitting.rbi) - parseStat(a.stats.Hitting.rbi)).map(p => fmt(p, 'rbi', 'Hitting'))),
      ops:  topN([...qualHitters].sort((a, b) => parseStat(b.stats.Hitting.ops) - parseStat(a.stats.Hitting.ops)).map(p => fmt(p, 'ops', 'Hitting'))),
      sb:   topN([...qualHitters].sort((a, b) => parseStat(b.stats.Hitting.stolenBases) - parseStat(a.stats.Hitting.stolenBases)).map(p => fmt(p, 'stolenBases', 'Hitting'))),
    },
    pitching: {
      era:  topN([...qualPitchers].sort((a, b) => parseStatLow(a.stats.Pitching.era) - parseStatLow(b.stats.Pitching.era)).map(p => fmt(p, 'era', 'Pitching'))),
      k:    topN([...qualPitchers].sort((a, b) => parseStat(b.stats.Pitching.strikeOuts) - parseStat(a.stats.Pitching.strikeOuts)).map(p => fmt(p, 'strikeOuts', 'Pitching'))),
      whip: topN([...qualPitchers].sort((a, b) => parseStatLow(a.stats.Pitching.whip) - parseStatLow(b.stats.Pitching.whip)).map(p => fmt(p, 'whip', 'Pitching'))),
      w:    topN([...qualPitchers].sort((a, b) => parseStat(b.stats.Pitching.wins) - parseStat(a.stats.Pitching.wins)).map(p => fmt(p, 'wins', 'Pitching'))),
      sv:   topN([...allPitchers].sort((a, b) => parseStat(b.stats.Pitching.saves) - parseStat(a.stats.Pitching.saves)).map(p => fmt(p, 'saves', 'Pitching'))),
    },
  }
}

export const getLeagueLeaders = async () => {
  const [playersRes, teamsRes] = await Promise.all([
    supabase.from('players').select('player_id, name, avatar, team_abv, stats'),
    supabase.from('teams').select('team_abv, league_abv, wins, losses'),
  ])

  if (playersRes.error) throw playersRes.error
  if (teamsRes.error) throw teamsRes.error

  // Build team_abv → league_abv lookup
  const teamLeague = {}
  teamsRes.data.forEach((t) => { teamLeague[t.team_abv] = t.league_abv })

  const avgTeamGames = Math.round(
    teamsRes.data.reduce((sum, t) => sum + parseInt(t.wins) + parseInt(t.losses), 0) /
      teamsRes.data.length
  )

  const hitThreshold = 3.1 * avgTeamGames
  const pitchThreshold = 1.0 * avgTeamGames

  // Annotate each player with league and qualification flags
  const players = playersRes.data.map((p) => ({
    ...p,
    _league: teamLeague[p.team_abv] ?? null,
    _qualifiedHitter: (() => {
      const h = p.stats?.Hitting
      if (!h) return false
      return parseStat(h.atBats) + parseStat(h.baseOnBalls) >= hitThreshold
    })(),
    _qualifiedPitcher: (() => {
      const pit = p.stats?.Pitching
      if (!pit) return false
      return parseFloat(pit.inningsPitched) >= pitchThreshold
    })(),
  }))

  return {
    avgTeamGames,
    qualificationThresholds: { hitters: hitThreshold, pitchers: pitchThreshold },
    AL: buildLeagueLeaders(players, true),
    NL: buildLeagueLeaders(players, false),
  }
}
