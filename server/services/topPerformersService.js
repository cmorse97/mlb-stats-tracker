import supabase from "../utils/supabaseClient.js";

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
    .from("players")
    .select("*")
    .eq("team_abv", teamAbv);

  if (error) throw error;

  // Stat logic
  const hitters = {
    hits: null,
    hr: null,
    rbi: null,
    avg: null,
    ops: null,
    slg: null,
  };

  const pitchers = {
    wins: null,
    era: null,
    strikeouts: null,
    saves: null,
    whip: null,
    walks: null,
  };

  players.forEach((player) => {
    const hitting = player.stats?.Hitting;
    const pitching = player.stats?.Pitching;

    // Hitter: Hits (H), HR, RBI, avg, OPS, SLG
    if (hitting) {
      if (
        !hitters.hits ||
        parseStat(hitting.H) > parseStat(hitters.hits.stats.Hitting.H)
      )
        hitters.hits = player;

      if (
        !hitters.hr ||
        parseStat(hitting.HR) > parseStat(hitters.hr.stats.Hitting.HR)
      )
        hitters.hr = player;

      if (
        !hitters.rbi ||
        parseStat(hitting.RBI) > parseStat(hitters.rbi.stats.Hitting.RBI)
      )
        hitters.rbi = player;

      if (
        !hitters.avg ||
        parseStat(hitting.avg) > parseStat(hitters.avg.stats.Hitting.avg)
      )
        hitters.avg = player;
      if (
        !hitters.ops ||
        parseStat(hitting.OPS) > parseStat(hitters.ops.stats.Hitting.OPS)
      )
        hitters.ops = player;
      if (
        !hitters.slg ||
        parseStat(hitting.SLG) > parseStat(hitters.slg.stats.Hitting.SLG)
      )
        hitters.slg = player;
    }

    // Pitcher: Wins, ERA (lower), SO, Save, WHIP (lower), BB (lower)
    if (pitching) {
      if (
        !pitchers.wins ||
        parseStat(pitching.Win) > parseStat(pitchers.wins.stats.Pitching.Win)
      )
        pitchers.wins = player;

      if (
        !pitchers.era ||
        parseStatLowIsBetter(pitching.ERA) <
          parseStatLowIsBetter(pitchers.era.stats.Pitching.ERA)
      )
        pitchers.era = player;

      if (
        !pitchers.strikeouts ||
        parseStat(pitching.SO) >
          parseStat(pitchers.strikeouts.stats.Pitching.SO)
      )
        pitchers.strikeouts = player;

      if (
        !pitchers.saves ||
        parseStat(pitching.Save) > parseStat(pitchers.saves.stats.Pitching.Save)
      )
        pitchers.saves = player;

      if (
        !pitchers.whip ||
        parseStatLowIsBetter(pitching.WHIP) <
          parseStatLowIsBetter(pitchers.whip.stats.Pitching.WHIP)
      )
        pitchers.whip = player;
      if (
        !pitchers.walks ||
        parseStatLowIsBetter(pitching.BB) <
          parseStatLowIsBetter(pitchers.walks.stats.Pitching.BB)
      )
        pitchers.walks = player;
    }
  });

  // Return formatted
  return {
    hitters: [
      {
        player_id: hitters.hits.player_id,
        name: hitters.hits.name,
        avatar: hitters.hits.avatar,
        stat: "Hits",
        value: hitters.hits.stats.Hitting.H,
      },
      {
        player_id: hitters.hr.player_id,
        name: hitters.hr.name,
        avatar: hitters.hr.avatar,
        stat: "HR",
        value: hitters.hr.stats.Hitting.HR,
      },
      {
        player_id: hitters.rbi.player_id,
        name: hitters.rbi.name,
        avatar: hitters.rbi.avatar,
        stat: "RBI",
        value: hitters.rbi.stats.Hitting.RBI,
      },
      {
        player_id: hitters.avg.player_id,
        name: hitters.avg.name,
        avatar: hitters.avg.avatar,
        stat: "AVG",
        value: hitters.avg.stats.Hitting.avg,
      },
      {
        player_id: hitters.ops.player_id,
        name: hitters.ops.name,
        avatar: hitters.ops.avatar,
        stat: "OPS",
        value: hitters.ops.stats.Hitting.OPS,
      },
      {
        player_id: hitters.slg.player_id,
        name: hitters.slg.name,
        avatar: hitters.slg.avatar,
        stat: "SLG",
        value: hitters.slg.stats.Hitting.SLG,
      },
    ],
    pitchers: [
      {
        player_id: pitchers.wins.player_id,
        name: pitchers.wins.name,
        avatar: pitchers.wins.avatar,
        stat: "Wins",
        value: pitchers.wins.stats.Pitching.Win,
      },
      {
        player_id: pitchers.era.player_id,
        name: pitchers.era.name,
        avatar: pitchers.era.avatar,
        stat: "ERA",
        value: pitchers.era.stats.Pitching.ERA,
      },
      {
        player_id: pitchers.strikeouts.player_id,
        name: pitchers.strikeouts.name,
        avatar: pitchers.strikeouts.avatar,
        stat: "SO",
        value: pitchers.strikeouts.stats.Pitching.SO,
      },
      {
        player_id: pitchers.saves.player_id,
        name: pitchers.saves.name,
        avatar: pitchers.saves.avatar,
        stat: "Saves",
        value: pitchers.saves.stats.Pitching.Save,
      },
      {
        player_id: pitchers.whip.player_id,
        name: pitchers.whip.name,
        avatar: pitchers.whip.avatar,
        stat: "WHIP",
        value: pitchers.whip.stats.Pitching.WHIP,
      },
      {
        player_id: pitchers.walks.player_id,
        name: pitchers.walks.name,
        avatar: pitchers.walks.avatar,
        stat: "BB",
        value: pitchers.walks.stats.Pitching.BB,
      },
    ],
  };
};
