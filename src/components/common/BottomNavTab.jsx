"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const BottomNavTab = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      id: "home",
      label: "홈",
      path: "/",
      icon: "/icons/icHome.png",
      activeIcon: "/icons/ichomeActive.png",
    },
    {
      id: "transaction",
      label: "거래 관리",
      path: "/transactions",
      icon: "/icons/icTransaction.png",
      activeIcon: "/icons/icTransactionActive.png",
    },
    {
      id: "income",
      label: "소득 관리",
      path: "/incomes",
      icon: "/icons/icIncome.png",
      activeIcon: "/icons/icIncomeActive.png",
    },
    {
      id: "mypage",
      label: "마이페이지",
      path: "/mypage",
      icon: "/icons/icMypage.png",
      activeIcon: "/icons/icMypageActive.png",
    },
  ];

  const handleTabClick = (path) => {
    router.push(path);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 w-full bg-white rounded-t-[20px] shadow-[0_-4px_10px_0_rgba(169,169,169,0.15)] px-[3rem] py-6 z-50">
      <div className="w-full flex justify-between items-center">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.path)}
              className="flex flex-col items-center gap-1 min-w-[6.5rem] transition-colors hover:opacity-80"
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
                className={`pretendard-medium-14 text-center whitespace-nowrap ${
                  isActive ? "text-basic-800" : "text-basic-400"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavTab;
