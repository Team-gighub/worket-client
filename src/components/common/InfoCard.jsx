import React from "react";

/**
 * 정보 카드 컴포넌트
 *
 * @param {string} title - 제목 (필수)
 * @param {string} description - 설명
 * @param {Array<{ label: string, value: string | number }>} items - 카드 안에 표시할 항목 배열
 *   - label: 왼쪽에 표시될 제목
 *   - value: 오른쪽에 표시될 내용
 */
const InfoCard = ({ title, description, items }) => {
  return (
    <div className="max-w-[33.5rem] mx-auto w-full mt-4 flex flex-col gap-4">
      <div>
        <span className="pretendard-semibold-18 mr-4">{title}</span>
        <span className="pretendard-medium-14 text-basic-400">
          {description}
        </span>
      </div>

      <div
        className="pretendard-medium-14 bg-basic-200 p-6"
        style={{ borderRadius: "1rem" }}
      >
        <div className="flex flex-col gap-3">
          {items.map(({ label, value }, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-700">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
