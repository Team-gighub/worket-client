"use client";
import "@/app/globals.css";
import DualButtons from "@/components/common/DualButtons";
import InfoCard from "@/components/common/InfoCard";
import InfoText from "@/components/common/InfoText";
import useSessionStorage from "@/hooks/useSessionStorage";

const ResultPage = () => {
  //SessionStorage에 있는 정보 불러오기
  const mapSessionData = (data) => {
    if (!data || typeof data !== "object") {
      //초기에 에러 방지를 위해
      return {
        contractInfo: [],
        clientInfo: [],
        freelancerInfo: [],
      };
    }

    const contractInfo = [
      { label: "계약명", value: data.title || "" },
      { label: "계약기간", value: data.documentDate || "미정" },
      {
        label: "계약금액",
        value: data.contractAmount || "",
      },
    ];
    //클라이언트 정보
    const clientInfo = [
      { label: "성함", value: data.clientInfo?.성명 || "정보 없음 (미기재)" },
      {
        label: "전화번호",
        value: data.clientInfo?.연락처 || "정보 없음 (미기재)",
      },
    ];
    //프리랜서 정보
    const freelancerInfo = [
      {
        label: "성함",
        value: data.freelancerInfo?.성명 || "정보 없음 (미기재)",
      },
      {
        label: "전화번호",
        value: data.freelancerInfo?.연락처 || "정보 없음 (미기재)",
      },
      {
        label: "계좌번호",
        value: data.freelancerInfo?.계좌번호 || "정보 없음 (미기재)",
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
  return (
    <div>
      <InfoText
        mainTexts={["이미 체결된 계약서를", "업로드해주세요"]}
        subText={"워켓이 자동으로 정보를 읽어서 등록해드려요!"}
      ></InfoText>
      <InfoCard title="계약 정보" items={contractInfo}></InfoCard>
      <InfoCard title="도급인 정보" items={clientInfo}></InfoCard>
      <InfoCard title="수급인 정보" items={freelancerInfo}></InfoCard>
      <DualButtons
        mainText="업로드하기"
        subText="재등록하기"
        width="34rem"
      ></DualButtons>
    </div>
  );
};

export default ResultPage;
