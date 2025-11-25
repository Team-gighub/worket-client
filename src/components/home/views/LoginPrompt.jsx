"use client";
import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";
import HomeButton from "@/components/home/Button";
import ContractImg from "@/assets/transaction-upload.png";
import ContractImg2 from "@/assets/transaction-create.png";
import { useRouter } from "next/navigation";

const LoginPrompt = () => {
  const router = useRouter();
  const handleUploadBtn = () => {
    router.push("/transactions/upload");
  };
  const handleCreateBtn = () => {
    router.push("/transactions/create");
  };
  const handleLoginBtn = () => {
    router.push("/login");
  };
  return (
    <div className="h-full flex flex-col items-center">
      {/* TODO : 후에 설명 확정 시 변경 */}
      <InfoText
        mainTexts={["우리는 워켓!"]}
        subText={"워켓이 자동으로 정보를 읽어서 등록해드려요!"}
        subTextColor="gray"
      ></InfoText>
      <div className="flex flex-col items-center w-full max-w-[32rem] px-4 mt-6">
        <MainButton
          text="로그인하기"
          theme="secondary"
          onClick={handleLoginBtn}
        ></MainButton>
        <div className="flex mt-8 gap-8">
          <HomeButton
            title="이미 체결된 계약서"
            subtitle="업로드하기"
            titleColor="text-primary"
            subtitleColor="text-primary"
            icon={{
              src: ContractImg,
              alt: "계약서 업로드",
            }}
            onClick={handleUploadBtn}
          />
          <HomeButton
            title="새로운 계약서"
            subtitle="생성하기"
            titleColor="text-point-red-200"
            subtitleColor="text-point-red-200"
            icon={{
              src: ContractImg2,
              alt: "계약서 생성",
            }}
            onClick={handleCreateBtn}
          />
        </div>
      </div>
    </div>
  );
};
export default LoginPrompt;
