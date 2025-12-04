// components/admin/DashboardCards.jsx

import React from "react";
import StatsCard from "./StatsCard";

const DashboardCards = ({ stats }) => {
  if (!stats) return null; // 데이터가 없을 경우 렌더링 방지

  const totalUsers = stats.total_users;
  const dailyNewUsers = stats.daily_new_users;
  const monthlyNewUsers = stats.monthly_new_users;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 1. 총 가입자 수 */}
      <StatsCard
        title="총 가입자 수"
        value={totalUsers.all.toLocaleString() + "명"}
        subData={`프리랜서: ${totalUsers.freelancer.toLocaleString()}명 / 클라이언트: ${totalUsers.client.toLocaleString()}명`}
        color="bg-blue-600"
      />

      {/* 2. 일일 신규 가입자 수 */}
      <StatsCard
        title="일일 신규 가입자"
        value={dailyNewUsers.all.toLocaleString() + "명"}
        // ⭐️ 수정: 프리랜서와 클라이언트 신규 수 모두 표시
        subData={`프리랜서 신규: ${dailyNewUsers.freelancer.toLocaleString()}명, 클라이언트 신규: ${dailyNewUsers.client.toLocaleString()}명`}
        color="bg-green-600"
      />

      {/* 3. 월간 신규 가입자 수 */}
      <StatsCard
        title="월간 신규 가입자"
        value={monthlyNewUsers.all.toLocaleString() + "명"}
        subData={`프리랜서 신규: ${monthlyNewUsers.freelancer.toLocaleString()}명, 클라이언트 신규: ${monthlyNewUsers.client.toLocaleString()}명`}
        color="bg-yellow-600"
      />
    </div>
  );
};

export default DashboardCards;
