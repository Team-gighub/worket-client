"use client";
import PasscodeForm from "@/components/passcode/PasscodeForm";
import { useParams, useRouter } from "next/navigation";

/* 간편 비밀번호 등록 페이지 */
const PasscodePage = () => {
  const router = useRouter();
  const { id } = useParams();

  return (
    <div className="h-full">
      <PasscodeForm
        mode="register"
        handlePasscodeComplete={() => {
          router.push(`/trade/${id}`);
        }}
      />
    </div>
  );
};

export default PasscodePage;
