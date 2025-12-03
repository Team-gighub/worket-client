"use client";

import ContractTemplate from "@/components/common/ContractTemplate";
import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";
import PasscodeBottomSheet from "@/components/common/PasscodeBottomSheet";
import SignatureForm from "@/components/common/SignatureForm";
import useBottomSheet from "@/hooks/useBottomSheet";
import useSignature from "@/hooks/useSignature";
import { getTransactionsDetail } from "@/lib/api/client/transactionServices";
import { useSignatureStore } from "@/stores/signatureStore";
import { useTradeDataStore } from "@/stores/tradeDataStore";
import { useParams, useRouter } from "next/navigation";

const TradeSign = () => {
  const router = useRouter();
  const { id } = useParams();
  const { isOpen, open, close } = useBottomSheet();

  const { postSignature, fetchSignUrl } = useSignature();
  const { tempSignatureData } = useSignatureStore();
  const { data: tradeData, setTradeData } = useTradeDataStore();
  if (!tradeData) return;
  const { contractInfo, clientInfo, freelancerInfo, contractId } = tradeData;

  const handleSignClick = async () => {
    // 1. 서명 데이터 유무 확인
    if (!tempSignatureData) {
      alert("서명란을 클릭하여 서명을 먼저 완료해주세요.");
      return;
    }

    try {
      // 2. 서명 데이터 (Base64)를 서버 POST, S3 업로드
      await postSignature(contractId, "CLIENT", tempSignatureData);

      await fetchSignUrl(contractId);

      const { data: updatedTradeData } = await getTransactionsDetail(
        id,
        "CLIENT",
      );
      setTradeData(updatedTradeData);

      // 거래 링크 페이지로 이동
      router.push(`/trade/${id}/signed`);
    } catch (error) {
      console.error("최종 계약서 생성 중 오류 발생:", error);
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
      <SignatureForm />
      <MainButton text="서명 완료하기" onClick={open} />
      <PasscodeBottomSheet
        isOpen={isOpen}
        onClose={close}
        handlePasscodeComplete={() => {
          handleSignClick();
          close();
        }}
      />
    </div>
  );
};

export default TradeSign;
