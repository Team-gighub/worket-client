"use client";

import { useState } from "react";
import { StatCard } from "@/components/admin/stat-card";
import { LoadingSpinner } from "@/components/admin/loading-spinner";
import { UsageChart } from "@/components/admin/usage-chart";
import { StatusChart } from "@/components/admin/status-chart";
import { getUsages } from "@/lib/api/client/usageServices";

const AdminPage = () => {
  const [merchantId, setMerchantId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const handleQuery = async () => {
    if (!merchantId || !startDate || !endDate) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    setLoading(true);
    setError("");
    setStats(null);

    try {
      const payload = { merchantId, startDate, endDate };

      // 1. getUsages 함수 호출 시 'await'을 사용해야 합니다.
      const response = await getUsages(payload);

      if (!response || !response.data) {
        // 4xx, 5xx 에러 처리
        throw new Error("API 호출 실패");
      }

      const data = await response.data;

      // 3. 파싱된 JSON 데이터(data)를 상태에 저장합니다.
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류 발생");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-8">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="pretendard-semibold-20 mb-2">API 사용량 통계</h1>
        </div>

        {/* Query Form */}
        <div className="rounded-lg p-6 mb-8 border border-gray-200">
          <h2 className="pretendard-semibold-18 mb-1">조회 조건</h2>
          <p className=" text-gray-600 mb-6">
            조회할 기간과 고객사 ID를 입력하세요
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block  font-medium text-gray-700 mb-2">
                고객사 ID
              </label>
              <input
                type="text"
                placeholder="Merchant ID"
                value={merchantId}
                onChange={(e) => setMerchantId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block  font-medium text-gray-700 mb-2">
                시작일
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block  font-medium text-gray-700 mb-2">
                종료일
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-2 rounded-md mb-4  border border-red-200">
              {error}
            </div>
          )}

          <button
            onClick={handleQuery}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? "조회 중..." : "조회"}
          </button>
        </div>

        {/* Stats Display */}
        {loading && <LoadingSpinner />}

        {stats && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <StatCard title="전체 호출" value={stats.totalCount} icon="📊" />
              <StatCard
                title="성공"
                value={stats.totalSuccessCount}
                icon="✅"
              />
              <StatCard
                title="4XX 오류"
                value={stats.totalClientErrorCount}
                icon="⚠️"
              />
              <StatCard
                title="5XX 오류"
                value={stats.totalServerErrorCount}
                icon="❌"
              />
              <StatCard
                title="예상 비용"
                value={`${stats.estimatedTotalCost.toFixed(2)}`}
                icon="💰"
                unit="원"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {stats.dailyUsages && stats.dailyUsages.length > 0 && (
                <UsageChart data={stats.dailyUsages} />
              )}
              {stats.totalCount > 0 && <StatusChart stats={stats} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
