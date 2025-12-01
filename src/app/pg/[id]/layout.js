"use client";

import React from "react";
import { usePathname, useParams, useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import PageLayout from "@/components/layouts/PageLayout";
import Image from "next/image";

/**
 * 거래 관련 페이지 전용 Layout
 * - URL에 따라 Header 제목, 뒤로가기 버튼 자동 설정
 * - 하단탭은 특정 페이지에서만 표시
 */
const PGLayout = ({ children }) => {
  const pathname = usePathname();
  const { id } = useParams();
  const router = useRouter();

  // 헤더 정보 설정
  let headerTitle = "출금 계좌선택";
  let canGoBack = false;

  if (pathname.includes("/account")) {
    headerTitle = "계좌번호 입력";
    canGoBack = false;
  }

  return (
    <PageLayout
      header={<Header title={headerTitle} onBack={canGoBack ? 1 : null} />}
    >
      <div className="h-full flex flex-col bg-basic-100">
        <div className="w-full max-w-6xl h-full bg-basic-200 rounded-2xl shadow-lg p-8 overflow-hidden flex flex-col">
          <div className="border-t border-b border-gray-300 py-6 mb-12">
            <div className="flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-6">
                <p className="pretendard-semibold-16 text-basic-600 whitespace-nowrap">
                  우리 PG
                </p>
                <p className="pretendard-semibold-14 text-basic-700 whitespace-nowrap">
                  안전하고 편리한 우리 PG 입니다
                </p>
              </div>

              {/* 오른쪽 Close 버튼 */}
              <button
                onClick={() => router.push(`/trade/${id}/deposit`)}
                className="flex flex-col items-center hover:opacity-80"
                aria-label="닫기"
              >
                <div className="relative w-[1.6rem] h-[1.6rem]">
                  <Image
                    src="/icons/icClose.png"
                    alt="닫기"
                    fill
                    sizes="1.6rem"
                    className="object-contain"
                    loading="eager"
                  />
                </div>
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </PageLayout>
  );
};

export default PGLayout;
