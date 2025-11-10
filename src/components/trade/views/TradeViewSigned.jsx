"use client";

import TradeViewLayout from "@/components/layouts/TradeViewLayout";
import TradeStepIndicator from "../TradeStepIndicator";
import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";
import { useTradeDataStore } from "@/stores/tradeDataStore";

const TradeViewSigned = () => {
  const { tradeData, updateTradeStatus } = useTradeDataStore();
  const { clientName, freelancerName } = tradeData;

  const handleClick = () => {
    updateTradeStatus("DEPOSIT_HOLD");
  };

  return (
    <TradeViewLayout>
      <InfoText
        mainTexts={[
          `${clientName}님과 ${freelancerName}님의`,
          "거래 페이지입니다.",
        ]}
        subText="에스크로로 안전하게 대금을 예치해주세요"
      />
      <TradeStepIndicator currentStep={2} />
      <MainButton text="대금 예치하기" onClick={handleClick} />
    </TradeViewLayout>
  );
};

export default TradeViewSigned;
