"use client";

import TradeViewCreated from "@/components/trade/views/TradeViewCreated";
import TradeViewSigned from "@/components/trade/views/TradeViewSigned";
import TradeViewDepositHold from "@/components/trade/views/TradeViewDepositHold";
import TradeViewPaymentConfirmed from "@/components/trade/views/TradeViewPaymentConfirmed";
import TradeViewSettled from "@/components/trade/views/TradeViewSettled";
import { useTradeDataStore } from "@/stores/tradeDataStore";

const TradeViewSelector = () => {
  const { tradeData } = useTradeDataStore();

  if (!tradeData?.status) {
    // 상태가 아직 주입되지 않았을 경우, 로딩 또는 대체 텍스트 표시
    return <p>거래 상태를 불러오는 중입니다...</p>;
  }

  // 3. 상태에 따른 뷰 분기
  switch (tradeData?.status) {
    case "CREATED":
      return <TradeViewCreated />;
    case "SIGNED":
      return <TradeViewSigned />;
    case "DEPOSIT_HOLD":
      return <TradeViewDepositHold />;
    case "PAYMENT_CONFIRMED":
      return <TradeViewPaymentConfirmed />;
    case "SETTLED":
      return <TradeViewSettled />;
    default:
      // tradeId를 사용하여 오류 메시지 구성
      return <p>{tradeId || "해당"} 거래의 상태를 불러올 수 없습니다</p>;
  }
};

export default TradeViewSelector;
