import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTeams } from "../services/api";

const Teams = () => {
  const [teamsData, setTeamsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTeams = async () => {
      const data = await fetchTeams();
      setTeamsData(data);
      setLoading(false);
    };

    getTeams();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center max-w-screen-lg gap-4 mx-auto mt-20">
        <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent" />
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg px-4 py-8 mx-auto">
      <div className="grid items-center justify-center grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {teamsData.map(({ team_abv, city, name, logo }) => (
          <Link
            key={team_abv}
            to={`/teams/${team_abv}`}
            className="flex items-center justify-center"
          >
            <div className="flex items-center justify-center w-24 h-24 p-2 overflow-hidden transition-transform duration-300 bg-white hover:scale-110">
              <img
                src={logo}
                alt={`${city} ${name}`}
                className="object-cover max-w-full max-h-full"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Teams;
