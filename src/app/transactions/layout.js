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
const TransactionLayout = ({ children }) => {
  const pathname = usePathname();

  // 헤더 정보 설정
  let headerTitle = "거래 관리";
  let canGoBack = false;

  if (pathname === "/transactions") {
    headerTitle = "거래 관리";
    canGoBack = false; // 루트 페이지라 뒤로가기 없음
  } else if (pathname.startsWith("/transactions/create")) {
    headerTitle = "거래 등록";
    canGoBack = true;
  } else if (pathname.startsWith("/transactions/upload")) {
    headerTitle = "거래 업로드";
    canGoBack = true;
  } else if (/^\/transactions\/\d+$/.test(pathname)) {
    headerTitle = "거래 상세";
    canGoBack = true;
  } else if (/^\/transactions\/\d+\/create-link$/.test(pathname)) {
    headerTitle = "거래 링크 생성";
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

export default TransactionLayout;
