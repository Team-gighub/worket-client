import React from "react";
import InfoCard from "../common/InfoCard";
import { formatKoreanDate } from "@/app/utils/dateFormatter";

const TransactionInfo = ({ data }) => {
  const contractPeriod =
    data.contract_start_date === data.contract_end_date
      ? formatKoreanDate(data.contract_start_date) // 계약 기간이 하루인 경우
      : formatKoreanDate(data.contract_start_date) +
        " ~ " +
        formatKoreanDate(data.contract_end_date);

  const receivingAccount = data.freelancer_bank + " " + data.freelancer_account;

  // 상태별 렌더링 정보 정의
  const infoCards = [
    {
      key: "contract",
      show: true,
      title: "계약 정보",
      items: [
        { label: "성함", value: data.client_name },
        { label: "계약기간", value: contractPeriod },
        {
          label: "계약서 등록일",
          value: formatKoreanDate(data.contract_created_at),
        },
      ],
    },
    {
      key: "deposit",
      show: ["DEPOSIT_HOLD", "PAYMENT_CONFIRMED"].includes(data.status),
      title: "예치금 정보",
      items: [
        { label: "예치 금액", value: data.price },
        { label: "예치일", value: data.deposit_hold_at },
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
        { label: "정산 금액", value: data.price + " 원" },
        {
          label: data.status === "SETTLED" ? "입금 완료일" : "지급 확정일",
          value:
            data.status === "SETTLED"
              ? data.settled_at
              : data.payment_confirmed_at,
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
