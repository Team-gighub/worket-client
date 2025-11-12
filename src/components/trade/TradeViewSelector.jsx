// components/trade/TradeViewSelector.jsx (수정)
"use client";

import TradeViewCreated from "@/components/trade/views/TradeViewCreated";
import TradeViewSigned from "@/components/trade/views/TradeViewSigned";
import TradeViewDepositHold from "@/components/trade/views/TradeViewDepositHold";
import TradeViewPaymentConfirmed from "@/components/trade/views/TradeViewPaymentConfirmed";
import TradeViewSettled from "@/components/trade/views/TradeViewSettled";
import { useTradeDataStore } from "@/stores/tradeDataStore";
import InfoText from "@/components/common/InfoText"; // 🚨 InfoText 임포트
import TradeStepIndicator from "@/components/trade/TradeStepIndicator"; // 🚨 Indicator 임포트
import TradeViewLayout from "../layouts/TradeViewLayout";

// TradeViewSelector는 이제 레이아웃의 자식으로 들어갈 최종 콘텐츠를 반환합니다.
const TradeViewSelector = () => {
  const { tradeData } = useTradeDataStore();

  if (!tradeData?.status) {
    return <p>거래 상태를 불러오는 중입니다...</p>;
  }

  let currentStep = 0;
  let ViewComponent = null;
  let infoTexts = [];
  let subText = "";

  // 1. 상태에 따라 모든 동적 값 결정
  switch (tradeData.status) {
    case "CREATED":
      currentStep = 1;
      ViewComponent = TradeViewCreated;
      infoTexts = [
        `${tradeData.clientName}님과 ${tradeData.freelancerName}님의`,
        "거래 페이지입니다.",
      ];
      subText = "계약서에 서명을 진행해주세요";
      break;

    case "SIGNED":
      currentStep = 2;
      ViewComponent = TradeViewSigned;
      infoTexts = [
        "서명이 완료되었습니다.",
        "이제 계약금을 입금할 차례입니다.",
      ];
      subText = "계약금을 지정된 계좌로 입금해주세요";
      break;
    case "DEPOSIT_HOLD":
      currentStep = 3;
      ViewComponent = TradeViewDepositHold;
      infoTexts = [
        "계약금이 안전하게 보관되었습니다.",
        "작업 완료 후 잔금을 지급해주세요.",
      ];
      subText = "계약금이 안전하게 보관 중입니다";
      break;
    case "PAYMENT_CONFIRMED":
      currentStep = 4;
      ViewComponent = TradeViewPaymentConfirmed;
      infoTexts = ["잔금이 지급되었습니다.", "거래를 마무리해주세요."];
      subText = "잔금이 안전하게 지급되었습니다";
      break;
    case "SETTLED":
      currentStep = 5;
      ViewComponent = TradeViewSettled;
      infoTexts = [
        "거래가 성공적으로 완료되었습니다!",
        "함께 일해주셔서 감사합니다.",
      ];
      subText = "거래가 성공적으로 완료되었습니다";
      break;

    default:
      return (
        <p>{tradeData.tradeId || "해당"} 거래의 상태를 불러올 수 없습니다</p>
      );
  }

  return (
    <TradeViewLayout>
      <InfoText mainTexts={infoTexts} subText={subText} />
      <TradeStepIndicator currentStep={currentStep} />

      {ViewComponent && <ViewComponent />}
    </TradeViewLayout>
  );
};

export default TradeViewSelector;
