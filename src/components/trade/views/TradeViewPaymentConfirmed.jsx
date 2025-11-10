import TradeViewLayout from "@/components/layouts/TradeViewLayout";
import TradeStepIndicator from "../TradeStepIndicator";
import InfoText from "@/components/common/InfoText";
import { useTradeDataStore } from "@/stores/tradeDataStore";

const TradeViewPaymentConfirmed = () => {
  const { tradeData } = useTradeDataStore();
  const { clientName, freelancerName } = tradeData;
  return (
    <TradeViewLayout>
      <InfoText
        mainTexts={[
          `${clientName}님과 ${freelancerName}님의`,
          "거래 페이지입니다.",
        ]}
        subText="지급 확정을 누르셨어요! 빠른 시일 내에 대금이 전달될 거예요."
      />
      <TradeStepIndicator currentStep={4} />
    </TradeViewLayout>
  );
};

export default TradeViewPaymentConfirmed;
