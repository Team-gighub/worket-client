import { formatKoreanDate } from "@/app/utils/dateFormatter";
import React from "react";

const steps = [
  { label: "거래페이지 생성", key: "createdAt", status: "CREATED" },
  { label: "계약서 서명", key: "signedAt", status: "SIGNED" },
  { label: "대금 예치", key: "depositHoldAt", status: "DEPOSIT_HOLD" },
  {
    label: "지급 확정",
    key: "paymentConfirmedAt",
    status: "PAYMENT_CONFIRMED",
  },
  { label: "정산", key: "settledAt", status: "SETTLED" },
];

const TransactionTimeline = ({ data }) => {
  const currentStatus = data?.status;
  const currentIndex = steps.findIndex((step) => step.status === currentStatus);
  return (
    <div className="m-[2rem] flex flex-col gap-[1.8rem]">
      <p className="pretendard-semibold-20">거래 타임라인</p>
      <div className="flex flex-col py-[1rem] gap-[1rem] border-l-[0.2rem] border-basic-300">
        {steps.map((step, index) => {
          const dateValue = data?.[step.key]
            ? formatKoreanDate(data[step.key])
            : "-";
          const isActive = index === currentIndex + 1;

          const labelClass = isActive
            ? "text-primary pretendard-bold-14"
            : "text-basic-700 pretendard-medium-14";

          return (
            <div key={index} className="flex justify-between px-[1.5rem]">
              <span className={labelClass}>
                {step.label} {isActive && "대기"}
              </span>
              <span className="pretendard-medium-14 text-basic-700">
                {dateValue}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionTimeline;
