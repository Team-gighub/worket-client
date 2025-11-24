import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
  YAxis,
} from "recharts";
import formatKRW from "@/app/utils/KRWFormatter";

const CustomBarChart = ({ chartData = [], type = "INCOME" }) => {
  const formattedData = chartData.map((item) => ({
    month: `${Number(item.month.split("-")[1])}월`, // "2025-09" → "9월"
    value: type === "INCOME" ? item.incomes : item.transactions,
  }));
  // 1. 데이터의 최대값을 계산
  const maxValue = formattedData.reduce((max, item) => {
    return Math.max(max, item.value);
  }, 0);

  // 2. Y축의 최대 영역을 설정-레이블이 위로 넘치지 않도록
  const paddingFactor = 1.1;
  const yDomainMax = Math.ceil(maxValue * paddingFactor);

  const yDomain = [0, yDomainMax];
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
          {/* YAxis를 추가하고 domain을 설정하여 차트 영역을 확장 */}
          <YAxis hide={true} domain={yDomain} />
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
