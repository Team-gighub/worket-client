"use client";

import React, { useState, useEffect } from "react";
import DashboardCards from "@/components/admin/DashboardCards";
import ExperienceBarChart from "@/components/admin/ExperienceBarChart";
import IndustryPieChart from "@/components/admin/IndustryPieChart";
import { getUserStatistics } from "@/lib/api/client/statisticServices";

const AdminDashboardPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalizeApiData = (apiData) => {
    const { userStatics, freelancerDetail } = apiData.data;

    return {
      user_statistics: {
        total_users: userStatics.totalUsers,
        daily_new_users: userStatics.dailyNewUsers,
        monthly_new_users: userStatics.monthlyNewUsers,
      },
      freelancer_detail: {
        experience: freelancerDetail.experience,
        industry: freelancerDetail.industry,
      },
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserStatistics();

        if (response && response.data) {
          const normalizedData = normalizeApiData(response);
          setData(normalizedData);
        } else {
          throw new Error("API 응답 데이터 형식이 올바르지 않습니다.");
        }
      } catch (err) {
        console.error("데이터 패칭 오류:", err);
        setError(err.message || "알 수 없는 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. 데이터 유효성 검사 및 예외 처리
  if (!data || !data.user_statistics || !data.freelancer_detail) {
    return (
      <div className="p-8 text-center text-red-500">
        대시보드 데이터를 불러올 수 없습니다.
      </div>
    );
  }

  const { user_statistics, freelancer_detail } = data;

  return (
    <div className="p-8 space-y-8 h-full overflow-y-auto">
      <h2 className="pretendard-semibold-14 font-bold text-gray-800">
        관리자 통계 대시보드
      </h2>

      {/* 1. 상단 통계 카드 영역 (3개 박스) */}
      <DashboardCards stats={user_statistics} />

      {/* 2. 하단 차트 영역 (업력 분포 및 업종 비율) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* A. 업력 분포 막대 그래프 (2/3 영역) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg h-[500px]">
          <h3 className="pretendard-semibold-14 font-semibold mb-6 text-gray-700">
            프리랜서 업력 분포
          </h3>
          <div className="w-full h-[calc(100%-40px)]">
            <ExperienceBarChart data={freelancer_detail.experience} />
          </div>
        </div>

        {/* B. 업종 비율 도넛 그래프 (1/3 영역) */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg h-[500px] flex flex-col">
          <h3 className="pretendard-semibold-14 font-semibold mb-6 text-gray-700">
            프리랜서 업종 비율
          </h3>
          <div className="flex-grow">
            <IndustryPieChart data={freelancer_detail.industry} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
