import "@/app/globals.css";
import { React } from "react";
import InfoText from "@/components/common/InfoText";
import InfoCard from "@/components/common/InfoCard";
import SignatureForm from "@/components/common/SignatureForm";
import DualButtons from "@/components/common/DualButtons";

const CreateResultPage = () => {
  /* TODO: 더미데이터 추후 수정 필요 */
  const contract_data = [
    { label: "계약명", value: "프로젝트명" },
    { label: "계약기간", value: "2025.07.01~2025.12.12" },
    { label: "계약금액", value: "300,000원" },
  ];

  const contractor_data = [
    { label: "성함", value: "이름" },
    { label: "전화번호", value: "010-1234-4567" },
  ];

  const contractee_data = [
    { label: "성함", value: "이름" },
    { label: "전화번호", value: "010-7894-4568" },
    { label: "계좌번호", value: "우리은행 1234-456-789789" },
  ];

  return (
    <div>
      <InfoText
        mainTexts={[
          "계약서를 다 만들었어요",
          "아래 정보가 맞는지 확인해주세요",
        ]}
        subText="잘못된 경우 다시 작성해주세요"
      ></InfoText>
      <InfoCard title="계약 정보" items={contract_data}></InfoCard>
      <InfoCard title="도급인 정보" items={contractor_data}></InfoCard>
      <InfoCard title="수급인 정보" items={contractee_data}></InfoCard>
      <SignatureForm />
      <DualButtons
        mainText="생성하기"
        subText="수정"
        width="34rem"
      ></DualButtons>
    </div>
  );
};

export default CreateResultPage;
