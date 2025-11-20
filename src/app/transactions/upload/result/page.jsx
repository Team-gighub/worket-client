"use client";
import "@/app/globals.css";
import ContractTemplate from "@/components/common/ContractTemplate";
import DualButtons from "@/components/common/DualButtons";
import InfoText from "@/components/common/InfoText";
import { MOCK_CONTRACT_RESET } from "@/constants/mock_contracts";
import useSessionStorage from "@/hooks/useSessionStorage";
import { postContracts } from "@/lib/api/client/contractServices";
import { useRouter } from "next/navigation";

const ResultPage = () => {
  //ocrdata 가져와서 매핑
  const [ocrResultData] = useSessionStorage("ocrResult", MOCK_CONTRACT_RESET);

  const { contractInfo, clientInfo, freelancerInfo } = ocrResultData;
  const router = useRouter();
  const handleSubButton = () => {
    router.back();
  };

  const handleMainButton = async () => {
    try {
      const response = await postContracts({
        type: "UPLOAD", //타입 추가
        ...ocrResultData,
      });
      console.log(response.data);

      // 1. 응답 데이터 확인 및 Transaction ID 추출
      const transactionId = response.data.transactionId;

      //console.log("✅ API Response ID (Transaction ID):", transactionId);

      //2. ID 값을 사용하여 라우팅 수행
      if (transactionId) {
        router.push(`/transactions/${transactionId}/create-link`);
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
        mainTexts={["계약서를 다 읽었어요", "아래 정보가 맞는지 확인해주세요"]}
        subText={"잘못된 경우 다시 등록해주세요"}
      />
      <ContractTemplate
        contractInfo={contractInfo}
        clientInfo={clientInfo}
        freelancerInfo={freelancerInfo}
      />
      <DualButtons
        mainText="업로드하기"
        subText="재등록하기"
        onSubClick={handleSubButton}
        onMainClick={handleMainButton}
        width="34rem"
      ></DualButtons>
    </div>
  );
};

export default ResultPage;
