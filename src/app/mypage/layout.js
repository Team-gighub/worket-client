"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/common/Header";
import PageLayout from "@/components/layouts/PageLayout";

const MyPageLayout = ({ children }) => {
  const pathname = usePathname();

  // 헤더 정보 설정
  let headerTitle = "마이페이지";
  let canGoBack = false;

  if (pathname === "/mypage") {
    headerTitle = "마이페이지";
    canGoBack = false; // 루트 페이지라 뒤로가기 없음
  } else if (pathname.startsWith("/mypage/edit")) {
    headerTitle = "회원 정보 수정";
    canGoBack = true;
  }
  return (
    <PageLayout
      header={<Header title={headerTitle} onBack={canGoBack ? 1 : null} />}
    >
      {children}
    </PageLayout>
  );
};

export default MyPageLayout;
