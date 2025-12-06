"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const tabs = [
  {
    id: "dashboard",
    label: "홈",
    path: "/admin",
    icon: "/icons/icHome.png",
    activeIcon: "/icons/icHomeActive.png",
  },
  {
    id: "transactions",
    label: "거래 관리",
    path: "/admin/transactions",
    icon: "/icons/icTransaction.png",
    activeIcon: "/icons/icTransactionActive.png",
  },
  {
    id: "users",
    label: "사용자",
    path: "/admin/users",
    icon: "/icons/icMypage.png",
    activeIcon: "/icons/icMypageActive.png",
  },
];

const AdminSideNavTab = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[10rem] h-full bg-basic-200 flex-shrink-0">
      <div className="flex flex-col items-center py-8 gap-8">
        {/* 로고 이미지 */}
        <div className="relative w-[8rem] h-[4rem] mb-4">
          <Image
            src="/images/logo_with_text.png"
            alt="WORKET Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="flex flex-col gap-4 w-full px-4">
          {tabs.map((tab) => {
            const isActive =
              tab.id === "dashboard"
                ? pathname === tab.path
                : pathname.startsWith(tab.path);

            return (
              <Link
                key={tab.id}
                href={tab.path}
                className={`flex flex-col items-center gap-2 py-3 px-2 rounded-lg transition-all hover:bg-basic-300`}
              >
                <div className="relative w-8 h-8">
                  <Image
                    src={isActive ? tab.activeIcon : tab.icon}
                    alt={tab.label}
                    fill
                    sizes="3.2rem"
                    className="object-contain"
                    loading="eager"
                  />
                </div>
                <span
                  className={`pretendard-medium-12 text-center whitespace-nowrap ${
                    isActive ? "text-basic-800" : "text-basic-400"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSideNavTab;
