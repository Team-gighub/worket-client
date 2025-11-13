"use client";

import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";
import { useTradeDataStore } from "@/stores/tradeDataStore";
import { useParams, useRouter } from "next/navigation";

const TradeConfirm = () => {
  const router = useRouter();
  const params = useParams();

  const tradeId = params.id;

  const { data: tradeData, updateTradeStatus } = useTradeDataStore();
  const { clientInfo, freelancerInfo } = tradeData;

  const handleClick = () => {
    if (tradeId) {
      updateTradeStatus("PAYMENT_CONFIRMED");
      router.push(`/trade/${tradeId}`);
    } else {
      console.error("거래 ID를 찾을 수 없어 서명 페이지로 이동할 수 없습니다.");
    }
  };
  return (
    <div className="h-full w-full flex flex-col justify-between items-center pb-[3rem] px-[2rem]">
      <InfoText
        mainTexts={[
          `${clientInfo.name}님, ${freelancerInfo.name}님과의 거래가 완료되었다면,`,
          "지급 확정 버튼을 눌러주세요",
        ]}
        subText="지급 확정 후 빠른 시일내에 프리랜서에게 돈이 지급됩니다."
      />
      <MainButton text="지급 확정하기" onClick={handleClick} />
    </div>
  );
};

export default TradeConfirm;
