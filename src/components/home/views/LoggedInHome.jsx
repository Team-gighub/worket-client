"use client";
import "@/app/globals.css";
import InfoText from "@/components/common/InfoText";
import HomeButton from "@/components/home/Button";
import ContractImg from "@/assets/transaction-upload.png";
import ContractImg2 from "@/assets/transaction-create.png";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MainButton from "@/components/common/MainButton";
import ProfitCard from "@/components/home/ProfitCard";
import { getTransactions } from "@/lib/api/client/transactionServices";
import { useTradeDataStore } from "@/stores/tradeDataStore";
import { useTransactionStore } from "@/stores/transactionStore";
// const processTradeData = (transactions) => {
//   // transactions가 유효한 배열이 아니면 빈 배열로 간주
//   const validTransactions = Array.isArray(transactions) ? transactions : [];

//   // 1. Profit Amount (총 수익 금액) 계산
//   // 가정: 거래 객체에 'amount' 필드가 있고, 이는 수익을 나타냄
//   const profitAmount = validTransactions.reduce(
//     (sum, trade) => sum + (trade.amount || 0),
//     0,
//   );

//   // 2. Status Data (거래 상태별 요약 데이터) 계산 및 배열로 변환
//   // ProfitCard는 [{ label, count }, ...] 형태의 배열을 기대합니다.

//   // 임시 상태 카운트 (실제 trade.status 필드를 기반으로 로직을 구현해야 합니다.)
//   const totalCount = validTransactions.length;
//   const completedCount = validTransactions.filter(
//     (trade) => trade.status === "COMPLETED",
//   ).length; // 예시 상태
//   const pendingCount = totalCount - completedCount;

//   const statusData = [
//     { label: "총 거래 건수", count: totalCount },
//     { label: "체결 완료", count: completedCount },
//     { label: "처리 대기", count: pendingCount },
//     // 필요한 다른 상태가 있다면 여기에 추가
//   ];

//   return { profitAmount, statusData };
// };
/* 로그인 후 홈화면 */
const LoggedInHome = () => {
  const {
    transactionData,
    fetchTransactions,
    setSelectedMonth,
    selectedFilter,
    setSelectedFilter,
  } = useTransactionStore();

  useEffect(() => {
    if (!transactionData) {
      const now = new Date();
      fetchTransactions({
        year: now.getFullYear(),
        month: now.getMonth() + 1,
      });
    }
  }, []);
  const router = useRouter();
  //해당 URL로 이동
  const handleUploadBtn = () => {
    router.push("/transactions/upload");
  };
  const handleCreateBtn = () => {
    router.push("/transactions/create");
  };

  //  const data = useTransactionStore((state) => state.fetchTransactions);
  //console.log(data);
  //const transactionData = useTransactionStore((state) => state.transactionData);

  //const { totalAmount, statusCounts, contractList } = transactionData;

  console.log(transactionData);
  //const { profitAmount, statusData } = processTradeData(data);
  //console.log(transInfo);
  return (
    <div className="h-full flex flex-col items-center">
      {/* TODO : 후에 설명 확정 시 변경 */}
      <InfoText
        mainTexts={["우리는 워켓!"]}
        subText={"워켓이 자동으로 정보를 읽어서 등록해드려요!"}
        subTextColor="gray"
      ></InfoText>
      <div className="flex flex-col items-center w-full max-w-[32rem] px-4 mt-6">
        <div className="w-full mb-6 mx-auto">
          {/* TODO : /dashboard 접근 시 GET으로 정보 가져와서 매핑 */}
          {/* <ProfitCard
            userName="youn"
            profitAmount={10000} // 👈 계산된 총 수익 금액
            //statusData={statusData}
          ></ProfitCard> */}
        </div>
        <MainButton text="바로 대출 신청하기" theme="secondary"></MainButton>
        <div className="flex mt-8 gap-8">
          <HomeButton
            title="이미 체결된 계약서"
            subtitle="업로드하기"
            titleColor="text-primary"
            subtitleColor="text-primary"
            icon={{
              src: ContractImg,
              alt: "계약서 업로드",
            }}
            onClick={handleUploadBtn}
          />
          <HomeButton
            title="새로운 계약서"
            subtitle="생성하기"
            titleColor="text-point-red-200"
            subtitleColor="text-point-red-200"
            icon={{
              src: ContractImg2,
              alt: "계약서 생성",
            }}
            onClick={handleCreateBtn}
          />
        </div>
      </div>
    </div>
  );
};

export default LoggedInHome;
