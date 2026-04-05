import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTeams } from '../services/api';
import Loading from './Loading';

// Full division names from the API, sorted East → Central → West
const DIVISION_ORDER = ['East', 'Central', 'West'];

const divisionSuffix = (divName) => divName?.split(' ').pop() ?? '';

const groupTeams = (teams) => {
  const leagues = { AL: {}, NL: {} };
  teams.forEach((team) => {
    const lg = team.league_abv;
    if (!leagues[lg]) return;
    const div = divisionSuffix(team.division);
    if (!leagues[lg][div]) leagues[lg][div] = [];
    leagues[lg][div].push(team);
  });
  return leagues;
};

const Teams = () => {
  const [teamsData, setTeamsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams().then((data) => {
      if (data) setTeamsData(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <Loading />
      </div>
    );
  }

  const leagues = groupTeams(teamsData);

  return (
    <div className="space-y-3">
      {['AL', 'NL'].map((lg) => (
        <div key={lg}>
          <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1.5">
            {lg === 'AL' ? 'American League' : 'National League'}
          </p>
          {/* 15 logos per row: 5 teams × 3 divisions */}
          <div className="grid grid-cols-5 sm:grid-cols-15 gap-0.5 sm:gap-1">
            {DIVISION_ORDER.flatMap((div) =>
              (leagues[lg][div] ?? []).map((team) => (
                <Link
                  key={team.team_abv}
                  to={`/teams/${team.team_abv}`}
                  title={`${team.city} ${team.name}`}
                  className="group flex items-center justify-center aspect-square p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={team.logo}
                    alt={`${team.city} ${team.name}`}
                    className="w-12 h-12 sm:w-full sm:h-full object-contain group-hover:scale-110 transition-transform duration-200"
                  />
                </Link>
              )),
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Teams;
