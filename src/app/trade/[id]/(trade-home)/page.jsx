"use client";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import TradeViewSelector from "@/components/trade/TradeViewSelector";
import { useTradeDataStore } from "@/stores/tradeDataStore";

const TradePage = () => {
  const { data } = useTradeDataStore();
  if (!data) {
    return <LoadingSpinner />;
  }
  return <TradeViewSelector data={data} />;
};

export default TradePage;
