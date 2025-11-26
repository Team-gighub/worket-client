"use client";

import ContractTemplate from "@/components/common/ContractTemplate";
import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";
import SignatureForm from "@/components/common/SignatureForm";
import useSignature from "@/hooks/useSignature";
import { useTradeDataStore } from "@/stores/tradeDataStore";
import { useParams, useRouter } from "next/navigation";

const TradeSign = () => {
  const router = useRouter();
  const { id } = useParams();

  const { fetchSignUrl } = useSignature();
  const { data: tradeData } = useTradeDataStore();
  if (!tradeData) return;
  const { contractInfo, clientInfo, freelancerInfo, contractId } = tradeData;
  const handleSignClick = async () => {
    if (contractId && id) {
      try {
        await fetchSignUrl(contractId);

        router.push(`/trade/${id}/signed`);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="h-full w-full flex flex-col justify-between items-center pb-[3rem] px-[2rem]">
      <InfoText
        mainTexts={["계약서에 서명해주세요"]}
        subText="계약명과 지급액을 한번 더 확인한 후 서명해주세요! 체결된 계약서는 되돌릴 수 없어요"
      />
      <ContractTemplate
        contractInfo={contractInfo}
        clientInfo={clientInfo}
        freelancerInfo={freelancerInfo}
      />
      <SignatureForm userRole="CLIENT" contractId={contractId} />
      <MainButton text="서명 완료하기" onClick={handleSignClick} />
    </div>
  );
};

export default TradeSign;
