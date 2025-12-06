// components/admin/ExperienceBarChart.jsx

"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// data 구조: [{ level: "1년 미만", count: 1000 }, ...]
const ExperienceBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-400 p-10">데이터가 없습니다.</div>
    );
  }

  // 폰트 스타일 정의
  const fontStyle = {
    fontFamily: "Pretendard, sans-serif",
    fontSize: 14,
    fontWeight: 600,
  };

  // Y축 및 Tooltip 포맷터 함수 정의 (정수 포맷)
  const countFormatter = (value) => value.toLocaleString();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        barCategoryGap="30%"
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e0e0e0"
        />
        {/* XAxis */}
        <XAxis
          dataKey="level"
          angle={-20}
          textAnchor="end"
          height={40}
          interval={0}
          stroke="#666"
          tickLine={false}
          style={fontStyle}
        />

        {/* ⭐️ YAxis: allowDecimals={false} 추가 */}
        <YAxis
          dataKey="count"
          stroke="#666"
          tickLine={false}
          style={fontStyle}
          tickFormatter={countFormatter}
          allowDecimals={false} // ⭐️ 소수점 눈금 생성을 막고 정수만 표시
        />

        {/* Tooltip */}
        <Tooltip
          formatter={(value) => [`${countFormatter(value)}명`, "프리랜서 수"]}
          contentStyle={{
            ...fontStyle,
            borderColor: "#ccc",
            borderRadius: "4px",
            backgroundColor: "white",
          }}
          itemStyle={fontStyle}
        />

        {/* count를 막대 그래프의 값으로 사용 */}
        <Bar
          dataKey="count"
          fill="#4f46e5"
          name="프리랜서 수"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExperienceBarChart;
