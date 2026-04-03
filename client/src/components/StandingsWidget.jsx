import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchStandings } from '../services/api';

const divisionSortOrder = { East: 0, Central: 1, West: 2 };
const sortDivisions = (divs) =>
  [...divs].sort((a, b) => {
    const aKey = a.split(' ').pop();
    const bKey = b.split(' ').pop();
    return (divisionSortOrder[aKey] ?? 9) - (divisionSortOrder[bKey] ?? 9);
  });
const shortDivName = (fullName) => fullName.split(' ').pop();

const StreakBadge = ({ streak }) => {
  if (!streak) return <span className="text-gray-300">—</span>;
  const isWin = streak.startsWith('W');
  return (
    <span className={`font-semibold ${isWin ? 'text-green-600' : 'text-red-500'}`}>
      {streak}
    </span>
  );
};

const DivisionTable = ({ division, teams }) => (
  <div className="mb-2 last:mb-0">
    <div className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-0.5 px-1">
      {division}
    </div>
    <table className="w-full">
      <thead>
        <tr className="text-[9px] font-bold tracking-wider text-gray-400 uppercase border-b border-gray-100">
          <th className="text-left py-0.5 px-1 font-medium">Team</th>
          <th className="text-center py-0.5 px-1 font-medium w-7">W</th>
          <th className="text-center py-0.5 px-1 font-medium w-7">L</th>
          <th className="text-center py-0.5 px-1 font-medium w-10">PCT</th>
          <th className="text-center py-0.5 px-1 font-medium w-8">GB</th>
          <th className="text-center py-0.5 px-1 font-medium w-9">STK</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team, i) => (
          <tr
            key={team.team_abv}
            className={`border-b border-gray-50 hover:bg-gray-50 transition-colors text-xs ${
              i === 0 ? 'font-semibold text-gray-800' : 'text-gray-600'
            }`}
          >
            <td className="py-1 px-1">
              <Link
                to={`/teams/${team.team_abv}`}
                className="hover:text-blue-600 transition-colors"
              >
                {team.city}
              </Link>
            </td>
            <td className="text-center py-1 px-1">{team.wins}</td>
            <td className="text-center py-1 px-1">{team.losses}</td>
            <td className="text-center py-1 px-1 text-gray-400">{team.winPercentage}</td>
            <td className="text-center py-1 px-1 text-gray-400">{team.gamesBack}</td>
            <td className="text-center py-1 px-1 text-[11px]">
              <StreakBadge streak={team.streak} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StandingsWidget = () => {
  const [standings, setStandings] = useState(null);
  const [activeLeague, setActiveLeague] = useState('AL');

  useEffect(() => {
    fetchStandings().then((data) => {
      if (data) setStandings(data);
    });
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-4 pt-3 pb-1.5 flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-800 tracking-wide uppercase">Standings</h2>
        <Link to="/standings" className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors">
          Full →
        </Link>
      </div>

      {/* League tabs */}
      <div className="flex border-b border-gray-100 px-4">
        {['AL', 'NL'].map((league) => (
          <button
            key={league}
            onClick={() => setActiveLeague(league)}
            className={`text-xs font-bold px-3 py-1.5 -mb-px border-b-2 transition-colors ${
              activeLeague === league
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {league === 'AL' ? 'American League' : 'National League'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-3 py-2 flex-1 overflow-y-auto">
        {!standings ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-5 h-5 border-2 border-blue-400 rounded-full animate-spin border-t-transparent" />
          </div>
        ) : (
          sortDivisions(Object.keys(standings[activeLeague] ?? {})).map((divKey) => {
            const teams = standings[activeLeague][divKey];
            if (!teams) return null;
            return <DivisionTable key={divKey} division={shortDivName(divKey)} teams={teams} />;
          })
        )}
      </div>
    </div>
  );
};

export default StandingsWidget;
