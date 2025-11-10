"use client";
import "@/app/globals.css";
import { React } from "react";
import InfoText from "@/components/common/InfoText";
import InfoCard from "@/components/common/InfoCard";
import DualButtons from "@/components/common/DualButtons";
import { useContractCreateStore } from "@/stores/contractCreateStore";
import useBottomSheet from "@/hooks/useBottomSheet";
import PinBottomSheet from "@/components/common/PinBottomSheet";
import { useRouter } from "next/navigation";

const CreateResultPage = () => {
  const router = useRouter();
  const { isOpen, open, close } = useBottomSheet();
  const handlePinConfirm = (pin) => {
    // TODO: PIN 검증 후 계약 생성 API 호출
  };

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
        mainTexts={[
          "계약서를 만드는 중이에요",
          "아래 정보가 맞는지 확인해주세요",
        ]}
        subText="잘못된 경우 다시 작성해주세요"
      ></InfoText>
      <InfoCard title="계약 정보" items={contract_data}></InfoCard>
      <InfoCard title="도급인 정보" items={contractor_data}></InfoCard>
      <InfoCard title="수급인 정보" items={contractee_data}></InfoCard>
      <DualButtons
        mainText="생성하기"
        subText="수정"
        width="34rem"
        onMainClick={() => open()}
        onSubClick={() => router.push("/transactions/create")}
      ></DualButtons>
      <PinBottomSheet
        isOpen={isOpen}
        onClose={close}
        onConfirm={handlePinConfirm}
      />
    </div>
  );
};

export default CreateResultPage;
