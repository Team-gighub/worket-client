import React from "react";

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

          {/* CSS Animation Styles */}
          <style jsx>{`
            @keyframes ripple-outer {
              0%,
              100% {
                transform: scale(0.9);
                opacity: 0.2;
              }
              50% {
                transform: scale(1.1);
                opacity: 0.1;
              }
            }

            @keyframes ripple-middle {
              0%,
              100% {
                transform: scale(0.9);
                opacity: 0.36;
              }
              50% {
                transform: scale(1);
                opacity: 0.25;
              }
            }

            @keyframes pulse-gentle {
              0%,
              100% {
                transform: scale(0.9);
                opacity: 1;
              }
              50% {
                transform: scale(1);
                opacity: 0.9;
              }
            }

            .animate-ripple-outer {
              animation: ripple-outer 2s ease-in-out infinite;
            }

            .animate-ripple-middle {
              animation: ripple-middle 2s ease-in-out infinite 0.3s;
            }

            .animate-pulse-gentle {
              animation: pulse-gentle 2s ease-in-out infinite 0.6s;
            }
          `}</style>
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
