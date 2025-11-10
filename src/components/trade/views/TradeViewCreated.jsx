"use client";

import TradeViewLayout from "@/components/layouts/TradeViewLayout";
import TradeStepIndicator from "../TradeStepIndicator";
import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";
import { useParams, useRouter } from "next/navigation";
import { useTradeDataStore } from "@/stores/tradeDataStore";

const TradeViewCreated = () => {
  const router = useRouter();
  const params = useParams();
  const tradeId = params.id;

  const { tradeData } = useTradeDataStore();
  const { clientName, freelancerName } = tradeData;

  const handleSignClick = () => {
    if (tradeId) {
      // 2. 획득한 ID를 사용하여 목표 경로 구성 및 이동
      router.push(`/trade/${tradeId}/sign`);
    } else {
      // ID가 없을 경우 에러 처리 (URL 구조가 잘못되었을 때 발생 가능)
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
        subText="계약서에 서명을 진행해주세요"
      />
      <TradeStepIndicator currentStep={1} />
      <MainButton text="계약서 서명하기" onClick={handleSignClick} />
    </TradeViewLayout>
  );
};

export default TradeViewCreated;
