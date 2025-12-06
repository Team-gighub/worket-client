"use client";
import "@/app/globals.css";
import InfoText from "@/components/common/InfoText";
import HomeButton from "@/components/home/Button";
import ContractImg from "@/assets/transaction-upload.png";
import ContractImg2 from "@/assets/transaction-create.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MainButton from "@/components/common/MainButton";
import ProfitCard from "@/components/home/ProfitCard";
import { useTransactionStore } from "@/stores/transactionStore";
import { getUsers } from "@/lib/api/client/userServices";
import { useContractCreateStore } from "@/stores/contractCreateStore";
import MainBanner from "../MainBanner";
import WorketIcon from "@/assets/worketIcon.png";
import Header from "@/components/common/Header";
import HomeHeader from "../HomeHeader";

/* 로그인 후 홈화면 */
const LoggedInHome = () => {
  const { transactionData, fetchTransactions } = useTransactionStore();
  const { setFreelancerInfo } = useContractCreateStore();

  const [name, setName] = useState("");
  //초기 데이터 패칭(이후 계약서 생성 시 사용)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. ('users/me')호출
        const response = await getUsers();

        // 2. 응답 데이터 추출(휴대폰, 이름 추출)
        const phone = response.data.phone;
        const username = response.data.name;
        setName(username);

        // 3. 저장
        setFreelancerInfo(username, phone);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
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

  //원하는 status만 가져오기 위한 함수
  const getCountByStatus = (counts, targetStatus) => {
    if (!counts || !Array.isArray(counts)) return 0;

    const foundItem = counts.find((item) => item.status === targetStatus);
    return foundItem ? foundItem.count : 0;
  };

  //statusCounts 가져오기
  const statusCounts = transactionData?.statusCounts || [];
  // 총 수익 금액
  const profitAmount = transactionData?.totalAmount || 0;
  //계약 체결 전
  const createdCount = getCountByStatus(statusCounts, "CREATED");
  // 지급 확정 대기
  const depositHoldCount = getCountByStatus(statusCounts, "DEPOSIT_HOLD");
  //정산 예정
  const paymentConfirmedCount = getCountByStatus(
    statusCounts,
    "PAYMENT_CONFIRMED",
  );

  // ProfitCard에 전달할 {label, count} 형식의 배열
  const selectedStatusData = [
    { label: "체결 전", count: createdCount },
    { label: "지급 확정 대기", count: depositHoldCount },
    { label: "정산 예정", count: paymentConfirmedCount },
  ];

  return (
    <div className="h-full flex flex-col items-center">
      <HomeHeader title="WORKET" />
      <MainBanner
        title={"계약부터 소득증빙까지,\n워켓에서 한 번에!"}
        subtitle={"별도 서류 없이 신뢰도 높은 소득증빙"}
        titleColor="text-primary"
        subtitleColor="text-basic-500"
        icon={{
          src: WorketIcon,
          alt: "계약서 업로드",
        }}
        className="mt-[8rem]"
      />
      <div className="flex flex-col items-center w-full max-w-[32rem] px-4 mt-6">
        <div className="w-full mb-6 mx-auto">
          <ProfitCard
            userName={name}
            profitAmount={profitAmount}
            statusData={selectedStatusData}
          ></ProfitCard>
        </div>
        <div className="flex mt-6 mb-6 gap-8">
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
        <MainButton text="바로 대출 신청하기" theme="secondary"></MainButton>
      </div>
    </div>
  );
};

export default LoggedInHome;
