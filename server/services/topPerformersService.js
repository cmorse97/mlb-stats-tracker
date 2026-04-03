import supabase from '../utils/supabaseClient.js';

const parseStat = (val) => {
  const num = parseFloat(val);
  return isNaN(num) ? -Infinity : num;
};

const parseStatLowIsBetter = (val) => {
  const num = parseFloat(val);
  return isNaN(num) ? Infinity : num;
};

export const getTopPerformersByTeamAbv = async (teamAbv) => {
  // Fetch roster
  const { data: players, error } = await supabase
    .from('players')
    .select('*')
    .eq('team_abv', teamAbv);

  if (error) throw error;

  // Each key holds the full player object currently leading that stat category
  const hittingLeaders = {
    hitsLeader: null,
    hrLeader: null,
    rbiLeader: null,
    avgLeader: null,
    opsLeader: null,
    slgLeader: null,
  };

  const pitchingLeaders = {
    winsLeader: null,
    eraLeader: null,
    strikeoutsLeader: null,
    savesLeader: null,
    whipLeader: null,
    walksLeader: null,
  };

  players.forEach((player) => {
    const hittingStat = player.stats?.Hitting;
    const pitchingStat = player.stats?.Pitching;

    // Hitter: Hits, HR, RBI, AVG, OPS, SLG
    if (hittingStat) {
      if (
        !hittingLeaders.hitsLeader ||
        parseStat(hittingStat.hits) >
          parseStat(hittingLeaders.hitsLeader.stats.Hitting.hits)
      )
        hittingLeaders.hitsLeader = player;

      if (
        !hittingLeaders.hrLeader ||
        parseStat(hittingStat.homeRuns) >
          parseStat(hittingLeaders.hrLeader.stats.Hitting.homeRuns)
      )
        hittingLeaders.hrLeader = player;

      if (
        !hittingLeaders.rbiLeader ||
        parseStat(hittingStat.rbi) >
          parseStat(hittingLeaders.rbiLeader.stats.Hitting.rbi)
      )
        hittingLeaders.rbiLeader = player;

      if (
        !hittingLeaders.avgLeader ||
        parseStat(hittingStat.avg) >
          parseStat(hittingLeaders.avgLeader.stats.Hitting.avg)
      )
        hittingLeaders.avgLeader = player;

      if (
        !hittingLeaders.opsLeader ||
        parseStat(hittingStat.ops) >
          parseStat(hittingLeaders.opsLeader.stats.Hitting.ops)
      )
        hittingLeaders.opsLeader = player;

      if (
        !hittingLeaders.slgLeader ||
        parseStat(hittingStat.slg) >
          parseStat(hittingLeaders.slgLeader.stats.Hitting.slg)
      )
        hittingLeaders.slgLeader = player;
    }

    // Pitcher: Wins, ERA (lower), SO, Saves, WHIP (lower), BB (lower)
    if (pitchingStat) {
      if (
        !pitchingLeaders.winsLeader ||
        parseStat(pitchingStat.wins) >
          parseStat(pitchingLeaders.winsLeader.stats.Pitching.wins)
      )
        pitchingLeaders.winsLeader = player;

      if (
        !pitchingLeaders.eraLeader ||
        parseStatLowIsBetter(pitchingStat.era) <
          parseStatLowIsBetter(pitchingLeaders.eraLeader.stats.Pitching.era)
      )
        pitchingLeaders.eraLeader = player;

      if (
        !pitchingLeaders.strikeoutsLeader ||
        parseStat(pitchingStat.strikeOuts) >
          parseStat(pitchingLeaders.strikeoutsLeader.stats.Pitching.strikeOuts)
      )
        pitchingLeaders.strikeoutsLeader = player;

      if (
        !pitchingLeaders.savesLeader ||
        parseStat(pitchingStat.saves) >
          parseStat(pitchingLeaders.savesLeader.stats.Pitching.saves)
      )
        pitchingLeaders.savesLeader = player;

      if (
        !pitchingLeaders.whipLeader ||
        parseStatLowIsBetter(pitchingStat.whip) <
          parseStatLowIsBetter(pitchingLeaders.whipLeader.stats.Pitching.whip)
      )
        pitchingLeaders.whipLeader = player;

      if (
        !pitchingLeaders.walksLeader ||
        parseStatLowIsBetter(pitchingStat.baseOnBalls) <
          parseStatLowIsBetter(
            pitchingLeaders.walksLeader.stats.Pitching.baseOnBalls,
          )
      )
        pitchingLeaders.walksLeader = player;
    }
  });

  // Guard: ensure we found at least one player for each category
  const missingHitter = Object.entries(hittingLeaders).find(
    ([, v]) => v === null,
  );
  const missingPitcher = Object.entries(pitchingLeaders).find(
    ([, v]) => v === null,
  );
  if (missingHitter)
    throw new Error(`No hitter found for stat: ${missingHitter[0]}`);
  if (missingPitcher)
    throw new Error(`No pitcher found for stat: ${missingPitcher[0]}`);

  // Return formatted
  return {
    hitters: [
      {
        player_id: hittingLeaders.hitsLeader.player_id,
        name: hittingLeaders.hitsLeader.name,
        avatar: hittingLeaders.hitsLeader.avatar,
        stat: 'Hits',
        value: hittingLeaders.hitsLeader.stats?.Hitting.hits,
      },
      {
        player_id: hittingLeaders.hrLeader.player_id,
        name: hittingLeaders.hrLeader.name,
        avatar: hittingLeaders.hrLeader.avatar,
        stat: 'HR',
        value: hittingLeaders.hrLeader.stats?.Hitting.homeRuns,
      },
      {
        player_id: hittingLeaders.rbiLeader.player_id,
        name: hittingLeaders.rbiLeader.name,
        avatar: hittingLeaders.rbiLeader.avatar,
        stat: 'RBI',
        value: hittingLeaders.rbiLeader.stats?.Hitting.rbi,
      },
      {
        player_id: hittingLeaders.avgLeader.player_id,
        name: hittingLeaders.avgLeader.name,
        avatar: hittingLeaders.avgLeader.avatar,
        stat: 'AVG',
        value: hittingLeaders.avgLeader.stats?.Hitting.avg,
      },
      {
        player_id: hittingLeaders.opsLeader.player_id,
        name: hittingLeaders.opsLeader.name,
        avatar: hittingLeaders.opsLeader.avatar,
        stat: 'OPS',
        value: hittingLeaders.opsLeader.stats?.Hitting.ops,
      },
      {
        player_id: hittingLeaders.slgLeader.player_id,
        name: hittingLeaders.slgLeader.name,
        avatar: hittingLeaders.slgLeader.avatar,
        stat: 'SLG',
        value: hittingLeaders.slgLeader.stats?.Hitting.slg,
      },
    ],
    pitchers: [
      {
        player_id: pitchingLeaders.winsLeader.player_id,
        name: pitchingLeaders.winsLeader.name,
        avatar: pitchingLeaders.winsLeader.avatar,
        stat: 'Wins',
        value: pitchingLeaders.winsLeader.stats?.Pitching.wins,
      },
      {
        player_id: pitchingLeaders.eraLeader.player_id,
        name: pitchingLeaders.eraLeader.name,
        avatar: pitchingLeaders.eraLeader.avatar,
        stat: 'ERA',
        value: pitchingLeaders.eraLeader.stats?.Pitching.era,
      },
      {
        player_id: pitchingLeaders.strikeoutsLeader.player_id,
        name: pitchingLeaders.strikeoutsLeader.name,
        avatar: pitchingLeaders.strikeoutsLeader.avatar,
        stat: 'SO',
        value: pitchingLeaders.strikeoutsLeader.stats?.Pitching.strikeOuts,
      },
      {
        player_id: pitchingLeaders.savesLeader.player_id,
        name: pitchingLeaders.savesLeader.name,
        avatar: pitchingLeaders.savesLeader.avatar,
        stat: 'Saves',
        value: pitchingLeaders.savesLeader.stats?.Pitching.saves,
      },
      {
        player_id: pitchingLeaders.whipLeader.player_id,
        name: pitchingLeaders.whipLeader.name,
        avatar: pitchingLeaders.whipLeader.avatar,
        stat: 'WHIP',
        value: pitchingLeaders.whipLeader.stats?.Pitching.whip,
      },
      {
        player_id: pitchingLeaders.walksLeader.player_id,
        name: pitchingLeaders.walksLeader.name,
        avatar: pitchingLeaders.walksLeader.avatar,
        stat: 'BB',
        value: pitchingLeaders.walksLeader.stats?.Pitching.baseOnBalls,
      },
    ],
  };
};
