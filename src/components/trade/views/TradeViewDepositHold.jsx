"use client";
import TradeViewLayout from "@/components/layouts/TradeViewLayout";
import TradeStepIndicator from "../TradeStepIndicator";
import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";
import { useParams, useRouter } from "next/navigation";
import { useTradeDataStore } from "@/stores/tradeDataStore";

const TradeViewDepositHold = () => {
  const router = useRouter();
  const params = useParams();
  const tradeId = params.id;

  const { tradeData } = useTradeDataStore();
  const { clientName, freelancerName } = tradeData;

  const handleClick = () => {
    if (tradeId) {
      router.push(`/trade/${tradeId}/confirm`);
    } else {
      console.error("거래 ID를 찾을 수 없어 서명 페이지로 이동할 수 없습니다.");
    }
  };
  return (
    <TradeViewLayout>
      <InfoText
        mainTexts={[
          `${clientName}님과 ${freelancerName}님의`,
          "거래 페이지입니다.",
        ]}
        subText="작업이 완료되면 지급 확정을 눌러주세요. 누르기 전까지 대금이 안전하게 보관됩니다."
      />
      <TradeStepIndicator currentStep={3} />
      <MainButton text="지급 확정하기" onClick={handleClick} />
    </TradeViewLayout>
  );
};

export default TradeViewDepositHold;
