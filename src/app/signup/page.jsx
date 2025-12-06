"use client";
import "@/app/globals.css";
import InfoText from "@/components/common/InfoText";
import InputField from "@/components/common/InputField";
import InputCategoryField from "@/components/common/InputCategoryField";
import MainButton from "@/components/common/MainButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { postUsers } from "@/lib/api/client/userServices";

/* 회원가입 화면 */
const SignUp = () => {
  const router = useRouter();
  const [businessSector, setBusinessSector] = useState("");
  const [businessSectorYears, setBusinessSectorYears] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // TODO: 카테고리 설정 필요
  const category = [
    "웹/앱 개발자",
    "디자이너",
    "콘텐츠 제작자",
    "MC/사회자",
    "번역/통역가",
    "작가/에디터",
  ];

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      await postUsers({
        businessSector,
        businessSectorYears: Number(businessSectorYears),
      });

      router.push("/passcode");
    } catch (err) {
      console.error(err);
      setError("회원가입에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div>
        <InfoText
          mainTexts={["업종과 업력을 입력해주세요"]}
          subText="추후 소득 증빙 과정에서 활용될 수 있어요"
          subTextColor="grey"
        />
      </div>

      <div className="flex pb-[5rem] flex-1 flex-col justify-between">
        <div>
          <InputCategoryField
            question="업종"
            value={businessSector}
            onChange={(value) => setBusinessSector(value)}
            category={category}
          />
          <InputField
            question="업력"
            type="number"
            placeholder="해당 업종에 종사한 업력을 입력해주세요"
            value={businessSectorYears}
            onChange={(e) => setBusinessSectorYears(e.target.value)}
          />
        </div>
        <div>
          <MainButton
            text={loading ? "가입 중..." : "가입하기"}
            width="34.2rem"
            disabled={loading}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
