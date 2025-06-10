import PropTypes from "prop-types";

const PerformerCard = ({ name, avatar, stat, value }) => (
  <div className="flex items-center gap-4 p-4 shadow-md rounded-xl">
    <img
      src={avatar}
      alt={name}
      className="object-cover w-16 h-16 rounded-full"
    />
    <div>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-500">
        {stat}: <span className="font-bold">{!value ? "--" : value}</span>
      </p>
    </div>
  </div>
);

PerformerCard.propTypes = {
  name: PropTypes.name,
  avatar: PropTypes.avatar,
  stat: PropTypes.stat,
  value: PropTypes.value,
};

export default PerformerCard;
