export const StatCard = ({ title, value, icon, unit = "건" }) => {
  return (
    <div className={`rounded-lg p-6 border border-gray-200}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="pretendard-semibold-18 mb-1">{title}</p>
          <p className={`pretendard-medium-18`}>
            {value} {unit}
          </p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
};
