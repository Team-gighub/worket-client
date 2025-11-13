"use client";
import MainButton from "@/components/common/MainButton";
import { useTradeDataStore } from "@/stores/tradeDataStore";

const TradeSignedViewButton = () => {
  const { updateTradeStatus } = useTradeDataStore();

  const handleClick = () => {
    // TODO: PG에 api요청하는 로직 추가
    // 현재는 상태만 업데이트
    updateTradeStatus("DEPOSIT_HOLD");
  };

  return <MainButton text="대금 예치하기" onClick={handleClick} />;
};

export default TradeSignedViewButton;
