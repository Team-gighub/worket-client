"use client";
import "@/app/globals.css";
import DualButtons from "@/components/common/DualButtons";
import InfoCard from "@/components/common/InfoCard";
import InfoText from "@/components/common/InfoText";
import useSessionStorage from "@/hooks/useSessionStorage";
import { useRouter } from "next/navigation";

const ResultPage = () => {
  //SessionStorage에 있는 정보 불러오기
  const mapSessionData = (data) => {
    if (!data || typeof data !== "object") {
      return {
        contractInfo: [],
        clientInfo: [],
        freelancerInfo: [],
      };
    }

    // 백엔드가 보낸 필드명에 맞게 매핑 (파이프 문자열 기반)
    const contractInfo = [
      // ⭐️ Key 이름을 백엔드 Map의 Key와 일치시킴 ⭐️
      { label: "계약명", value: data["계약명"] || "" },
      { label: "계약기간", value: data["계약기간"] || "미정" }, // 계약기간 필드가 있다면 사용
      {
        label: "계약금액",
        value: data["계약금액"] || "",
      },
    ];
    const clientData = data.갑;

    const clientInfo = [
      // ⭐️ 최상위 필드에서 직접 성함과 전화번호를 찾음 ⭐️
      { label: "성함", value: clientData?.성명 || "정보 없음 (미기재)" },
      {
        label: "전화번호",
        value: clientData?.연락처 || "정보 없음 (미기재)",
      },
    ];
    const freelancerData = data.을;
    const freelancerInfo = [
      {
        label: "성함",
        value: freelancerData?.성명 || "정보 없음 (미기재)",
      },
      {
        label: "전화번호",
        value: freelancerData?.연락처 || "정보 없음 (미기재)",
      },
      {
        label: "계좌번호",
        value: freelancerData?.계좌번호 || "정보 없음 (미기재)",
      },
    ];

    return {
      contractInfo,
      clientInfo,
      freelancerInfo,
    };
  };
  //ocrdata 가져와서 매핑
  const [ocrResultData] = useSessionStorage("ocrResult", {});
  const { contractInfo, clientInfo, freelancerInfo } =
    mapSessionData(ocrResultData);
  const router = useRouter();
  const handleSubButton = () => {
    router.back();
  };
  const handleMainButton = () => {
    router.push("/transactions/upload/link");
  };
  return (
    <div>
      <InfoText
        mainTexts={["계약서를 다 읽었어요", "아래 정보가 맞는지 확인해주세요"]}
        subText={"잘못된 경우 다시 등록해주세요"}
      ></InfoText>
      <InfoCard title="계약 정보" items={contractInfo}></InfoCard>
      <InfoCard title="도급인 정보" items={clientInfo}></InfoCard>
      <InfoCard title="수급인 정보" items={freelancerInfo}></InfoCard>
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
