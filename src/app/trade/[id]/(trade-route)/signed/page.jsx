"use client";

import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";
import { useTradeDataStore } from "@/stores/tradeDataStore";
import { useParams, useRouter } from "next/navigation";

const TradeSigned = () => {
  const router = useRouter();
  const { id: tradeId } = useParams();

  const { data: tradeData, updateTradeStatus } = useTradeDataStore();

  const handleSignClick = () => {
    if (tradeId) {
      updateTradeStatus("SIGNED");
      router.push(`/trade/${tradeId}`);
    } else {
      console.error("거래 ID를 찾을 수 없어 서명 페이지로 이동할 수 없습니다.");
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between items-center pb-[3rem] px-[2rem]">
      <InfoText
        mainTexts={[
          `${tradeData?.clientInfo.name}님과 ${tradeData?.freelancerInfo.name}님의 계약이 성사되었어요.`,
          "에스크로로 안전하게 결제를 완료해보세요.",
        ]}
        subText="결제금액은 은행이 안전하게 보관하며, 지급 확정 시 프리랜서에게 전달됩니다"
      />
      <MainButton text="선결제 진행하기" onClick={handleSignClick} />
    </div>
  );
};

export default TradeSigned;
