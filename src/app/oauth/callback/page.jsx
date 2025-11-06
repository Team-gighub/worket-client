"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const OAuthCallbackPage = () => {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("accessToken");

    if (token) {
      localStorage.setItem("accessToken", token);
      router.replace("/");
    } else {
      router.replace("/login");
    }
  }, [params, router]);

  return (
    <div className="flex items-center justify-center h-screen text-xl">
      로그인 처리 중입니다...
    </div>
  );
};

export default OAuthCallbackPage;
