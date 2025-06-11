// const Standings = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <h2 className="text-4xl font-semibold">Coming Soon...</h2>
//     </div>
//   );
// };

// export default Standings;

// Display standings data in a table format
// Show: each league (AL, NL) as columns, within those columns, show divisions (East, Central, West) as rows, and within those rows, show teams with their logo, name, win-loss record, and win percentage
// Use Tailwind CSS for styling and layout: Maintain a clean and responsive design, with a focus on readability
// The data being fetched from the API is structured as follows:
// standings = {
//   AL: {
//     East: [
//             { team data...}, { team data... }, ...
//     ],
//     Central: [
//             { team data...}, { team data... }, ...
//     ],
//     West: [
//             { team data...}, { team data... }, ...
//     ]
//   },
//   NL: {
//     East: [
//             { team data...}, { team data... }, ...
//     ],
//     Central: [
//             { team data...}, { team data... }, ...
//     ],
//     West: [
//             { team data...}, { team data... }, ...
//     ]
//   }
//  team data structure:
//   {
//      "team_abv": "LAD",
//      "city": "Los Angeles",
//      "name": "Dodgers",
//      "wins": "40",
//      "losses": "27",
//      "logo": "https://www.mlbstatic.com/team-logos/team-cap-on-light/119.svg",
//      "winPercentage": "0.597"
//   }

import { useEffect, useState } from "react";
import { fetchStandings } from "../services/api.js";
import { useNavigate } from "react-router-dom";

const Standings = () => {
  const [standings, setStandings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStandingsData = async () => {
      try {
        const response = await fetchStandings();
        if (response) {
          setStandings(response);
        } else {
          console.error("No standings data available");
        }
      } catch (error) {
        console.error("Error fetching standings:", error);
      }
    };

    fetchStandingsData();
  }, []);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">MLB Standings</h1>
      {Object.keys(standings).length === 0 ? (
        <div className="flex items-center justify-center min-h-screen">
          <h2 className="text-4xl font-semibold">Loading...</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Object.entries(standings).map(([league, divisions]) => (
            <div key={league} className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-xl font-semibold">
                {league === "AL" ? "American League" : "National League"}
              </h2>
              {Object.entries(divisions).map(([division, teams]) => (
                <div key={division} className="mb-6">
                  <h3 className="mb-2 text-lg font-semibold">{division}</h3>
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-center border-b">Logo</th>
                        <th className="px-4 py-2 text-center border-b">Team</th>
                        <th className="px-4 py-2 text-center border-b">Wins</th>
                        <th className="px-4 py-2 text-center border-b">
                          Losses
                        </th>
                        <th className="px-4 py-2 text-center border-b">
                          Win %
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams.map((team) => (
                        <tr
                          key={team.team_abv}
                          onClick={() => navigate(`/teams/${team.team_abv}`)}
                          className="cursor-pointer hover:bg-gray-200"
                        >
                          <td className="px-4 py-2 text-center border-b">
                            <img
                              src={team.logo}
                              alt={`${team.name} logo`}
                              className="w-10 h-10 mx-auto"
                            />
                          </td>
                          <td className="px-4 py-2 text-center border-b">
                            {team.city} {team.name}
                          </td>
                          <td className="px-4 py-2 text-center border-b">
                            {team.wins}
                          </td>
                          <td className="px-4 py-2 text-center border-b">
                            {team.losses}
                          </td>
                          <td className="px-4 py-2 text-center border-b">
                            {team.winPercentage}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Standings;
