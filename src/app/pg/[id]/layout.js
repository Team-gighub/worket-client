"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/common/Header";
import PageLayout from "@/components/layouts/PageLayout";

/**
 * 거래 관련 페이지 전용 Layout
 * - URL에 따라 Header 제목, 뒤로가기 버튼 자동 설정
 * - 하단탭은 특정 페이지에서만 표시
 */
const PGLayout = ({ children }) => {
  const pathname = usePathname();

  // 헤더 정보 설정
  let headerTitle = "거래 관리";
  let canGoBack = false;

  if (pathname === "/pg") {
    headerTitle = "출금 계좌 선택";
    canGoBack = false;
  }

  return (
    <PageLayout
      header={<Header title={headerTitle} onBack={canGoBack ? 1 : null} />}
    >
      {children}
    </PageLayout>
  );
};

export default PGLayout;
