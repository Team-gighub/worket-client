"use client";
import "@/app/globals.css";
import { React } from "react";
import SignatureForm from "@/components/common/SignatureForm";
import { useRouter } from "next/navigation";
import MainButton from "@/components/common/MainButton";
import ContractInfo from "@/components/transactions/ContractInfo";

const CreateResultPage = () => {
  const router = useRouter();

  return (
    <div>
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
