"use client";

import MainButton from "@/components/common/MainButton";
import { useTradeDataStore } from "@/stores/tradeDataStore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const TradeConfirmSuccess = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data: tradeData, updateTradeStatus } = useTradeDataStore();
  const { freelancerInfo = null } = tradeData;

  const handleClick = () => {
    if (id) {
      updateTradeStatus("PAYMENT_CONFIRMED");
      router.push(`/trade/${id}`);
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-between items-center pb-[3rem] px-[2rem]">
      <div className="flex flex-1 flex-col justify-center items-center gap-[1rem]">
        <Image src="/images/logo.png" alt="로고" width={120} height={120} />
        <span className="pretendard-semibold-20 flex flex-col justify-center items-center">
          <p>{freelancerInfo?.name} 님께 지급을 확정했어요</p>
        </span>
        <p className="pretendard-medium-14 text-point-red-200">
          지급 완료는 2~3일 정도 소요돼요
        </p>
      </div>

      <MainButton text="확인" onClick={handleClick} />
    </div>
  );
};

export default TradeConfirmSuccess;
