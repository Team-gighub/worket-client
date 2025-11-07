"use client";

import TradeViewLayout from "@/components/layouts/TradeViewLayout";
import TradeStepIndicator from "../TradeStepIndicator";
import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";

const TradeViewCreated = () => {
  return (
    <TradeViewLayout>
      <InfoText
        mainTexts={["000(갑)님과 000(을)님의", "거래 페이지입니다."]}
        subText="계약서에 서명을 진행해주세요"
      />
      <TradeStepIndicator currentStep={1} />
      <MainButton text="계약서 서명하기" onClick={() => {}} />
    </TradeViewLayout>
  );
};

export default TradeViewCreated;
