import InfoText from "@/components/common/InfoText";
import TradeViewLayout from "@/components/layouts/TradeViewLayout";
import TradeStepIndicator from "../TradeStepIndicator";
import { getTransactionsPreview } from "@/lib/api/server/transactionServices";
import TradeLogin from "../TradeLogin";

const TradeViewLoginRequired = async ({ id }) => {
  const { data } = await getTransactionsPreview(id);
  return (
    <TradeViewLayout>
      <InfoText
        mainTexts={[
          `${data.clientName}님과 ${data.freelancerName}님의`,
          "거래 페이지입니다.",
        ]}
        subText="거래를 시작하기 전, 본인인증을 진행해주세요"
      />
      <TradeStepIndicator currentStep={0} />
      <TradeLogin />
    </TradeViewLayout>
  );
};

export default TradeViewLoginRequired;
