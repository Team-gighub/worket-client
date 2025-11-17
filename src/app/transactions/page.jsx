"use client";

import { useEffect, useState } from "react";
import { useTransactionStore } from "@/stores/transactionStore";
import MonthSwitcher from "@/components/transactions/MonthSwitcher";
import TransactionStatusChart from "@/components/transactions/TransactionStatusChart";
import SelectBox from "@/components/common/SelectBox";
import TransactionItem from "@/components/transactions/TransactionItem";
import { formatDateDot, formatPeriod } from "../utils/dateFormatter";
import formatKRW from "../utils/KRWFormatter";

const TransactionsPage = () => {
  const {
    selectedMonth,
    transactionData,
    hasCurrentMonthData,
    fetchTransactions,
    setSelectedMonth,
  } = useTransactionStore();

  const [selectedFilter, setSelectedFilter] = useState("all");

  // 최초 진입 시: Store에 데이터 없으면 이번 달 패칭
  useEffect(() => {
    if (!hasCurrentMonthData()) {
      const now = new Date();
      fetchTransactions({
        year: now.getFullYear(),
        month: now.getMonth() + 1,
      });
    }
  }, []);

  // 월 변경 핸들러
  const handleMonthChange = async (newMonth) => {
    await setSelectedMonth(newMonth);
  };

  const { totalAmount, statusCounts, contractList } = transactionData;

  // 차트 데이터 계산
  const chartData = getStatusPercentageData(statusCounts);

  // 필터링된 거래 목록
  const filteredContracts =
    selectedFilter === "all"
      ? contractList
      : contractList.filter((c) => c.status === selectedFilter);

  return (
    <div className="flex flex-col mx-[2rem]">
      {/* 월 선택 */}
      <MonthSwitcher
        currentYear={selectedMonth.year}
        currentMonth={selectedMonth.month}
        onChange={handleMonthChange}
      />

      {/* 총액 */}
      <p className="pretendard-semibold-18 mt-[1rem]">
        {formatKRW(totalAmount)} 원
      </p>

      {/* 차트 */}
      <TransactionStatusChart data={chartData} />

      {/* 필터링 결과 거래 리스트 섹션 */}
      <div className="flex flex-col">
        <div className="w-[9rem]">
          <SelectBox
            options={[
              { value: "all", label: "전체" },
              { value: "CREATED", label: "서명대기" },
              { value: "SIGNED", label: "결제대기" },
              { value: "DEPOSIT_HOLD", label: "확정대기" },
              { value: "PAYMENT_CONFIRMED", label: "정산대기" },
              { value: "SETTLED", label: "거래종료" },
            ]}
            placeholder="전체"
            defaultValue="all"
            onChange={setSelectedFilter}
          />
        </div>

        <div className="flex flex-col gap-2">
          {filteredContracts.length === 0 ? (
            <p className="pretendard-medium-16 mt-6 text-basic-400 text-center">
              조회된 거래가 없습니다.
            </p>
          ) : (
            <>
              {filteredContracts.map((contract, index) => (
                <TransactionItem
                  key={contract.id || index}
                  status={contract.status}
                  title={contract.title}
                  period={
                    contract.endDate
                      ? formatPeriod(
                          contract.startDate,
                          contract.endDate,
                          formatDateDot,
                        )
                      : contract.startDate
                  }
                  amount={contract.amount}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;

// 상태별 비율 계산
const getStatusPercentageData = (statusCounts) => {
  const totalCount = statusCounts.reduce((sum, item) => sum + item.count, 0);

  if (totalCount === 0) {
    return [
      {
        type: "rate",
        CREATED: 0,
        SIGNED: 0,
        DEPOSIT_HOLD: 0,
        PAYMENT_CONFIRMED: 0,
        SETTLED: 100,
      },
    ];
  }

  const dataItem = { type: "rate" };
  const allStatuses = [
    "CREATED",
    "SIGNED",
    "DEPOSIT_HOLD",
    "PAYMENT_CONFIRMED",
    "SETTLED",
  ];

  allStatuses.forEach((status) => {
    const item = statusCounts.find((s) => s.status === status);
    dataItem[status] = item ? Math.round((item.count / totalCount) * 100) : 0;
  });

  return [dataItem];
};
