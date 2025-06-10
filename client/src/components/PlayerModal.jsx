import PropTypes from "prop-types";
import PlayerInfo from "./PlayerInfo";

const PlayerModal = ({ setPlayerData, handlePlayerModalClose }) => {
  const playerData = setPlayerData;
  const isPlayerPitcher = playerData.position === "P";
  const heading = isPlayerPitcher ? "Pitching Stats" : "Hitting Stats";

  const statKeyMap = {
    InningsPitched: "IP",
    "Wild Pitch": "WP",
    Win: "W",
    Loss: "L",
    Save: "SV",
    BlownSave: "BS",
    CompleteGame: "CG",
    ShutOut: "SHO",
  };

  const hiddenKeys = [
    "PerfectGame",
    "Flyouts",
    "Pitches",
    "NoHitter",
    "Strikes",
    "Groundouts",
    "Batters Faced",
  ];

  const statData = isPlayerPitcher
    ? playerData.stats?.Pitching || {}
    : playerData.stats?.Hitting || {};

  const statEntries = Object.entries(statData).filter(
    ([key]) => !hiddenKeys.includes(key)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="relative w-11/12 max-w-5xl p-6 bg-white drop-shadow-2xl rounded-2xl">
        <PlayerInfo
          playerData={playerData}
          handlePlayerModalClose={handlePlayerModalClose}
        />

        <div className="p-4 mt-6 border border-gray-300 rounded-xl">
          {!statEntries.length ? (
            <p className="text-center text-gray-500">No stats available</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-center border-collapse table-auto">
                <thead>
                  <tr>
                    <th
                      colSpan={statEntries.length}
                      className="pb-2 text-lg font-semibold text-gray-800"
                    >
                      {heading}
                    </th>
                  </tr>
                  <tr>
                    {statEntries.map(([key]) => (
                      <th
                        key={key}
                        className="px-2 py-1 text-xs font-bold text-gray-600 uppercase"
                      >
                        {statKeyMap[key] || key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {statEntries.map(([_, value], index) => (
                      <td key={index} className="px-2 py-1 text-sm">
                        {value}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PlayerModal.propTypes = {
  setPlayerData: PropTypes.object.isRequired,
  handlePlayerModalClose: PropTypes.func.isRequired,
};

export default PlayerModal;
