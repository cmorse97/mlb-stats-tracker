import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStandings } from "../services/api.js";
import Loading from "../components/Loading.jsx";

const DIVISION_ORDER = ["East", "Central", "West"];
const divisionSortOrder = { East: 0, Central: 1, West: 2 };

const sortDivisions = (divs) =>
  [...divs].sort((a, b) => {
    const aKey = a.split(" ").pop();
    const bKey = b.split(" ").pop();
    return (divisionSortOrder[aKey] ?? 9) - (divisionSortOrder[bKey] ?? 9);
  });

const shortDivName = (fullName) => fullName.split(" ").pop();

const StreakBadge = ({ streak }) => {
  if (!streak) return <span className="text-gray-300">—</span>;
  const isWin = streak.startsWith("W");
  return (
    <span className={`font-semibold ${isWin ? "text-green-600" : "text-red-500"}`}>
      {streak}
    </span>
  );
};

const DivisionSection = ({ division, teams }) => {
  const navigate = useNavigate();
  return (
    <div className="mb-2 last:mb-0">
      <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400 px-4 py-1.5 bg-gray-50 border-b border-gray-100">
        {division}
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-[10px] font-bold tracking-wider text-gray-400 uppercase border-b border-gray-100 bg-white">
            <th className="text-left py-2 pl-4 pr-2 font-medium w-48">Team</th>
            <th className="text-center py-2 px-2 font-medium w-10">W</th>
            <th className="text-center py-2 px-2 font-medium w-10">L</th>
            <th className="text-center py-2 px-2 font-medium w-14">PCT</th>
            <th className="text-center py-2 px-2 font-medium w-10">GB</th>
            <th className="text-center py-2 px-2 font-medium w-12">STK</th>
            <th className="text-center py-2 px-2 font-medium w-12">RS</th>
            <th className="text-center py-2 px-2 font-medium w-12">RA</th>
            <th className="text-center py-2 pr-4 pl-2 font-medium w-14">DIFF</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {teams.map((team, i) => {
            const diff = team.run_diff;
            const diffDisplay = diff > 0 ? `+${diff}` : diff;
            return (
              <tr
                key={team.team_abv}
                onClick={() => navigate(`/teams/${team.team_abv}`)}
                className={`hover:bg-blue-50 cursor-pointer transition-colors ${
                  i === 0 ? "font-semibold" : ""
                }`}
              >
                <td className="py-2 pl-4 pr-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-6 h-6 object-contain shrink-0"
                    />
                    <span className="text-gray-800">
                      {team.city} {team.name}
                    </span>
                  </div>
                </td>
                <td className="text-center py-2 px-2 text-gray-700">{team.wins}</td>
                <td className="text-center py-2 px-2 text-gray-700">{team.losses}</td>
                <td className="text-center py-2 px-2 text-gray-500">{team.winPercentage}</td>
                <td className="text-center py-2 px-2 text-gray-500">{team.gamesBack}</td>
                <td className="text-center py-2 px-2">
                  <StreakBadge streak={team.streak} />
                </td>
                <td className="text-center py-2 px-2 text-gray-500">{team.runs_scored}</td>
                <td className="text-center py-2 px-2 text-gray-500">{team.runs_allowed}</td>
                <td className={`text-center py-2 pr-4 pl-2 font-medium ${
                  diff > 0 ? "text-green-600" : diff < 0 ? "text-red-500" : "text-gray-500"
                }`}>
                  {diffDisplay}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Standings = () => {
  const [standings, setStandings] = useState(null);
  const [activeLeague, setActiveLeague] = useState("AL");

  useEffect(() => {
    fetchStandings().then((data) => {
      if (data) setStandings(data);
    });
  }, []);

  if (!standings) return <Loading />;

  const divisionKeys = sortDivisions(Object.keys(standings[activeLeague] ?? {}));

  return (
    <div className="max-w-screen-lg px-4 mx-auto my-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800">MLB Standings</h1>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        {/* League tabs */}
        <div className="flex border-b border-gray-100 px-4">
          {["AL", "NL"].map((league) => (
            <button
              key={league}
              onClick={() => setActiveLeague(league)}
              className={`text-sm font-bold px-4 py-3 -mb-px border-b-2 transition-colors ${
                activeLeague === league
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {league === "AL" ? "American League" : "National League"}
            </button>
          ))}
        </div>

        {/* Divisions */}
        {divisionKeys.map((divKey) => {
          const teams = standings[activeLeague][divKey];
          if (!teams) return null;
          return (
            <DivisionSection
              key={divKey}
              division={shortDivName(divKey)}
              teams={teams}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Standings;
