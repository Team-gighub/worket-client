"use client";

import React from "react";

/**
 * 공통 헤더 컴포넌트 (단순화 버전)
 * @param {string} title - 페이지 제목
 */
const HomeHeader = ({ title }) => {
  return (
    <header className="z-10 absolute top-0 w-full h-[6rem] px-[4rem] pt-[3rem] pb-[1rem] bg-basic-100">
      <div className="flex items-center h-[1.9rem]">
        <h1 className="pretendard-ExtraBold-24 font-black text-primary">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default HomeHeader;
