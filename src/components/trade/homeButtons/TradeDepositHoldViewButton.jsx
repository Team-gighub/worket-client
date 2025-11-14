"use client";
import MainButton from "@/components/common/MainButton";
import { useParams, useRouter } from "next/navigation";

const TradeDepositHoldViewButton = () => {
  const router = useRouter();
  const { id } = useParams();

  const handleClick = () => {
    if (id) {
      router.push(`/trade/${id}/confirm`);
    }
  };
  return <MainButton text="지급 확정하기" onClick={handleClick} />;
};

export default TradeDepositHoldViewButton;
