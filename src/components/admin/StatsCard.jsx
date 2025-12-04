import React from "react";

const StatsCard = ({ title, value, subData, color }) => {
  return (
    <div
      className={`p-6 rounded-xl shadow-lg text-white ${color} transition duration-300 hover:shadow-xl hover:scale-[1.02]`}
    >
      <p className="pretendard-semibold-14 font-medium mb-1 opacity-80">
        {title}
      </p>
      <h3 className="text-4xl font-bold mb-2">{value}</h3>
      <p className="pretendard-light-14 opacity-90">{subData}</p>
    </div>
  );
};

export default StatsCard;
