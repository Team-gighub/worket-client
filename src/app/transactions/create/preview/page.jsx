"use client";
import "@/app/globals.css";
import { React } from "react";
import DualButtons from "@/components/common/DualButtons";
import useBottomSheet from "@/hooks/useBottomSheet";
import PinBottomSheet from "@/components/common/PinBottomSheet";
import { useRouter } from "next/navigation";
import ContractInfo from "@/components/transactions/ContractInfo";

const CreateResultPage = () => {
  const router = useRouter();
  const { isOpen, open, close } = useBottomSheet();

  const handlePinConfirm = (pin) => {
    // TODO: PIN 검증 후 계약 생성 API 호출
  };

  return (
    <div>
      <ContractInfo />
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
