"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

const MyPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  /** 페이지 진입 시 사용자 정보 가져오기 */
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    fetch("http://localhost:8080/mypage", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("인증 실패");
        return res.json();
      })
      .then((data) => setUser(data.data))
      .catch((err) => {
        console.error(err);
        alert("세션이 만료되었거나 인증이 필요합니다.");
        localStorage.removeItem("accessToken");
        router.replace("/login");
      });
  }, [router]);

  /** 로그아웃 */
  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("로그아웃 되었습니다.");
      } else {
        alert("카카오 로그아웃 실패 또는 이미 로그아웃됨");
      }
    } catch (e) {
      console.error(e);
      alert("로그아웃 중 오류 발생");
    }

    localStorage.removeItem("accessToken");
    router.replace("/login");
  };

  /** 카카오 연동 해제 */
  const handleKakaoUnlink = async () => {
    const accessToken = localStorage.getItem("accessToken"); // JWT

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/kakao/unlink", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const result = await response.text();
        alert(result);
        localStorage.removeItem("accessToken"); // 토큰 삭제
        router.replace("/login");
      } else if (response.status === 401) {
        const msg = await response.text();
        alert(msg || "인증이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem("accessToken");
        router.replace("/login");
      } else {
        const errorMsg = await response.text();
        alert(`연동 해제 실패: ${errorMsg}`);
      }
    } catch (err) {
      alert(`서버 요청 중 오류 발생: ${err.message}`);
    }
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        로딩 중...
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
            onClick={handleLogout}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-semibold"
          >
            로그아웃
          </button>

          {/* 카카오 연동 해제 버튼 */}
          <button
            onClick={handleKakaoUnlink}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            카카오 연동 해제
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
