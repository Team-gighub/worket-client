import React from "react";
import formatKRW from "@/app/utils/KRWFormatter";
const ProfitCard = ({ userName, profitAmount, statusData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
      {/* 2. 수익 제목 영역 */}
      <div className="text-black mb-4">
        <p className="pretendard-semibold-16">
          <span>{userName}</span>님의 이번달 수익은
        </p>
        <p className="pretendard-semibold-24 mt-1">
          {formatKRW(profitAmount)} 원이에요
        </p>
      </div>

      {/* 구분선을 만들기 위한 div */}
      <div className="border-t border-basic-200 "></div>

      {/* 하단 상태/통계 영역*/}
      <div className="flex justify-around text-center">
        {statusData.map((item, index) => (
          // 각 항목에 오른쪽 테두리(구분선)를 적용
          <div
            key={index}
            className={`grow ${index < statusData.length - 1 ? "border-r border-gray-200" : ""}`} //마지막 요소에는 테두리 넣지 않기 위함
          >
            <div className="mt-2 flex items-center justify-start gap-2 mr-5">
              <p className=" pretendard-medium-12 text-basic-600">
                {item.label}
              </p>
              <p className="pretendard-medium-12 text-basic-600">
                {item.count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProfitCard;
