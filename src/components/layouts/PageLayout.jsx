import React from "react";

/**
 * 페이지 공통 레이아웃
 * - header가 존재하면 상단 여백(pt-[6rem]) 자동 추가
 * - 기본적으로 세로 전체 차지
 */
const PageLayout = ({ children, header = null }) => {
  return (
    <div className="flex flex-col h-full">
      {header}
      <main
        className={`${header ? "pt-[6rem]" : ""} flex-1 h-full overflow-y-auto`}
      >
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
