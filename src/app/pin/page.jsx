"use client";
import "@/app/globals.css";
import PinInputForm from "@/components/pin/PinInputForm";
import { useRouter } from "next/navigation";

/* 간편 비밀번호 등록 페이지 */
const PinPage = () => {
  const router = useRouter();

  return (
    <div className="h-full">
      <PinInputForm
        mode="setup"
        onSuccess={(pin) => {
          router.push("/dashboard");
        }}
      />
    </div>
  );
};

export default PinPage;
