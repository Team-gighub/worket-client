"use client";

import { useEffect, useRef } from "react";
import { useTradeDataStore } from "@/stores/tradeDataStore";

const TradeDataHydrator = ({ initialData, children }) => {
  const { setTradeData } = useTradeDataStore();
  const hasHydrated = useRef(false);

  useEffect(() => {
    if (!hasHydrated.current) {
      setTradeData(initialData);
      hasHydrated.current = true;
      console.log("Trade data hydrated:", initialData);
    }
  }, [setTradeData]);

  return children;
};

export default TradeDataHydrator;
