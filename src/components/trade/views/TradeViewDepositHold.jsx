import TradeViewLayout from "@/components/layouts/TradeViewLayout";
import TradeStepIndicator from "../TradeStepIndicator";
import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";

const TradeViewDepositHold = () => {
  return (
    <TradeViewLayout>
      <InfoText
        mainTexts={["000(갑)님과 000(을)님의", "거래 페이지입니다."]}
        subText="작업이 완료되면 지급 확정을 눌러주세요. 누르기 전까지 대금이 안전하게 보관됩니다."
      />
      <TradeStepIndicator currentStep={3} />
      <MainButton text="지급 확정하기" />
    </TradeViewLayout>
  );
};

export default TradeViewDepositHold;
