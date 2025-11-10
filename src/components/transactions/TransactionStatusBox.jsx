import React from "react";
import Image from "next/image";

import CreatedImg from "@/assets/status-created.png";
import SignedImg from "@/assets/status-signed.png";
import PaymentConfirmedImg from "@/assets/status-payment-confirmed.png";
import DepositHoldImg from "@/assets/status-deposit-hold.png";
import SettledImg from "@/assets/status-settled.png";

const statusConfig = {
  CREATED: {
    image: CreatedImg,
    label: "서명 대기중",
    mainText: "계약서 서명 대기중입니다",
    subTexts: ["고객이 계약서를 확인하고", "서명하면 다음 단계로 진행돼요"],
    bgColor: "bg-point-red-50",
  },
  SIGNED: {
    image: SignedImg,
    label: "결제 대기중",
    mainText: "대금 예치 대기중입니다",
    subTexts: [
      "계약서 서명이 완료됐어요",
      "고객이 대금을 예치하면",
      "작업을 시작할 수 있어요",
    ],
    bgColor: "bg-point-green-100",
  },
  DEPOSIT_HOLD: {
    image: DepositHoldImg,
    label: "지급 확정 대기중",
    mainText: "지급 확정 대기중입니다",
    subTexts: [
      "대금이 안전하게 보관되어있어요",
      "작업 완료 후 고객에게",
      "지급 확정을 요청하세요",
    ],
    bgColor: "bg-point-blue-100",
  },
  PAYMENT_CONFIRMED: {
    image: PaymentConfirmedImg,
    label: "정산 대기중",
    mainText: "정산 대기중입니다",
    subTexts: [
      "고객이 지급을 확정했어요",
      "워켓에서 정산을 처리하고 있어요",
      "곧 입금될 예정이에요",
    ],
    bgColor: "bg-point-yellow-100",
  },
  SETTLED: {
    image: SettledImg,
    label: "정산 완료",
    mainText: "정산 완료",
    subTexts: ["거래가 정상적으로 마무리되었습니다."],
    bgColor: "bg-point-purple-100",
  },
};

/**
 * 거래 상태를 보여주는 컴포넌트
 *
 * @param {"CREATED" | "SIGNED" | "DEPOSIT_HOLD" | "PAYMENT_CONFIRMED" | "SETTLED"} status - 거래 상태
 */
const TransactionStatusBox = ({ status }) => {
  const currentStatus = statusConfig[status];

  return (
    <div
      className={`${currentStatus.bgColor} w-full flex justify-between items-center p-[2rem]`}
    >
      <div className="pretendard-medium-16">
        <p className="mb-3">{currentStatus.mainText}</p>
        {currentStatus.subTexts.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
      <div className="relative w-[5rem] h-[5rem]">
        <Image
          src={currentStatus.image}
          alt={currentStatus.label}
          fill
          sizes="5rem"
          className="object-contain"
          loading="eager"
        />
      </div>
    </div>
  );
};

export default TransactionStatusBox;
