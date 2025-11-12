"use client";
import "@/app/globals.css";
import InfoText from "@/components/common/InfoText";
import InputField from "@/components/common/InputField";
import InputCategoryField from "@/components/common/InputCategoryField";
import MainButton from "@/components/common/MainButton";
import { useRouter } from "next/navigation";

/* 회원가입 화면 */
const SignUp = () => {
  const router = useRouter();
  return (
    <div className="h-full flex flex-col">
      <InfoText
        mainTexts={["업종과 업력을 입력해주세요"]}
        subText="추후 소득 증빙에서  비정형 데이터로 사용될 수 있어요"
        subTextColor="grey"
      />
      <div className="flex pb-[5rem] flex-1 flex-col justify-between">
        <div>
          <InputCategoryField question="업종" />
          <InputField
            question="업력"
            type="number"
            placeholder="해당 업종에 종사한 업력을 입력해주세요"
          />
        </div>
        <div>
          <MainButton
            text="가입하기"
            width="34.2rem"
            onClick={() => {
              router.push("/login/signup/pin");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
