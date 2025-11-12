"use client";
import MainButton from "@/components/common/MainButton";
import { useTradeDataStore } from "@/stores/tradeDataStore";

const TradeViewSigned = () => {
  const { tradeData, updateTradeStatus } = useTradeDataStore();

  const handleClick = () => {
    updateTradeStatus("DEPOSIT_HOLD");
  };

  return <MainButton text="대금 예치하기" onClick={handleClick} />;
};

export default TradeViewSigned;
