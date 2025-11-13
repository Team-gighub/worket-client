import InfoText from "@/components/common/InfoText";
import TradeViewLayout from "@/components/layouts/TradeViewLayout";
import TradeStepIndicator from "../TradeStepIndicator";
import MainButton from "@/components/common/MainButton";
import { getTradeInfo } from "@/app/api/fetchTrade";

const TradeViewLoginRequired = async () => {
  const { clientName, freelancerName } = await getTradeInfo();
  return (
    <TradeViewLayout>
      <InfoText
        mainTexts={[
          `${clientName}님과 ${freelancerName}님의`,
          "거래 페이지입니다.",
        ]}
        subText="거래를 시작하기 전, 본인인증을 진행해주세요"
      />
      <TradeStepIndicator currentStep={0} />
      {/* TODO: client component로 따로 제작 후 클릭 액션 추가*/}
      <MainButton text="본인인증 하러가기" />
    </TradeViewLayout>
  );
};

export default TradeViewLoginRequired;
