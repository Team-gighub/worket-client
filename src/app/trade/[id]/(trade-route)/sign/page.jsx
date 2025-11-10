"use client";

import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";
import { useParams, useRouter } from "next/navigation";

const TradeSign = () => {
  const router = useRouter();
  const params = useParams();

  const tradeId = params.id;

  const handleSignClick = () => {
    if (tradeId) {
      router.push(`/trade/${tradeId}/signed`);
    } else {
      console.error("거래 ID를 찾을 수 없어 서명 페이지로 이동할 수 없습니다.");
    }
  };
  return (
    <div className="h-full w-full flex flex-col justify-between items-center pb-[3rem] px-[2rem]">
      <InfoText
        mainTexts={["계약서에 서명해주세요"]}
        subText="계약명과 지급액을 한번 더 확인한 후 서명해주세요! 체결된 계약서는 되돌릴 수 없어요"
      />
      {/* 계약서 보이는 부분 */}
      {/* <SignatureForm /> */}
      <MainButton text="서명 완료하기" onClick={handleSignClick} />
    </div>
  );
};

export default TradeSign;
