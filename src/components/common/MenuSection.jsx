import React from "react";

/**
 * 메뉴 섹션 컴포넌트
 *
 * @param {string} title - 섹션 제목
 * @param {Array<{ label: string, onClick: function }>} items - 메뉴 항목 배열
 *   - label: 메뉴 텍스트
 *   - onClick: 클릭 핸들러
 */
const MenuSection = ({ title, items }) => {
  return (
    <div className="max-w-[33.5rem] w-full mx-auto my-[2rem] flex flex-col gap-2.5">
      <div className="flex flex-col">
        <h3 className="pretendard-medium-16 mb-2">{title}</h3>
        {items.map((item, index) => (
          <button
            key={index}
            className="flex pl-[5rem] py-[1rem] pretendard-light-14 text-basic-500"
            onClick={item.onClick}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
