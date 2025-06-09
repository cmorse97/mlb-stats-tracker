import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const Teams = () => {
  const [teamsData, setTeamsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamsData = async () => {
      const options = {
        params: {
          teamStats: "true",
          topPerformers: "true",
        },
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_API_HOST,
        },
      };

      const apiUrl = import.meta.env.VITE_API_URL_TEAMS;

      axios
        .get(apiUrl, options)
        .then((response) => {
          const teams = response.data.body;
          setTeamsData(teams);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };

    fetchTeamsData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {isLoading && !teamsData.length ? (
        <div className="flex justify-center col-span-full">
          <Loading message="Loading teams..." size="lg" />
        </div>
      ) : (
        teamsData.map((team) => (
          <div key={team.teamID} className="flex justify-center">
            <Link to={`/team/${team.teamAbv}`}>
              <div className="flex items-center justify-center w-24 h-24 p-2 overflow-hidden transition-transform duration-200 bg-white rounded-lg shadow hover:scale-105">
                <img
                  src={team.mlbLogo1}
                  alt={`${team.teamCity} ${team.teamName}`}
                  className="object-contain max-w-full max-h-full"
                />
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Teams;
