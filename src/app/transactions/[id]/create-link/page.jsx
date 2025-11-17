"use client";
import "@/app/globals.css";
import DualButtons from "@/components/common/DualButtons";
import InfoText from "@/components/common/InfoText";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { useRouter } from "next/navigation";

/* 새 계약서 생성하기 */
const CreateLink = () => {
  const router = useRouter();
  //추후 거래생성 링크로 변경 예정
  const linkToCopy = "https://www.naver.com/";
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
