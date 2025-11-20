"use client";
import "@/app/globals.css";
import PasscodeForm from "@/components/passcode/PasscodeForm";
import { useRouter } from "next/navigation";

/* 간편 비밀번호 등록 페이지 */
const PasscodePage = () => {
  const router = useRouter();

  return (
    <div className="h-full">
      <PasscodeForm
        mode="register"
        handlePasscodeComplete={() => {
          router.push("/dashboard");
        }}
      />
    </div>
  );
};

export default PasscodePage;
