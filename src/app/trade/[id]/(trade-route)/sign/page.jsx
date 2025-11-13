"use client";

import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";
import SignatureForm from "@/components/common/SignatureForm";
import { useParams, useRouter } from "next/navigation";

const TradeSign = () => {
  const router = useRouter();
  const { id } = useParams();

  // TODO: 계약서 보기에 쓰임
  // const { data } = useTradeDataStore();

  const handleSignClick = () => {
    if (id) {
      router.push(`/trade/${id}/signed`);
    }
  };
  return (
    <div className="h-full w-full flex flex-col justify-between items-center pb-[3rem] px-[2rem]">
      <InfoText
        mainTexts={["계약서에 서명해주세요"]}
        subText="계약명과 지급액을 한번 더 확인한 후 서명해주세요! 체결된 계약서는 되돌릴 수 없어요"
      />
      {/* TODO: 계약서 보기 공통 컴포넌트 들어갈 부분 */}
      <SignatureForm />
      <MainButton text="서명 완료하기" onClick={handleSignClick} />
    </div>
  );
};

export default TradeSign;
