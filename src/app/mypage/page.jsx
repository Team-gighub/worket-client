"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

const MyPage = () => {
  const router = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/mypage", {
        credentials: "include",
      });
      if (!res.ok) return router.replace("/login");
      const { data } = await res.json();
      setUser(data);
    })();
  }, [router]);

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.replace("/login");
  };

  const unlink = async () => {
    await fetch("/api/auth/unlink", {
      method: "POST",
      credentials: "include",
    });
    router.replace("/login");
  };

  // ✅ 카카오 OAuth 토큰 재발급 버튼 동작
  const refreshKakaoToken = async () => {
    if (!user?.id) {
      alert("유저 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/token/refresh?userId=${user.id}`;

    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const err = await res.json();
      alert("토큰 재발급 실패: " + (err.message || "Unknown error"));
      return;
    }

    const data = await res.json();
    alert("토큰 재발급 성공: " + data.message);
    console.log("새 access token:", data.accessToken);
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        로딩 중
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6">My Page</h1>
        <div className="text-gray-700 space-y-2">
          <p>
            <strong>이름:</strong> {user.name}
          </p>
          <p>
            <strong>전화번호:</strong> {user.phone}
          </p>
          <p>
            <strong>가입 경로:</strong> {user.provider}
          </p>
          <p>
            <strong>역할:</strong> {user.role}
          </p>
          <p>
            <strong>상태:</strong> {user.status}
          </p>
          <p>
            <strong>가입일:</strong>{" "}
            {new Date(user.createdAt).toLocaleString("ko-KR")}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={() => router.push("/")}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg font-semibold"
          >
            홈으로
          </button>

          <button
            onClick={logout}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-semibold"
          >
            로그아웃
          </button>

          <button
            onClick={unlink}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            카카오 연동 해제
          </button>

          {/* ✅ 추가된 카카오 토큰 재발급 버튼 */}
          <button
            onClick={refreshKakaoToken}
            className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-semibold mt-2"
          >
            카카오 토큰 재발급
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
