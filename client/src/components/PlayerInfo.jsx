import PropTypes from "prop-types";

const PlayerInfo = ({ playerData, handlePlayerModalClose }) => {
  if (!playerData) return null;

  const {
    name,
    avatar,
    position,
    jersey_number,
    team_abv,
    bats,
    height,
    weight,
    bday,
    throws: playerThrows, // renamed to avoid using reserved word "throws"
  } = playerData;

  return (
    <div className="relative flex flex-col gap-12 p-8 md:flex-row">
      {/* Close button */}
      <button
        onClick={handlePlayerModalClose}
        className="absolute text-2xl font-bold text-gray-800 transition-all cursor-pointer right-4 top-4 hover:text-red-600 hover:scale-110"
      >
        X
      </button>

      {/* Avatar and Name */}
      <div className="flex flex-col items-center gap-4">
        <img
          src={avatar}
          alt={name}
          className="object-cover w-32 h-32 border border-gray-300 rounded-full shadow"
        />
        <h2 className="text-lg font-semibold">{name}</h2>
      </div>

      {/* Player Details */}
      <div className="flex flex-col justify-center space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold">Position:</span> {position}{" "}
          <span className="font-semibold">Number:</span> {jersey_number}
        </p>
        <p>
          <span className="font-semibold">Team:</span> {team_abv}
        </p>
        <p>
          <span className="font-semibold">Bats:</span> {bats}{" "}
          <span className="font-semibold">Throws:</span> {playerThrows}
        </p>
        <p>
          {height}, {weight} lbs.
        </p>
        <p>
          <span className="font-semibold">Born:</span> {bday}
        </p>
      </div>
    </div>
  );
};

PlayerInfo.propTypes = {
  playerData: PropTypes.object,
  handlePlayerModalClose: PropTypes.func,
};

export default PlayerInfo;
