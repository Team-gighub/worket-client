import formatKRW from "@/app/utils/KRWFormatter";
import Link from "next/link";
import React from "react";

const STATUS_MAP = {
  CREATED: {
    text: "서명대기",
    textColor: "text-point-red-300",
    bgColor: "bg-point-red-50",
  },
  SIGNED: {
    text: "결제대기",
    textColor: "text-point-green-300",
    bgColor: "bg-point-green-100",
  },
  DEPOSIT_HOLD: {
    text: "확정대기",
    textColor: "text-point-blue-300",
    bgColor: "bg-point-blue-100",
  },
  PAYMENT_CONFIRMED: {
    text: "정산대기",
    textColor: "text-point-yellow-300",
    bgColor: "bg-point-yellow-100",
  },
  SETTLED: {
    text: "거래종료",
    textColor: "text-basic-100",
    bgColor: "bg-basic-300",
  },
};

const TransactionItem = ({ id, status, title, period, amount }) => {
  const { text, textColor, bgColor } = STATUS_MAP[status] || {};

  return (
    <Link href={`/transactions/${id}`}>
      <div className="flex items-center gap-4 mx-[0.6rem] my-[1.2rem] cursor-pointer hover:bg-basic-100 rounded-lg p-2 transition-colors">
        <div
          className={`w-[5.7rem] h-[2.6rem] px-[0.6rem] ${bgColor} rounded-[1rem] flex justify-center items-center`}
        >
          <span className={`pretendard-bold-12 ${textColor}`}>{text}</span>
        </div>
        <div className="flex flex-grow justify-between">
          <div>
            <p className="pretendard-medium-18">{title}</p>
            <span className="pretendard-light-14">{period}</span>
          </div>
          <p className="pretendard-medium-18 flex justify-center items-center">
            {formatKRW(amount)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TransactionItem;
