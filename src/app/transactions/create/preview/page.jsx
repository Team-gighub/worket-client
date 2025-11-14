"use client";
import "@/app/globals.css";
import { React } from "react";
import DualButtons from "@/components/common/DualButtons";
import useBottomSheet from "@/hooks/useBottomSheet";
import PinBottomSheet from "@/components/common/PinBottomSheet";
import { useRouter } from "next/navigation";
import ContractInfo from "@/components/transactions/ContractInfo";
import InfoText from "@/components/common/InfoText";

const CreateResultPage = () => {
  const router = useRouter();
  const { isOpen, open, close } = useBottomSheet();

  return (
    <div>
      <InfoText
        mainTexts={[
          "계약서를 만드는 중이에요",
          "아래 정보가 맞는지 확인해주세요",
        ]}
        subText="잘못된 경우 다시 작성해주세요"
      />
      <ContractInfo />
      <DualButtons
        mainText="생성하기"
        subText="수정"
        width="34rem"
        onMainClick={() => open()}
        onSubClick={() => router.push("/transactions/create")}
      ></DualButtons>
      <PinBottomSheet isOpen={isOpen} onClose={close} />
    </div>
  );
};

export default CreateResultPage;
