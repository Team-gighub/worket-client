"use client";
import "@/app/globals.css";
import ContractTemplate from "@/components/common/ContractTemplate";
import DualButtons from "@/components/common/DualButtons";
import InfoText from "@/components/common/InfoText";
import { MOCK_CONTRACT_RESET } from "@/constants/mock_contracts";
import useSessionStorage from "@/hooks/useSessionStorage";
import { useRouter } from "next/navigation";

const ResultPage = () => {
  //ocrdata 가져와서 매핑
  const [ocrResultData] = useSessionStorage("ocrResult", MOCK_CONTRACT_RESET);
  const { contractInfo, clientInfo, freelancerInfo } = ocrResultData;
  const router = useRouter();
  const handleSubButton = () => {
    router.back();
  };
  //TODO: 계약서 생성 api연동 후 response로 오는 id값으로 라우팅

  const handleMainButton = () => {
    router.push("/transactions/[id]/create-link");
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
