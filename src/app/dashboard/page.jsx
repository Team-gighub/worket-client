"use client";
import "@/app/globals.css";
import InfoText from "@/components/common/InfoText";
import HomeButton from "@/components/home/Button";
import ContractImg from "@/assets/transaction-upload.png";
import ContractImg2 from "@/assets/transaction-create.png";
import { useRouter } from "next/navigation";
import MainButton from "@/components/common/MainButton";
import ProfitCard from "@/components/home/ProfitCard";
/* 로그인 후 홈화면 */
const Dashboard = () => {
  const router = useRouter();
  //해당 URL로 이동
  const handleUploadBtn = () => {
    router.push("/transactions/upload");
  };
  const handleCreateBtn = () => {
    router.push("/transactions/create");
  };
  //TODO : 후에 GET으로 가져와서 매핑 예정
  //현재는 임시로 데이터 추가
  const ExampleData = [
    { label: "체결 전", count: 0 },
    { label: "지급확정 대기", count: 1 },
    { label: "정산 예정", count: 3 },
  ];
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
          <ProfitCard
            userName="youn"
            profitAmount={10000}
            statusData={ExampleData}
          ></ProfitCard>
        </div>
        <MainButton text="바로 대출 신청하기" theme="secondary"></MainButton>
        <div className="flex mt-8 flex-row gap-8">
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

export default Dashboard;
