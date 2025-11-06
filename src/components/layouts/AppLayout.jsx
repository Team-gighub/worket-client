"use client";

import { usePathname } from "next/navigation";
import React from "react";
import BottomNavTab from "../common/BottomNavTab";

const AppLayout = ({ children }) => {
  const pathname = usePathname();

  // 하단 탭이 표시될 기본 경로들
  const basePaths = ["/", "/transactions", "/incomes", "/mypage"];

  // basePaths에 포함된 경로에서만 탭 표시
  const shouldShowBottomNav = basePaths.includes(pathname);

  return (
    <div className="flex relative h-ful">
      <div
        className={`flex-1 h-full ${shouldShowBottomNav ? "pb-[8rem]" : ""}`}
      >
        {children}
      </div>
      {shouldShowBottomNav && <BottomNavTab />}
    </div>
  );
};

export default AppLayout;
