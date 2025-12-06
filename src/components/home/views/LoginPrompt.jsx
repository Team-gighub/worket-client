"use client";
import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";
import HomeButton from "@/components/home/Button";
import ContractImg from "@/assets/transaction-upload.png";
import ContractImg2 from "@/assets/transaction-create.png";
import WorketIcon from "@/assets/worketIcon.png";
import { useRouter } from "next/navigation";
import MainBanner from "../MainBanner";
import HomeHeader from "../HomeHeader";

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
      <HomeHeader title="WORKET" />
      <MainBanner
        title={"계약부터 소득증빙까지,\n워켓에서 한 번에!"}
        subtitle={"별도 서류 없이 신뢰도 높은 소득증빙"}
        titleColor="text-primary"
        subtitleColor="text-basic-500"
        icon={{
          src: WorketIcon,
          alt: "계약서 업로드",
        }}
        className="mt-[8rem]"
      />
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
