"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// data 구조: [{ field: "웹/앱 개발자", count: 4500 }, ...]

// 색상 팔레트 정의
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF197C",
];

const IndustryPieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-400 p-10">데이터가 없습니다.</div>
    );
  }

  const chartData = data.map((item) => ({
    name: item.field,
    value: item.count,
  }));

  // Tooltip에 표시될 내용을 포맷팅 (예: "4,500명")
  const renderTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border border-gray-300 rounded-md shadow-lg pretendard-semibold-14">
          <p className="pretendard-semibold-14">{payload[0].name}</p>
          <p className="pretendard-semibold-14">{`${payload[0].value.toLocaleString()}명`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60} // 도넛 형태로 만들기 위한 내부 반지름
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={3} // 섹션 간격
        >
          {/* 각 섹션에 대해 정의된 색상 할당 */}
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={renderTooltip} />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          wrapperStyle={{ paddingLeft: "20px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default IndustryPieChart;
