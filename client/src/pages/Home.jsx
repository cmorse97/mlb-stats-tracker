import Teams from "../components/Teams";

const Home = () => {
  return (
    <div className="max-w-screen-lg px-4 mx-auto">
      <h1 className="mt-10 mb-6 text-4xl font-bold text-center">
        Welcome to the MLB Stats Tracker App
      </h1>
      <h2 className="mb-8 text-2xl text-center">
        Click a team to view their stats
      </h2>
      <div>
        <Teams />
      </div>
    </div>
  );
};

export default Home;
