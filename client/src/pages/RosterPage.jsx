import { useState } from "react";
import TeamStats from "../components/TeamStats";
import RosterTable from "../components/RosterTable";
import TopPerformers from "../components/TopPerformers";
import PlayerModal from "../components/PlayerModal";

const RosterPage = () => {
  const [playerData, setPlayerData] = useState();
  const [playerModalOpen, setPlayerModalOpen] = useState(false);

  const handlePlayerModalOpen = () => setPlayerModalOpen(true);
  const handlePlayerModalClose = () => setPlayerModalOpen(false);

  return (
    <div className="max-w-screen-lg px-4 mx-auto my-6">
      <TeamStats />
      <TopPerformers />
      <RosterTable
        setPlayerData={setPlayerData}
        handlePlayerModalOpen={handlePlayerModalOpen}
      />

      {playerModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
          onClick={handlePlayerModalClose}
        >
          <div
            className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevent closing modal when clicking inside
          >
            <PlayerModal
              setPlayerData={playerData}
              handlePlayerModalClose={handlePlayerModalClose}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RosterPage;
