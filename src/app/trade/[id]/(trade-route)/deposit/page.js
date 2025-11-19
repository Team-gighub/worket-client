"use client";

import ContractTemplate from "@/components/common/ContractTemplate";
import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";
import { useTradeDataStore } from "@/stores/tradeDataStore";
import { useParams, useRouter } from "next/navigation";

const TradeDeposit = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data: tradeData, updateTradeStatus } = useTradeDataStore();
  if (!tradeData) return;
  const { contractInfo, clientInfo, freelancerInfo } = tradeData;

  const handleDepositClick = async () => {
    if (id) {
      try {
        //TODO: PG api 연결
        //TODO: PG url로 이동
        //현재는 여기서 상태 업데이트
        updateTradeStatus("DEPOSIT_HOLD");
        router.push(`/trade/${id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="h-full w-full flex flex-col justify-between items-center pb-[3rem] px-[2rem] gap-[3rem]">
      <InfoText
        mainTexts={[`${clientInfo.name}님께`, `이체를 진행하겠습니다.`]}
        subText="계약명과 지급액을 한번 더 확인한 후 이체를 진행해주세요!"
      />
      <ContractTemplate
        contractInfo={contractInfo}
        clientInfo={clientInfo}
        freelancerInfo={freelancerInfo}
      />
      <MainButton text="대금 예치하기" onClick={handleDepositClick} />
    </div>
  );
};

export default TradeDeposit;
