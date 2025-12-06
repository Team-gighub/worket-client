"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export const StatusChart = ({ stats }) => {
  const data = [
    { name: "성공 (2xx)", value: stats.totalSuccessCount, fill: "#10b981" },
    {
      name: "클라이언트 오류 (4xx)",
      value: stats.totalClientErrorCount,
      fill: "#f59e0b",
    },
    {
      name: "서버 오류 (5xx)",
      value: stats.totalServerErrorCount,
      fill: "#ef4444",
    },
  ];

  return (
    <div className=" rounded-lg p-6 border border-basic-300">
      <h3 className="pretendard-semibold-18 mb-1">응답 상태 분포</h3>
      <p className="pretendard-light-16 mb-4">상태코드별 호출 비율</p>
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
