import Teams from "../components/Teams";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <>
      {/* Implement responsive layout */}
      <Navbar />
      <div className="min-w-5xl">
        <div className="flex flex-col items-center justify-center gap-12 my-4">
          <h1 className="text-4xl text-gray-700">Pick a team to view roster</h1>
          <Teams />
        </div>
      </div>
    </>
  );
};

export default Root;
