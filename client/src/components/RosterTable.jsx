import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { fetchRosterByTeamAbv } from "../services/api";
import { quickSortRoster } from "../utils/sortRosterTable";

const labels = [
  { key: "position", label: "Position" },
  { key: "name", label: "Name" },
  { key: "jersey_number", label: "Number" },
];

const RosterTable = ({ setPlayerData, handlePlayerModalOpen }) => {
  const [rosterData, setRosterData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    descending: false,
  });
  const { teamAbv } = useParams();

  useEffect(() => {
    const fetchRosterData = async (teamAbv) => {
      try {
        const response = await fetchRosterByTeamAbv(teamAbv);
        const sortedData = quickSortRoster([...response], "name", false);
        setRosterData(sortedData);
      } catch (error) {
        console.error("Error fetching team roster:", error);
      }
    };

    fetchRosterData(teamAbv);
  }, [teamAbv]);

  const handleSort = (key) => {
    const isDescending =
      sortConfig.key === key ? !sortConfig.descending : false;
    const sortedRoster = quickSortRoster([...rosterData], key, isDescending);
    setRosterData(sortedRoster);
    setSortConfig({ key, descending: isDescending });
  };

  if (!rosterData.length) {
    return (
      <div className="flex items-center justify-center my-16">
        <div className="w-10 h-10 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="my-6 overflow-x-auto rounded-lg shadow-xl">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {labels.map(({ key, label }) => (
              <th
                key={key}
                className="px-6 py-3 text-sm font-semibold text-center text-gray-700 cursor-pointer"
                onClick={() => handleSort(key)}
              >
                <div className="flex items-center justify-center gap-1">
                  {label}
                  {sortConfig.key === key ? (
                    sortConfig.descending ? (
                      <span>▼</span>
                    ) : (
                      <span>▲</span>
                    )
                  ) : (
                    <span className="text-gray-400">↕</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rosterData.map((player, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-3 text-sm text-center text-gray-700">
                {player.position}
              </td>
              <td className="px-6 py-3 text-sm text-gray-800">
                <button
                  className="flex items-center gap-2 mx-auto cursor-pointer"
                  onClick={() => {
                    setPlayerData(player);
                    handlePlayerModalOpen();
                  }}
                  disabled={Object.keys(player).length === 0}
                >
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{player.name}</span>
                </button>
              </td>
              <td className="px-6 py-3 text-sm text-center text-gray-700">
                {player.jersey_number}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

RosterTable.propTypes = {
  setPlayerData: PropTypes.func,
  handlePlayerModalOpen: PropTypes.func,
};

export default RosterTable;
