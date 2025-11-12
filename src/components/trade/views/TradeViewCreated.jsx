"use client";

import MainButton from "@/components/common/MainButton";
import { useParams, useRouter } from "next/navigation";

const TradeViewCreated = () => {
  const router = useRouter();
  const params = useParams();
  const tradeId = params.id;

  const handleSignClick = () => {
    if (tradeId) {
      // 2. 획득한 ID를 사용하여 목표 경로 구성 및 이동
      router.push(`/trade/${tradeId}/sign`);
    } else {
      // ID가 없을 경우 에러 처리 (URL 구조가 잘못되었을 때 발생 가능)
      console.error("거래 ID를 찾을 수 없어 서명 페이지로 이동할 수 없습니다.");
    }
  };

  return <MainButton text="계약서 서명하기" onClick={handleSignClick} />;
};

export default TradeViewCreated;
