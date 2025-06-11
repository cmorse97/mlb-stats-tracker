import supabase from "../utils/supabaseClient.js";

export const getTeamStandings = async () => {
  try {
    const { data, error } = await supabase
      .from("teams")
      .select(
        "team_abv, city, name, wins, losses, division, logo, league, league_abv"
      );

    if (error) {
      console.error("Error fetching standings:", error);
      throw new Error("Failed to fetch standings");
    }

    const formattedStandings = {};

    data.forEach((team) => {
      const league = team.league_abv;
      const division = team.division;

      // Convert wins/losses from strings to integers
      const wins = parseInt(team.wins, 10);
      const losses = parseInt(team.losses, 10);
      const totalGames = wins + losses;

      const winPercentage = totalGames === 0 ? 0 : wins / totalGames;

      if (!formattedStandings[league]) {
        formattedStandings[league] = {};
      }

      if (!formattedStandings[league][division]) {
        formattedStandings[league][division] = [];
      }

      formattedStandings[league][division].push({
        team_abv: team.team_abv,
        city: team.city,
        name: team.name,
        wins: team.wins,
        losses: team.losses,
        logo: team.logo,
        winPercentage: winPercentage.toFixed(3), // Convert to string for consistency
      });
    });

    // Sort teams in each division by winPercentage (converted back to float for accurate sorting)
    for (const league in formattedStandings) {
      for (const division in formattedStandings[league]) {
        formattedStandings[league][division].sort(
          (a, b) => parseFloat(b.winPercentage) - parseFloat(a.winPercentage)
        );
      }
    }

    return formattedStandings;
  } catch (error) {
    console.error("Error fetching standings:", error);
    throw new Error("Failed to fetch standings");
  }
};
