"use client";

import { useEffect, useState } from "react";
import { useClientTradeStatusStore } from "@/stores/clientTradeStatusStore";
import { useParams } from "next/navigation";
import TradeViewLoginRequired from "@/components/trade/views/TradeViewLoginRequired";
import TradeViewCreated from "@/components/trade/views/TradeViewCreated";
import TradeViewSigned from "@/components/trade/views/TradeViewSigned";
import TradeViewDepositHold from "@/components/trade/views/TradeViewDepositHold";
import TradeViewPaymentConfirmed from "@/components/trade/views/TradeViewPaymentConfirmed";
import TradeViewSettled from "@/components/trade/views/TradeViewSettled";

const Trade = () => {
  const { id } = useParams();
  const { status, fetchStatus } = useClientTradeStatusStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  /** 페이지 처음 진입 시 사용자의 상태 확인
   * 확인 중엔 로딩 화면 표시 */
  useEffect(() => {
    const fetchTradeStatus = async () => {
      setIsLoggedIn(true);
      await fetchStatus(id);
      setLoading(false);
    };

    fetchTradeStatus();
  }, [id]);

  /** 로딩 상태 처리 */
  if (loading)
    return (
      <div className="flex justify-center items-center h-[100dvh]">
        <p>로딩 중...</p>
      </div>
    );

  /** 로그인 여부에 따른 분기 */
  if (!isLoggedIn) return <TradeViewLoginRequired />;

  /** 거래 상태별 분기 */
  switch (status) {
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
      return <p>{id}번 거래를 불러올 수 없습니다</p>;
  }
};

export default Trade;
