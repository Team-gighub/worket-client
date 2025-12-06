"use client";
import "@/app/globals.css";
import DualButtons from "@/components/common/DualButtons";
import InfoText from "@/components/common/InfoText";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { useRouter, useParams } from "next/navigation";

/* 새 계약서 생성하기 */
const CreateLink = () => {
  const router = useRouter();
  //{id} 값 가져오기
  const params = useParams();
  const transactionId = params.id;
  //거래 링크 생성
  //TODO: 우리 도메인 링크로 변경
  const linkToCopy = `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/trade/${transactionId}`;
  const [isCopied, copy] = useCopyToClipboard();
  const handleMainButton = () => {
    copy(linkToCopy);
  };
  const handleSubButton = () => {
    router.push("/");
  };
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="py-1 px-2">
        <InfoText
          mainTexts={["거래링크 생성이", "완료됐어요!"]}
          subText={"상대방에게 반드시 링크를 전송해주세요"}
        ></InfoText>
      </div>
      <DualButtons
        mainText="거래링크 복사하기"
        subText="홈"
        onMainClick={handleMainButton}
        onSubClick={handleSubButton}
        width="34rem"
      ></DualButtons>
    </div>
  );
};

export default CreateLink;
