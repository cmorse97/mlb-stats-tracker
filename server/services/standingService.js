import supabase from "../utils/supabaseClient.js";

export const getTeamStandings = async () => {
  try {
    const { data, error } = await supabase
      .from("teams")
      .select(
        "team_abv, city, name, wins, losses, division, logo, league, league_abv, streak, runs_scored, runs_allowed, run_diff"
      );

    if (error) {
      console.error("Error fetching standings:", error);
      throw new Error("Failed to fetch standings");
    }

    const formattedStandings = {};

    data.forEach((team) => {
      const league = team.league_abv;
      const division = team.division;

      const wins = parseInt(team.wins, 10);
      const losses = parseInt(team.losses, 10);
      const totalGames = wins + losses;
      const winPercentage = totalGames === 0 ? 0 : wins / totalGames;

      if (!formattedStandings[league]) formattedStandings[league] = {};
      if (!formattedStandings[league][division]) formattedStandings[league][division] = [];

      formattedStandings[league][division].push({
        team_abv: team.team_abv,
        city: team.city,
        name: team.name,
        wins,
        losses,
        logo: team.logo,
        streak: team.streak ?? null,
        winPercentage: winPercentage.toFixed(3),
        runs_scored: team.runs_scored ?? 0,
        runs_allowed: team.runs_allowed ?? 0,
        run_diff: team.run_diff ?? 0,
      });
    });

    // Sort each division by win percentage, then compute GB
    for (const league in formattedStandings) {
      for (const division in formattedStandings[league]) {
        const teams = formattedStandings[league][division];
        teams.sort((a, b) => parseFloat(b.winPercentage) - parseFloat(a.winPercentage));

        const leader = teams[0];
        teams.forEach((team, i) => {
          if (i === 0) {
            team.gamesBack = "-";
          } else {
            const gb = ((leader.wins - team.wins) + (team.losses - leader.losses)) / 2;
            team.gamesBack = gb % 1 === 0 ? gb.toString() : gb.toFixed(1);
          }
        });
      }
    }

    return formattedStandings;
  } catch (error) {
    console.error("Error fetching standings:", error);
    throw new Error("Failed to fetch standings");
  }
};
