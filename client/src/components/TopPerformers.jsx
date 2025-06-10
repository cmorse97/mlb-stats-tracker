import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTopPerformers } from "../services/api";
import PerformerCard from "./PerformerCard";

const TopPerformers = () => {
  const [data, setData] = useState(null);
  const { teamAbv } = useParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchTopPerformers(teamAbv);
        setData(response);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, [teamAbv]);

  if (!data) return <div className="mt-12 text-center">Loading...</div>;

  return (
    <div className="my-12">
      <h2 className="mb-6 text-3xl font-bold text-center">Top Performers</h2>
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="mb-2 text-xl font-semibold">Hitting</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {data.hitters.map((player) => (
              <PerformerCard key={player.player_id} {...player} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold">Pitching</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {data.pitchers.map((player) => (
              <PerformerCard key={player.player_id} {...player} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPerformers;
