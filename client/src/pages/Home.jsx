import Teams from "../components/Teams";
import StandingsWidget from "../components/StandingsWidget";
import LeagueLeadersWidget from "../components/LeagueLeadersWidget";

const Home = () => {
  return (
    <div className="max-w-screen-lg px-4 mx-auto my-6 space-y-6">
      {/* Team logo strip */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-bold text-gray-800">MLB Stats Tracker</h1>
          <p className="text-xs text-gray-400">Click a team to view their stats</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-3">
          <Teams />
        </div>
      </section>

      {/* Widgets row */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StandingsWidget />
        <LeagueLeadersWidget />
      </section>
    </div>
  );
};

export default Home;
