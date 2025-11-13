"use client";

import MainButton from "@/components/common/MainButton";
import { useParams, useRouter } from "next/navigation";

const TradeCreatedViewButton = () => {
  const router = useRouter();
  const { id } = useParams();

  const handleClick = () => {
    if (id) {
      router.push(`/trade/${id}/sign`);
    }
  };

  return <MainButton text="계약서 서명하기" onClick={handleClick} />;
};

export default TradeCreatedViewButton;
