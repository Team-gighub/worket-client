"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const UsageChart = ({ data }) => {
  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
    }),
    성공: item.totalSuccessCount,
    "4XX 오류": item.totalClientErrorCount,
    "5XX 오류": item.totalServerErrorCount,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        일자별 API 호출
      </h3>
      <p className="text-sm text-gray-600 mb-4">일일 호출 현황</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="성공" stackId="a" fill="#10b981" />
          <Bar dataKey="4XX 오류" stackId="a" fill="#f59e0b" />
          <Bar dataKey="5XX 오류" stackId="a" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
