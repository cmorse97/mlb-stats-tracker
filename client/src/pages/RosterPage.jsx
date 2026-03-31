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
        <PlayerModal
          setPlayerData={playerData}
          handlePlayerModalClose={handlePlayerModalClose}
        />
      )}
    </div>
  );
};

export default RosterPage;
