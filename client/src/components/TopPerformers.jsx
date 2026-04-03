import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTopPerformers } from '../services/api';
import { TEAM_COLORS } from '../utils/teamConstants';

const LeaderRow = ({ player, teamAbv }) => {
  const colors = TEAM_COLORS[teamAbv] ?? { primary: '#1e293b' };
  return (
    <div className="flex items-center gap-2.5 py-2 border-b border-gray-50 last:border-0">
      {/* Stat label */}
      <span
        className="text-[10px] font-bold w-10 text-center shrink-0 px-1 py-0.5 rounded"
        style={{ backgroundColor: colors.primary + '15', color: colors.primary }}
      >
        {player.stat}
      </span>
      {/* Avatar */}
      <img
        src={player.avatar}
        alt={player.name}
        className="w-7 h-7 rounded-full object-cover border border-gray-100 shrink-0"
        onError={(e) => {
          e.target.src =
            'https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/0/headshot/67/current';
        }}
      />
      {/* Name */}
      <span className="flex-1 text-xs font-semibold text-gray-800 truncate">{player.name}</span>
      {/* Value */}
      <span className="text-sm font-bold text-gray-700 shrink-0">
        {player.value ?? '—'}
      </span>
    </div>
  );
};

const TopPerformers = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('hitting');
  const { teamAbv } = useParams();

  useEffect(() => {
    fetchTopPerformers(teamAbv).then(setData).catch(console.error);
  }, [teamAbv]);

  const players = activeTab === 'hitting' ? data?.hitters : data?.pitchers;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-4 pt-3 pb-0">
        <h2 className="text-sm font-bold text-gray-800 tracking-wide uppercase">Team Leaders</h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 px-4">
        {[
          { key: 'hitting', label: 'Hitting' },
          { key: 'pitching', label: 'Pitching' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`text-xs font-bold px-3 py-1.5 -mb-px border-b-2 transition-colors ${
              activeTab === key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="px-4 py-1 flex-1">
        {!data ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-5 h-5 border-2 border-blue-400 rounded-full animate-spin border-t-transparent" />
          </div>
        ) : (
          players?.map((player, i) => (
            <LeaderRow key={i} player={player} teamAbv={teamAbv} />
          ))
        )}
      </div>
    </div>
  );
};

export default TopPerformers;
