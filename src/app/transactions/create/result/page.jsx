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
  //sesstionStorage 에서 값 추출
  const transactionId = sessionStorage.getItem("transactionId");

  const handleMainBtn = () => {
    if (transactionId) {
      //거래 링크 페이지로 이동
      router.push(`/transactions/${transactionId}/create-link`);
    } else {
      console.error("❌ Response does not contain a valid transaction ID.");
      // 선택 : ID가 없을 경우 대비 로직 추가
      // alert("계약서 등록 후 ID를 받지 못했습니다.");
    }
  };
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
        onClick={handleMainBtn}
      ></MainButton>
    </div>
  );
};

export default CreateResultPage;
