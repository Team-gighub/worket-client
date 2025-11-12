import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import formatKRW from "@/app/utils/KRWFormatter";

const CustomBarChart = ({ chartData = [], type = "INCOME" }) => {
  const formattedData = chartData.map((item) => ({
    month: `${Number(item.month.split("-")[1])}월`, // "2025-09" → "9월"
    value: type === "INCOME" ? item.income : item.transactions,
  }));

  const COLORS = {
    primary: "#5E4FE4",
    pointPurple100: "#E6E4FF",
  };

  return (
    <div className="h-[35rem] select-none">
      <ResponsiveContainer>
        <BarChart
          data={formattedData}
          barCategoryGap="30%"
          style={{ pointerEvents: "none" }} // 클릭 방지
        >
          <XAxis dataKey="month" axisLine={{ stroke: "transparent" }} />
          <Bar
            dataKey="value"
            radius={[50, 50, 50, 50]}
            isAnimationActive={true}
          >
            {/*LabelList로 포맷팅된 값 표시 */}
            <LabelList
              dataKey="value"
              position="top"
              fontSize={14}
              fontWeight="bold"
              formatter={(value) => formatKRW(value)}
            />
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 2 ? COLORS.primary : COLORS.pointPurple100}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
