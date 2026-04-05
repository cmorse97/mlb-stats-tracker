import supabase from '../utils/supabaseClient.js';

const parseStat = (val) => {
  const num = parseFloat(val);
  return isNaN(num) ? -Infinity : num;
};

const parseStatLowIsBetter = (val) => {
  const num = parseFloat(val);
  return isNaN(num) ? Infinity : num;
};

const fmt = (player, stat, value) =>
  player
    ? { player_id: player.player_id, name: player.name, avatar: player.avatar, stat, value }
    : null;

export const getTopPerformersByTeamAbv = async (teamAbv) => {
  const [playersRes, teamsRes] = await Promise.all([
    supabase.from('players').select('*').eq('team_abv', teamAbv),
    supabase.from('teams').select('wins, losses'),
  ]);

  if (playersRes.error) throw playersRes.error;
  if (teamsRes.error) throw teamsRes.error;

  const avgTeamGames = Math.round(
    teamsRes.data.reduce((sum, t) => sum + parseInt(t.wins) + parseInt(t.losses), 0) /
      teamsRes.data.length
  );

  const hitThreshold = 3.1 * avgTeamGames;
  const pitchThreshold = 1.0 * avgTeamGames;

  const players = playersRes.data;

  const qualHitters = players.filter((p) => {
    const h = p.stats?.Hitting;
    return h && parseStat(h.atBats) + parseStat(h.baseOnBalls) >= hitThreshold;
  });

  const qualPitchers = players.filter((p) => {
    const pit = p.stats?.Pitching;
    return pit && parseFloat(pit.inningsPitched) >= pitchThreshold;
  });

  // Saves: no IP threshold (same as league leaders)
  const allPitchers = players.filter((p) => p.stats?.Pitching);

  const best = (arr, compareFn) => arr.reduce((leader, p) => compareFn(p, leader) ? p : leader, arr[0] ?? null);

  const hittingLeaders = {
    hitsLeader:   best(qualHitters, (p, l) => !l || parseStat(p.stats.Hitting.hits)      > parseStat(l.stats.Hitting.hits)),
    hrLeader:     best(qualHitters, (p, l) => !l || parseStat(p.stats.Hitting.homeRuns)   > parseStat(l.stats.Hitting.homeRuns)),
    rbiLeader:    best(qualHitters, (p, l) => !l || parseStat(p.stats.Hitting.rbi)        > parseStat(l.stats.Hitting.rbi)),
    avgLeader:    best(qualHitters, (p, l) => !l || parseStat(p.stats.Hitting.avg)        > parseStat(l.stats.Hitting.avg)),
    opsLeader:    best(qualHitters, (p, l) => !l || parseStat(p.stats.Hitting.ops)        > parseStat(l.stats.Hitting.ops)),
    slgLeader:    best(qualHitters, (p, l) => !l || parseStat(p.stats.Hitting.slg)        > parseStat(l.stats.Hitting.slg)),
  };

  const pitchingLeaders = {
    winsLeader:        best(qualPitchers, (p, l) => !l || parseStat(p.stats.Pitching.wins)            > parseStat(l.stats.Pitching.wins)),
    eraLeader:         best(qualPitchers, (p, l) => !l || parseStatLowIsBetter(p.stats.Pitching.era)  < parseStatLowIsBetter(l.stats.Pitching.era)),
    strikeoutsLeader:  best(qualPitchers, (p, l) => !l || parseStat(p.stats.Pitching.strikeOuts)      > parseStat(l.stats.Pitching.strikeOuts)),
    savesLeader:       best(allPitchers,  (p, l) => !l || parseStat(p.stats.Pitching.saves)           > parseStat(l.stats.Pitching.saves)),
    whipLeader:        best(qualPitchers, (p, l) => !l || parseStatLowIsBetter(p.stats.Pitching.whip) < parseStatLowIsBetter(l.stats.Pitching.whip)),
    walksLeader:       best(qualPitchers, (p, l) => !l || parseStatLowIsBetter(p.stats.Pitching.baseOnBalls) < parseStatLowIsBetter(l.stats.Pitching.baseOnBalls)),
  };

  return {
    hitters: [
      fmt(hittingLeaders.hitsLeader,  'Hits', hittingLeaders.hitsLeader?.stats?.Hitting.hits),
      fmt(hittingLeaders.hrLeader,    'HR',   hittingLeaders.hrLeader?.stats?.Hitting.homeRuns),
      fmt(hittingLeaders.rbiLeader,   'RBI',  hittingLeaders.rbiLeader?.stats?.Hitting.rbi),
      fmt(hittingLeaders.avgLeader,   'AVG',  hittingLeaders.avgLeader?.stats?.Hitting.avg),
      fmt(hittingLeaders.opsLeader,   'OPS',  hittingLeaders.opsLeader?.stats?.Hitting.ops),
      fmt(hittingLeaders.slgLeader,   'SLG',  hittingLeaders.slgLeader?.stats?.Hitting.slg),
    ],
    pitchers: [
      fmt(pitchingLeaders.winsLeader,       'Wins',  pitchingLeaders.winsLeader?.stats?.Pitching.wins),
      fmt(pitchingLeaders.eraLeader,        'ERA',   pitchingLeaders.eraLeader?.stats?.Pitching.era),
      fmt(pitchingLeaders.strikeoutsLeader, 'SO',    pitchingLeaders.strikeoutsLeader?.stats?.Pitching.strikeOuts),
      fmt(pitchingLeaders.savesLeader,      'Saves', pitchingLeaders.savesLeader?.stats?.Pitching.saves),
      fmt(pitchingLeaders.whipLeader,       'WHIP',  pitchingLeaders.whipLeader?.stats?.Pitching.whip),
      fmt(pitchingLeaders.walksLeader,      'BB',    pitchingLeaders.walksLeader?.stats?.Pitching.baseOnBalls),
    ],
  };
};
