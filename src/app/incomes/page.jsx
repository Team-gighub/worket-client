"use client";
import "@/app/globals.css";
import { useState, useEffect } from "react";
import InfoText from "@/components/common/InfoText";
import formatKRW from "../utils/KRWFormatter";
import CustomBarChart from "@/components/charts/CustomBarChart";
import contract_3d_icon from "@/assets/contract_3d_icon.png";
import Image from "next/image";
import fetchIncomes from "../api/fetchIncomes";

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
        const serverData = await fetchIncomes();
        setData(serverData);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  if (!data) return <p>로딩중...</p>;

  const mainData = {
    INCOME: {
      mainTexts: [
        "이번 달 정산된 소득액은",
        `${formatKRW(data.currentMonth.income)}원`,
      ],
      subText: "소득액은 세전 기준으로 표시됩니다.",
    },
    TRANSACTIONS: {
      mainTexts: [
        "이번 달 완료된 거래 수는",
        `${formatKRW(data.currentMonth.transactions)}건`,
      ],
      subText: "거래 수는 정산까지 완료된 건만 표시됩니다.",
    },
  };

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
      <CustomBarChart chartData={data.last3Months} type={type} />

      {/* 연간 총합 */}
      <div className="max-w-[33.5rem] mx-auto my-[2rem] flex justify-center">
        <div className="pretendard-semibold-20 flex-center ">
          2025년 {type === "INCOME" ? "소득액 " : "거래수 "}
          {formatKRW(
            type === "INCOME"
              ? data.yearlySummary.income
              : data.yearlySummary.transactions,
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
