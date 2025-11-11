"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const LoginInner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const state = searchParams.get("state") || "FREELANCER";

  /**
   * 이제 http://localhost:3000/login?state=client 이런식으로 보내면 됨
   * http://localhost:3000/login 이걸로 하면 기본 역할은 freelancer
   */

  /** 카카오 로그인 요청 */
  const handleKakaoLogin = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    window.location.href = `${baseUrl}/oauth2/authorization/kakao?state=${state}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-basic-100 text-center">
      {/* 상단 여백 */}
      <div className="mb-10" />

      {/* 로고 */}
      <Image
        src="/images/logo.png"
        alt="포켓 이미지"
        width={120}
        height={120}
        className="mb-6"
      />

      {/* 안내 문구 */}
      <p className="basic-800 pretendard-medium-24">간편하게 로그인하고</p>
      <p className="basic-800 pretendard-medium-24">서비스를 이용해보세요.</p>

      {/* 10초 문구 */}
      <div className="flex items-center pretendard-light-14 justify-center border border-basic-500 rounded-full px-3 py-1 mb-4 mt-10">
        ⚡ 10초만에 빠른가입 ⚡
      </div>

      {/* 카카오 로그인 버튼 */}
      <button
        onClick={handleKakaoLogin}
        className="w-3/4 flex items-center justify-center gap-2 bg-point-yellow-200 hover:bg-point-yellow-300 pretendard-semibold-16 px-12 py-8 rounded-xl transition-all"
      >
        <Image
          src="/images/kakao-icon.png"
          alt="카카오 로고"
          width={24}
          height={24}
          className="w-6 h-6"
        />
        <span className="pretendard-semibold-20">카카오 로그인</span>
      </button>
    </div>
  );
};

const Login = () => {
  // Suspense로 감싸서 useSearchParams() 에러 방지
  return (
    <Suspense>
      <LoginInner />
    </Suspense>
  );
};

export default Login;
