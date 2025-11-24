"use client";
import MainButton from "@/components/common/MainButton";
import { useParams, useRouter } from "next/navigation";

const TradeSignedViewButton = () => {
  const router = useRouter();
  const { id } = useParams();

  const handleClick = () => {
    router.push(`/trade/${id}/deposit`);
  };

  return <MainButton text="대금 예치하기" onClick={handleClick} />;
};

export default TradeSignedViewButton;
