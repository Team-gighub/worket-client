"use client";

import { pgErrorMessages } from "@/constants/pgErrorMessages";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const message =
    code && pgErrorMessages[code]
      ? pgErrorMessages[code]
      : "알 수 없는 오류가 발생했습니다.";

  return (
    <div>
      <h1>결제 실패</h1>
      <p>에러 코드: {code}</p>
      <p>{message}</p>
    </div>
  );
};

export default Page;
