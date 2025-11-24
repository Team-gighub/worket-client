"use client";
import "@/app/globals.css";
import { useState, useEffect } from "react";
import InfoText from "@/components/common/InfoText";
import formatKRW from "../utils/KRWFormatter";
import CustomBarChart from "@/components/charts/CustomBarChart";
import contract_3d_icon from "@/assets/contract_3d_icon.png";
import Image from "next/image";
import { getStatistics } from "@/lib/api/client/statisticServices";

const Incomes = () => {
  const [type, setType] = useState("INCOME"); // INCOME | TRANSACTIONS
  const [data, setData] = useState(null);

  const handleTypeToggle = (clickedType) => {
    setType((prev) =>
      prev === clickedType
        ? clickedType === "INCOME"
          ? "TRANSACTIONS"
          : "INCOME"
        : clickedType,
    );
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getStatistics();
        const serverData = response.data;
        setData(serverData);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  if (!data) return <p>로딩중...</p>;
  const serverStatistics = data.statistics || [];
  // 1. 현재 날짜를 기준으로 최근 3개월의 "YYYY-MM" 문자열을 반환합니다.
  const getPastThreeMonths = () => {
    const dates = [];
    const today = new Date();

    // i=2: 지지난 달, i=1: 지난 달, i=0: 현재 달
    for (let i = 2; i >= 0; i--) {
      // month - i로 월을 계산하면 년도 경계(1월 -> 작년 12월)를 자동으로 처리
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const year = date.getFullYear();
      // getMonth()는 0부터 시작하므로 +1, 두 자리로 패딩
      const month = String(date.getMonth() + 1).padStart(2, "0");
      dates.push(`${year}-${month}`);
    }
    return dates; // [Month-2, Month-1, Current Month]
  };

  // 2. 서버 데이터와 비교하여 3개월치 데이터를 정규화하고, 없는 달은 0
  const normalizedChartData = (() => {
    const threeMonths = getPastThreeMonths();
    const serverDataMap = new Map();
    serverStatistics.forEach((item) => {
      serverDataMap.set(item.month, item);
    });

    // 3개월 배열을 순회하며 데이터가 있으면 사용, 없으면 0으로 된 객체를 반환
    return threeMonths.map((monthStr) => {
      if (serverDataMap.has(monthStr)) {
        return serverDataMap.get(monthStr);
      } else {
        return {
          month: monthStr,
          incomes: 0,
          transactions: 0,
        };
      }
    });
  })();

  // 이번달 통계자료 추출
  const currentMonthStr = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  const currentMonthProfit = serverStatistics.find(
    (item) => item.month === currentMonthStr,
  ) || { incomes: 0, transactions: 0 };

  const mainData = {
    INCOME: {
      mainTexts: [
        "이번 달 정산된 소득액은",
        `${formatKRW(currentMonthProfit.incomes)}원`,
      ],
      subText: "소득액은 세전 기준으로 표시됩니다.",
    },
    TRANSACTIONS: {
      mainTexts: [
        "이번 달 완료된 거래 수는",
        `${formatKRW(currentMonthProfit.transactions)}건`,
      ],
      subText: "거래 수는 정산까지 완료된 건만 표시됩니다.",
    },
  };
  //연간 거래 띄우기
  const yearData = data.currentYearProfit || {
    incomes: 0,
    transactions: 0,
  };
  console.log(yearData);
  return (
    <div>
      {/* 타입 선택 버튼 */}
      <div className="flex justify-end max-w-[33.5rem] mx-auto">
        <div className="rounded-full border">
          <button
            className={`pretendard-medium-12 px-4 py-2 rounded-full ${
              type === "INCOME"
                ? "bg-point-purple-100 text-basic-600"
                : "text-basic-400"
            }`}
            onClick={() => handleTypeToggle("INCOME")}
          >
            소득액
          </button>
          <button
            className={`pretendard-medium-12 px-4 py-2 rounded-full ${
              type === "TRANSACTIONS"
                ? "bg-point-purple-100 text-basic-600"
                : "text-basic-400"
            }`}
            onClick={() => handleTypeToggle("TRANSACTIONS")}
          >
            거래수
          </button>
        </div>
      </div>

      {/* 이번 달 데이터 */}
      <InfoText
        mainTexts={mainData[type].mainTexts}
        subText={mainData[type].subText}
      />

      {/* 최근 3개월간 추이 그래프 */}
      <CustomBarChart chartData={normalizedChartData} type={type} />

      {/* 연간 총합 */}
      <div className="max-w-[33.5rem] mx-auto my-[2rem] flex justify-center">
        <div className="pretendard-semibold-20 flex-center ">
          {new Date().getFullYear()}년{" "}
          {type === "INCOME" ? "소득액 " : "거래수 "}
          {formatKRW(
            type === "INCOME" ? yearData.incomes : yearData.transactions,
          )}
          {type === "INCOME" ? "원" : "건"}
        </div>
      </div>

      {/* TODO: 광고 배너 */}
      <div className="rounded-lg m-10 flex items-center p-10 gap-5 shadow-md">
        <div className="max-w-[33.5rem] mx-auto my-[2rem] flex flex-col justify-center">
          <div className="pretendard-semibold-16 flex-center ">
            연 소득 3,400만원 이상이라면,
          </div>
          <div className="pretendard-medium-14">
            금리 2.7%의 대출이 가능해요!
          </div>
          <div className="pretendard-medium-14 text-point-purple-300">
            우리은행에서 소득 서류없이 대출받기
          </div>
        </div>
        <Image
          src={contract_3d_icon}
          alt="contract icon"
          width={50}
          // height={50}]
        />
      </div>
    </div>
  );
};

export default Incomes;
