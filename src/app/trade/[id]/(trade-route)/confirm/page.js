"use client";

import formatKRW from "@/app/utils/KRWFormatter";
import InfoCard from "@/components/common/InfoCard";
import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";
import { useTradeDataStore } from "@/stores/tradeDataStore";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const TradeConfirm = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data: tradeData } = useTradeDataStore();
  const { contractInfo, clientInfo, freelancerInfo } = tradeData;

  const handleClick = () => {
    if (id) {
      //TODO: pg api 연동 + 성공하면 /success로 이동
      router.push(`/trade/${id}/confirm/success`);
    }
  };

  const paymentFields = [
    { label: "계약명", value: contractInfo.title || "-" },
    {
      label: "지급액",
      value: formatKRW(contractInfo.amount) + "원" || "-",
    },
    { label: "도급인", value: clientInfo.name || "-" },
    { label: "수급인", value: freelancerInfo.name || "-" },
  ];

  return (
    <div className="h-full w-full flex flex-col justify-between items-center pb-[3rem] px-[2rem]">
      <div className="flex flex-col items-center gap-[1rem]">
        <InfoText
          mainTexts={[
            `${clientInfo.name}님, 거래가 완료되었다면,`,
            "지급 확정 버튼을 눌러주세요",
          ]}
          subText="지급 확정 이후에는 환불이 불가하므로 반드시 계약이 완료된 후 진행해주세요."
        />
        <InfoCard title="지급 정보 미리보기" items={paymentFields} />
      </div>
      <div className="flex flex-col items-center gap-[1rem]">
        {/* TODO: 지급 미확정 페이지로 이동 */}
        <Link href={`trade/${id}/confirm/not`}>
          <p className="pretendard-medium-12 text-point-purple-300 text-decoration-line underline">
            지급 확정을 원하지 않으시나요?
          </p>
        </Link>
        <MainButton text="지급 확정하기" onClick={handleClick} />
      </div>
    </div>
  );
};

export default TradeConfirm;
