"use client";
import "@/app/globals.css";
import { React } from "react";
import InfoText from "@/components/common/InfoText";
import InfoCard from "@/components/common/InfoCard";
import SignatureForm from "@/components/common/SignatureForm";
import { useContractCreateStore } from "@/stores/contractCreateStore";
import { useRouter } from "next/navigation";
import MainButton from "@/components/common/MainButton";

const CreateResultPage = () => {
  const router = useRouter();
  /* 데이터 포맷팅을 위한 함수 */
  const formatPhone = (phone) => {
    if (!phone) return "";
    return phone.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  };
  const formatAmount = (amount) => {
    if (!amount) return "";
    return Number(amount).toLocaleString(); // 123124 → 123,124
  };

  /* TODO: 프리랜서 개인정보 추후 수정 필요 */
  const { contract } = useContractCreateStore();

  const contract_data = [
    { label: "계약명", value: contract.title || "" },
    {
      label: "계약기간",
      value: `${contract.start_date} ~ ${contract.end_date}`,
    },
    { label: "계약금액", value: `${formatAmount(contract.amount)}원` },
  ];

  const contractor_data = [
    { label: "성함", value: contract.client_name || "" },
    { label: "전화번호", value: formatPhone(contract.client_phone) },
  ];

  const contractee_data = [
    { label: "성함", value: "이름" },
    { label: "전화번호", value: "010-7894-4568" },
    { label: "계좌번호", value: `${contract.bank} ${contract.account_number}` },
  ];

  return (
    <div>
      <InfoText
        mainTexts={["계약서를 다 만들었어요", "마지막 단계예요!"]}
        subText="서명란을 선택하여 서명을 진행해주세요"
      ></InfoText>
      <InfoCard title="계약 정보" items={contract_data}></InfoCard>
      <InfoCard title="도급인 정보" items={contractor_data}></InfoCard>
      <InfoCard title="수급인 정보" items={contractee_data}></InfoCard>
      <SignatureForm />
      <MainButton
        text="생성하기"
        width="34rem"
        // TODO: 생성하기 클릭 시, 거래 링크 생성 페이지로 이동
      ></MainButton>
    </div>
  );
};

export default CreateResultPage;
