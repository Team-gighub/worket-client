"use client";
import "@/app/globals.css";
import { React } from "react";
import SignatureForm from "@/components/common/SignatureForm";
import { useRouter } from "next/navigation";
import MainButton from "@/components/common/MainButton";
import ContractInfo from "@/components/transactions/ContractInfo";
import InfoText from "@/components/common/InfoText";
import useSessionStorage from "@/hooks/useSessionStorage";
import useSignature from "@/hooks/useSignature";

const CreateResultPage = () => {
  const router = useRouter();

  const [transactionId] = useSessionStorage("transactionId");
  const { fetchSignUrl } = useSignature();

  const handleMainBtn = async () => {
    if (transactionId) {
      const contractId = sessionStorage.getItem("contractId");
      await fetchSignUrl(contractId);
      //거래 링크 페이지로 이동
      router.push(`/transactions/${transactionId}/create-link`);
    } else {
      console.error("❌ Response does not contain a valid transaction ID.");
    }
  };
  return (
    <div>
      <InfoText
        mainTexts={["계약서를 만드는 중이에요", "마지막 단계예요!"]}
        subText="잘못된 경우 다시 작성해주세요"
      />
      <ContractInfo />
      <SignatureForm userRole="FREELANCER" />
      <MainButton
        text="생성하기"
        width="34rem"
        onClick={handleMainBtn}
      ></MainButton>
    </div>
  );
};

export default CreateResultPage;
