import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTeamByTeamAbv } from "../services/api";

const TeamStats = () => {
  const [teamData, setTeamData] = useState({});
  const { teamAbv } = useParams();

  useEffect(() => {
    const fetchTeamData = async (teamAbv) => {
      try {
        const response = await fetchTeamByTeamAbv(teamAbv);
        if (response !== null) setTeamData(response);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };

    fetchTeamData(teamAbv);
  }, [teamAbv]);

  const {
    city,
    name,
    runs_allowed,
    runs_scored,
    logo,
    league_abv,
    division,
    wins,
    losses,
  } = teamData;

  if (!teamData || Object.keys(teamData).length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="w-10 h-10 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl px-4 mx-auto my-6">
      <div className="grid items-center justify-center grid-cols-1 gap-4 md:grid-cols-3">
        {/* Team Logo */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt={`${city} ${name}`}
            className="w-4/5 max-w-[200px] object-contain"
          />
        </div>

        {/* Team Info */}
        <div className="flex flex-col items-center py-4 text-center">
          <h2 className="mb-1 text-2xl font-semibold">
            {city} {name}
          </h2>
          <h3 className="mb-2 text-lg text-gray-500">
            {league_abv} {division}
          </h3>
          <p className="text-base font-medium">
            ({wins} - {losses})
          </p>
        </div>

        {/* Team Stats */}
        <div className="flex flex-col items-center py-4 text-center">
          <h2 className="mb-2 text-2xl font-semibold">Team Stats</h2>
          <p className="text-base">
            Runs Scored: <strong>{runs_scored}</strong>
          </p>
          <p className="text-base">
            Runs Allowed: <strong>{runs_allowed}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamStats;
