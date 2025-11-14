"use client";
import "@/app/globals.css";
import { React } from "react";
import SignatureForm from "@/components/common/SignatureForm";
import { useRouter } from "next/navigation";
import MainButton from "@/components/common/MainButton";
import ContractInfo from "@/components/transactions/ContractInfo";
import InfoText from "@/components/common/InfoText";

const CreateResultPage = () => {
  const router = useRouter();

  return (
    <div>
      <InfoText
        mainTexts={["계약서를 만드는 중이에요", "마지막 단계예요!"]}
        subText="잘못된 경우 다시 작성해주세요"
      />
      <ContractInfo />
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
