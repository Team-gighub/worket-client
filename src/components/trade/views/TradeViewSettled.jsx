import TradeViewLayout from "@/components/layouts/TradeViewLayout";
import TradeStepIndicator from "../TradeStepIndicator";
import InfoText from "@/components/common/InfoText";

const TradeViewSettled = () => {
  return (
    <TradeViewLayout>
      <InfoText
        mainTexts={["000(갑)님과 000(을)님의", "거래 페이지입니다."]}
        subText="대금 지급이 완료되었어요! 거래가 성공적으로 마무리되었습니다."
      />
      <TradeStepIndicator currentStep={5} />
    </TradeViewLayout>
  );
};

export default TradeViewSettled;
