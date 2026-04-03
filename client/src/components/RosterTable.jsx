import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRosterByTeamAbv } from '../services/api';
import { quickSortRoster } from '../utils/sortRosterTable';

const COLUMNS = [
  { key: 'position', label: 'POS' },
  { key: 'name',     label: 'Name' },
  { key: 'jersey_number', label: '#' },
];

const SortIcon = ({ active, descending }) => {
  if (!active) return <span className="text-gray-300 text-[10px]">↕</span>;
  return <span className="text-[10px]">{descending ? '▼' : '▲'}</span>;
};

const RosterTable = ({ setPlayerData, handlePlayerModalOpen }) => {
  const [rosterData, setRosterData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'position', descending: false });
  const { teamAbv } = useParams();

  useEffect(() => {
    fetchRosterByTeamAbv(teamAbv).then((data) => {
      if (data) setRosterData(quickSortRoster([...data], 'position', false));
    }).catch(console.error);
  }, [teamAbv]);

  const handleSort = (key) => {
    const descending = sortConfig.key === key ? !sortConfig.descending : false;
    setRosterData(quickSortRoster([...rosterData], key, descending));
    setSortConfig({ key, descending });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-gray-100">
        <h2 className="text-sm font-bold text-gray-800 tracking-wide uppercase">Roster</h2>
        {rosterData.length > 0 && (
          <span className="text-[10px] text-gray-400">{rosterData.length} players</span>
        )}
      </div>

      {/* Table */}
      {!rosterData.length ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-5 h-5 border-2 border-blue-400 rounded-full animate-spin border-t-transparent" />
        </div>
      ) : (
        <div className="overflow-y-auto flex-1">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-gray-50 border-b border-gray-100">
              <tr>
                {COLUMNS.map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className="px-3 py-2 text-left font-bold text-gray-500 tracking-wider uppercase cursor-pointer hover:text-gray-700 select-none"
                  >
                    <span className="flex items-center gap-1">
                      {label}
                      <SortIcon
                        active={sortConfig.key === key}
                        descending={sortConfig.descending}
                      />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rosterData.map((player) => {
                const { position, name, avatar, jersey_number } = player;
                return (
                  <tr key={name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2 text-gray-500 font-medium w-12">{position}</td>
                    <td className="px-3 py-2">
                      <button
                        className="flex items-center gap-2 text-left w-full cursor-pointer"
                        onClick={() => { setPlayerData(player); handlePlayerModalOpen(); }}
                        disabled={!name}
                      >
                        <img
                          src={avatar}
                          alt={name}
                          className="w-7 h-7 rounded-full object-cover border border-gray-100 shrink-0"
                          onError={(e) => {
                            e.target.src =
                              'https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/0/headshot/67/current';
                          }}
                        />
                        <span className="font-semibold text-gray-800 truncate">{name}</span>
                      </button>
                    </td>
                    <td className="px-3 py-2 text-gray-500 text-center w-10">{jersey_number}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

RosterTable.propTypes = {
  setPlayerData: PropTypes.func,
  handlePlayerModalOpen: PropTypes.func,
};

export default RosterTable;
