"use client";
import MainButton from "@/components/common/MainButton";
import { useParams, useRouter } from "next/navigation";
import { useTradeDataStore } from "@/stores/tradeDataStore";

const TradeViewDepositHold = () => {
  const router = useRouter();
  const params = useParams();
  const tradeId = params.id;

  const handleClick = () => {
    if (tradeId) {
      router.push(`/trade/${tradeId}/confirm`);
    } else {
      console.error("거래 ID를 찾을 수 없어 서명 페이지로 이동할 수 없습니다.");
    }
  };
  return <MainButton text="지급 확정하기" onClick={handleClick} />;
};

export default TradeViewDepositHold;
