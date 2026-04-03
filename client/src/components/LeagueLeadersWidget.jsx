import { useState, useEffect } from 'react';
import { fetchLeagueLeaders } from '../services/api';

const HITTING_CATEGORIES = [
  { key: 'avg', label: 'AVG' },
  { key: 'hr',  label: 'HR' },
  { key: 'rbi', label: 'RBI' },
  { key: 'ops', label: 'OPS' },
  { key: 'sb',  label: 'SB' },
];

const PITCHING_CATEGORIES = [
  { key: 'era',  label: 'ERA' },
  { key: 'k',    label: 'K' },
  { key: 'whip', label: 'WHIP' },
  { key: 'w',    label: 'W' },
  { key: 'sv',   label: 'SV' },
];

const LeaderRow = ({ rank, player }) => (
  <div className="flex items-center gap-1.5 py-1">
    <span className="text-[10px] font-bold text-gray-300 w-3 text-right shrink-0">{rank}</span>
    <img
      src={player.avatar}
      alt={player.name}
      className="w-6 h-6 rounded-full object-cover border border-gray-100 shrink-0"
      onError={(e) => {
        e.target.src =
          'https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/0/headshot/67/current';
      }}
    />
    <div className="flex-1 min-w-0">
      <p className="text-[11px] font-semibold text-gray-800 truncate leading-tight">{player.name}</p>
      <p className="text-[9px] text-gray-400 leading-tight">{player.team_abv}</p>
    </div>
    <span className="text-xs font-bold text-gray-700 shrink-0">{player.value}</span>
  </div>
);

const LeagueColumn = ({ label, players }) => (
  <div className="flex-1 min-w-0">
    <div className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1 pb-1 border-b border-gray-100">
      {label}
    </div>
    {players.length === 0 ? (
      <p className="text-[10px] text-gray-300 italic pt-2">No qualified players</p>
    ) : (
      <div className="divide-y divide-gray-50">
        {players.map((player, i) => (
          <LeaderRow key={player.player_id} rank={i + 1} player={player} />
        ))}
      </div>
    )}
  </div>
);

const LeagueLeadersWidget = () => {
  const [leaders, setLeaders] = useState(null);
  const [activeGroup, setActiveGroup] = useState('hitting');
  const [activeCategory, setActiveCategory] = useState('avg');

  useEffect(() => {
    fetchLeagueLeaders().then((data) => {
      if (data) setLeaders(data);
    });
  }, []);

  const categories = activeGroup === 'hitting' ? HITTING_CATEGORIES : PITCHING_CATEGORIES;
  const alPlayers = leaders?.AL?.[activeGroup]?.[activeCategory] ?? [];
  const nlPlayers = leaders?.NL?.[activeGroup]?.[activeCategory] ?? [];

  const handleGroupChange = (group) => {
    setActiveGroup(group);
    setActiveCategory(group === 'hitting' ? 'avg' : 'era');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-4 pt-3 pb-1.5 flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-800 tracking-wide uppercase">League Leaders</h2>
        {leaders && (
          <p className="text-[9px] text-gray-400">
            Qualified · {leaders.avgTeamGames} GP
          </p>
        )}
      </div>

      {/* Group tabs */}
      <div className="flex border-b border-gray-100 px-4">
        {[
          { key: 'hitting', label: 'Hitting' },
          { key: 'pitching', label: 'Pitching' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleGroupChange(key)}
            className={`text-xs font-bold px-3 py-1.5 -mb-px border-b-2 transition-colors ${
              activeGroup === key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Category pills */}
      <div className="flex gap-1 px-4 py-2 border-b border-gray-50">
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
              activeCategory === key
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* AL / NL columns */}
      <div className="px-4 py-2 flex-1">
        {!leaders ? (
          <div className="flex items-center justify-center h-full min-h-[160px]">
            <div className="w-5 h-5 border-2 border-blue-400 rounded-full animate-spin border-t-transparent" />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <LeagueColumn label="American League" players={alPlayers} />
            <div className="h-px bg-gray-100" />
            <LeagueColumn label="National League" players={nlPlayers} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueLeadersWidget;
