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
import { useSignatureStore } from "@/stores/signatureStore"; // 👈 스토어 import

const CreateResultPage = () => {
  const router = useRouter();

  const [transactionId] = useSessionStorage("transactionId");
  const { postSignature, fetchSignUrl } = useSignature();
  const { tempSignatureData } = useSignatureStore();

  const handleMainBtn = async () => {
    if (!transactionId) {
      console.error("❌ Response does not contain a valid transaction ID.");
      return;
    }

    // 1. 서명 데이터 유무 확인
    if (!tempSignatureData) {
      alert("서명란을 클릭하여 서명을 먼저 완료해주세요.");
      return;
    }

    const contractId = sessionStorage.getItem("contractId");

    try {
      // 2. 서명 데이터 (Base64)를 서버 POST, S3 업로드
      const isPosted = await postSignature(
        contractId,
        "FREELANCER",
        tempSignatureData,
      );

      if (isPosted) {
        await fetchSignUrl(contractId);
        // 거래 링크 페이지로 이동
        router.push(`/transactions/${transactionId}/create-link`);
      }
    } catch (error) {
      console.error("최종 계약서 생성 중 오류 발생:", error);
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
