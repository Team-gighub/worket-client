"use client";

import InfoText from "@/components/common/InfoText";
import TradeStepIndicator from "@/components/trade/TradeStepIndicator";
import TradeViewLayout from "../../layouts/TradeViewLayout";
import TradeCreatedViewButton from "../homeButtons/TradeCreatedViewButton";
import TradeSignedViewButton from "@/components/trade/homeButtons/TradeSignedViewButton";
import TradeDepositHoldViewButton from "@/components/trade/homeButtons/TradeDepositHoldViewButton";
import { useTradeDataStore } from "@/stores/tradeDataStore";

const TradeViewSelector = () => {
  const { data } = useTradeDataStore();
  if (!data) return;
  let currentStep = 0;
  let ButtonComponent = null;
  let infoTexts = [];
  let subText = "";

  // 상태에 따라 모든 동적 값 결정
  switch (data.status) {
    case "CREATED":
      currentStep = 1;
      ButtonComponent = TradeCreatedViewButton;
      infoTexts = [
        `${data.clientInfo.name}님과 ${data.freelancerInfo.name}님의`,
        "거래 페이지입니다.",
      ];
      subText = "계약서에 서명을 진행해주세요";
      break;

    case "SIGNED":
      currentStep = 2;
      ButtonComponent = TradeSignedViewButton;
      infoTexts = [
        "서명이 완료되었습니다.",
        "이제 계약금을 입금할 차례입니다.",
      ];
      subText = "계약금을 지정된 계좌로 입금해주세요";
      break;
    case "DEPOSIT_HOLD":
      currentStep = 3;
      ButtonComponent = TradeDepositHoldViewButton;
      infoTexts = [
        "계약금이 안전하게 보관되었습니다.",
        "작업 완료 후 잔금을 지급해주세요.",
      ];
      subText = "계약금이 안전하게 보관 중입니다";
      break;
    case "PAYMENT_CONFIRMED":
      currentStep = 4;
      ButtonComponent = null;
      infoTexts = ["지급 확정 상태입니다.", "빠른 시일 내에 지급해 드릴게요"];
      subText = "지급 완료까지 2~3일 정도 소요됩니다";
      break;
    case "SETTLED":
      currentStep = 5;
      ButtonComponent = null;
      infoTexts = [
        "거래가 성공적으로 완료되었습니다!",
        "함께 일해주셔서 감사합니다.",
      ];
      subText = "거래가 성공적으로 완료되었습니다";
      break;

    default:
      return <p>거래의 상태를 불러올 수 없습니다</p>;
  }

  return (
    <TradeViewLayout>
      <InfoText mainTexts={infoTexts} subText={subText} />
      <TradeStepIndicator
        currentStep={currentStep}
        pdfUrl={data.contractFileUrl}
      />

      {ButtonComponent && <ButtonComponent />}
    </TradeViewLayout>
  );
};

export default TradeViewSelector;
