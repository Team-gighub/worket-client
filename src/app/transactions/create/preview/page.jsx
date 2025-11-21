"use client";
import "@/app/globals.css";
import { React } from "react";
import DualButtons from "@/components/common/DualButtons";
import useBottomSheet from "@/hooks/useBottomSheet";
import PasscodeBottomSheet from "@/components/common/PasscodeBottomSheet";
import { useRouter } from "next/navigation";
import ContractInfo from "@/components/transactions/ContractInfo";
import InfoText from "@/components/common/InfoText";
import { postContracts } from "@/lib/api/client/contractServices";
import { useContractCreateStore } from "@/stores/contractCreateStore"; // 👈 Store import
import useSessionStorage from "@/hooks/useSessionStorage";

const CreateResultPage = () => {
  const router = useRouter();
  const { isOpen, close } = useBottomSheet();
  const contractToSubmit = useContractCreateStore((state) => state.contract);
  const [, setTransactionId] = useSessionStorage("transactionId", null);
  const [, setContractId] = useSessionStorage("contractId", null);
  const handleMainBtn = async () => {
    try {
      const response = await postContracts({
        type: "CREATED",
        ...contractToSubmit,
      });

      // 1. 응답 데이터 확인에서 transactionid, contractid 추출
      const newTransactionId = response.data.transactionId;
      const newContractId = response.data.contractId;

      //2. ID 값을 사용하여 라우팅
      if (newTransactionId) {
        setTransactionId(newTransactionId); // Session Storage에 저장
        setContractId(newContractId); // Session Storage에 저장
        router.push(`/transactions/create/result`);
      } else {
        console.error("❌ Response does not contain a valid transaction ID.");
        // 선택 : ID가 없을 경우 대비 로직 추가
        // alert("계약서 등록 후 ID를 받지 못했습니다.");
      }
    } catch (error) {
      // API 호출 중 오류 발생 시 처리
      console.error("🚨 Error during contract creation API call:", error);
      // 선택 : 사용자에게 오류를 알리는 로직 추가
      // alert("계약서 등록 중 오류가 발생했습니다.");
    }
  };
  return (
    <div>
      <InfoText
        mainTexts={[
          "계약서를 만드는 중이에요",
          "아래 정보가 맞는지 확인해주세요",
        ]}
        subText="잘못된 경우 다시 작성해주세요"
      />
      <ContractInfo />
      <DualButtons
        mainText="생성하기"
        subText="수정"
        width="34rem"
        onMainClick={handleMainBtn}
        onSubClick={() => router.push("/transactions/create")}
      ></DualButtons>
      <PasscodeBottomSheet isOpen={isOpen} onClose={close} />
    </div>
  );
};

export default CreateResultPage;
