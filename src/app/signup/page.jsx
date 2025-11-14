"use client";
import "@/app/globals.css";
import InfoText from "@/components/common/InfoText";
import InputField from "@/components/common/InputField";
import InputCategoryField from "@/components/common/InputCategoryField";
import MainButton from "@/components/common/MainButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* 회원가입 화면 */
const SignUp = () => {
  const router = useRouter();
  const [businessSector, setBusinessSector] = useState("");
  const [businessSectorYears, setBusinessSectorYears] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // TODO: 카테고리 설정 필요
  const category = [
    "카테고리1",
    "카테고리2",
    "카테고리3",
    "카테고리4",
    "카테고리5",
    "카테고리6",
  ];

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      // TODO: api 연동 필요
      const res = await fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessSector: businessSector,
          businessSectorYears: Number(businessSectorYears),
        }),
      });

      if (!res.ok) {
        throw new Error("회원가입에 실패했습니다.");
      }

      router.push("/pin");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* TODO: 업종/업력 입력을 위한 소개글 결정 필요 */}
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
