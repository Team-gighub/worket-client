"use client";

import { usePathname } from "next/navigation";
import React from "react";
import BottomNavTab from "../common/BottomNavTab";

const AppLayout = ({ children }) => {
  const pathname = usePathname();

  // 탭이 표시될 기본 경로들
  const basePaths = ["/", "/transaction", "/income", "/mypage"];

  // 탭을 숨길 예외 경로들
  const excludedPaths = ["/transaction/detail", "/transaction/edit"];

  const shouldShowBottomNav =
    basePaths.some((path) => pathname.startsWith(path)) &&
    !excludedPaths.some((path) => pathname.startsWith(path));

  return (
    <div className="relative h-full">
      {children}
      {shouldShowBottomNav && <BottomNavTab />}
    </div>
  );
};

export default AppLayout;
