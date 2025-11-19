import React from "react";
import InfoCard from "../common/InfoCard";
import { formatKoreanDate } from "@/app/utils/dateFormatter";
import formatKRW from "@/app/utils/KRWFormatter";

const TransactionInfo = ({ data }) => {
  const contractPeriod =
    data.contractInfo.startDate === data.contractInfo.endDate
      ? formatKoreanDate(data.contractInfo.startDate) // 계약 기간이 하루인 경우
      : formatKoreanDate(data.contractInfo.startDate) +
        " ~ " +
        formatKoreanDate(data.contractInfo.endDate);

  const receivingAccount =
    data.freelancerInfo.bank + " " + data.freelancerInfo.account;

  // 상태별 렌더링 정보 정의
  const infoCards = [
    {
      key: "contract",
      show: true,
      title: "계약 정보",
      items: [
        { label: "성함", value: data.clientInfo.name },
        { label: "계약기간", value: contractPeriod },
        {
          label: "계약서 등록일",
          value: formatKoreanDate(data.createdAt),
        },
      ],
    },
    {
      key: "deposit",
      show: ["DEPOSIT_HOLD", "PAYMENT_CONFIRMED"].includes(data.status),
      title: "예치금 정보",
      items: [
        {
          label: "예치 금액",
          value: formatKRW(data.contractInfo.amount) + " 원",
        },
        { label: "예치일", value: formatKoreanDate(data.depositHoldAt) },
        { label: "보관 장소", value: "우리은행" },
      ],
      tip:
        data.status === "DEPOSIT_HOLD"
          ? "💡작업이 완료되면 고객에게 지급 확정을 요청할 수 있어요"
          : null,
    },
    {
      key: "settlement",
      show: ["PAYMENT_CONFIRMED", "SETTLED"].includes(data.status),
      title: data.status === "SETTLED" ? "정산 완료" : "정산 정보",
      items: [
        { label: "정산 금액", value: formatKRW(data.settledAmount) + " 원" },
        {
          label: data.status === "SETTLED" ? "입금 완료일" : "지급 확정일",
          value:
            data.status === "SETTLED"
              ? formatKoreanDate(data.settledAt)
              : formatKoreanDate(data.paymentConfirmedAt),
        },
        { label: "입금 계좌", value: receivingAccount },
      ],
      tip:
        data.status === "PAYMENT_CONFIRMED"
          ? "💡영업일 기준 1-2일 내에 입금돼요"
          : null,
    },
  ];

  return (
    <div>
      {infoCards
        .filter((card) => card.show)
        .map((card) => (
          <div key={card.key}>
            <InfoCard title={card.title} items={card.items} />
            {card.tip && (
              <p className="pretendard-medium-14 text-point-yellow-300 flex ml-[2rem]">
                {card.tip}
              </p>
            )}
          </div>
        ))}
    </div>
  );
};

export default TransactionInfo;
