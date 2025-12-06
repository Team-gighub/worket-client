/**
 * 스텝 인디케이터 아이콘 컴포넌트
 * @param {string} status - 'active' | 'completed' | 'inactive'
 */
const TradeStepIcon = ({ status = "active" }) => {
  return (
    <div className="relative flex items-center justify-center w-[5.2rem] h-[5.2rem]">
      {status === "active" && (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[3.4rem] h-[3.4rem] rounded-full bg-primary animate-ripple-outer" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[2.4rem] h-[2.4rem] rounded-full bg-primary animate-ripple-middle" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[1.6rem] h-[1.6rem] rounded-full bg-primary animate-pulse-gentle" />
          </div>
        </>
      )}

      {status === "completed" && (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[1.6rem] h-[1.6rem] rounded-full bg-primary" />
          </div>
        </>
      )}

      {status === "inactive" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[1.6rem] h-[1.6rem] rounded-full bg-basic-400" />
        </div>
      )}
    </div>
  );
};

export default TradeStepIcon;
