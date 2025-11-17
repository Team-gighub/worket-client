"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const COLORS = {
  CREATED: "#FF675C", // point-red-200
  SIGNED: "#6BD3AD", // point-green-200
  DEPOSIT_HOLD: "#99C9FF", // point-blue-200
  PAYMENT_CONFIRMED: "#FAD55C", // point-yellow-200
  SETTLED: "#d9d9d9", // basic-300
};

const TransactionStatusChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={60}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" domain={[0, 100]} hide />
        <YAxis type="category" dataKey="type" hide />
        {Object.keys(data[0])
          .filter((key) => key !== "type")
          .map((key, index, arr) => {
            // 실제 값이 있는 항목만 추출
            const nonZeroKeys = arr.filter(
              (k) => k !== "type" && data[0][k] > 0,
            );
            const firstKey = nonZeroKeys[0];
            const lastKey = nonZeroKeys[nonZeroKeys.length - 1];

            return (
              <Bar
                key={key}
                dataKey={key}
                stackId="statusPercentage"
                fill={COLORS[key]}
                barSize={20}
                radius={
                  data[0][key] === 0
                    ? [0, 0, 0, 0] // 값이 0이면 둥글게 안함
                    : key === firstKey
                      ? [7, 0, 0, 7] // 첫 번째 실제 값
                      : key === lastKey
                        ? [0, 7, 7, 0] // 마지막 실제 값
                        : [0, 0, 0, 0]
                }
              />
            );
          })}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TransactionStatusChart;
