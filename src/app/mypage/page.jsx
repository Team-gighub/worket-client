"use client";
import "@/app/globals.css";
import MenuSection from "@/components/common/MenuSection";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUsers } from "@/lib/api/client/userServices";
import { postLogout, postUnlink } from "@/lib/api/client/authServices";
import LoadingSpinner from "@/components/common/LoadingSpinner";

/* 마이 페이지 */
const MyPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLogin, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try {
        const res = await getUsers();
        const profile = res.data ?? null;

        if (!profile) {
          if (mounted) {
            setLogin(false);
            router.push("/login");
          }
          return;
        }

        if (mounted) {
          setUser(profile);
          setLogin(true);
        }
      } catch (err) {
        // TODO: 에러 핸들링
        if (mounted) {
          const status = err.response.status;
          if (status === 401) {
            router.push("/login");
          } else {
            console.error("프로필 조회 실패:", err);
            router.push("/login");
          }
          setLogin(false);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchUser();
    return () => {
      mounted = false;
    };
  }, [router]);

  // 메뉴 클릭 핸들러(로그인 여부에 따라 라우팅)
  const handleNavigation = (path) => {
    router.push(isLogin ? path : "/login");
  };

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    if (!isLogin) {
      router.push("/login");
      return;
    }
    try {
      await postLogout();
      setUser(null);
      setLogin(false);
      router.push("/mypage");
    } catch (err) {
      if (err.response.status === 401) router.push("/login");
    }
  };

  // 회원 탈퇴 처리 함수
  const handleWithdrawal = async () => {
    if (!isLogin) {
      router.push("/login");
      return;
    }
    try {
      await postUnlink();
      setUser(null);
      setLogin(false);
      router.push("/mypage");
    } catch (err) {
      if (err.response.status === 401) router.push("/login");
    }
  };

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  const myInfoItems = [
    {
      label: "회원 정보 수정",
      onClick: () => handleNavigation("/mypage/edit"),
    },
    { label: "로그아웃", onClick: handleLogout },
    { label: "회원 탈퇴", onClick: handleWithdrawal },
  ];

  const customerServiceItems = [
    { label: "문의하기", onClick: () => {} },
    { label: "서비스 이용약관", onClick: () => {} },
    { label: "개인정보 처리방침", onClick: () => {} },
  ];

  return (
    <div>
      {/* 헤더 영역 */}
      <div className="max-w-[33.5rem] w-full mx-auto my-[2rem] flex flex-col gap-2.5">
        <div className="pretendard-semibold-20">
          <button
            onClick={() =>
              isLogin ? router.push("/mypage/edit") : router.push("/login")
            }
          >
            {isLogin ? user?.name : "로그인/회원가입 >"}
          </button>
        </div>
        <p className="pretendard-medium-16 text-basic-500">
          {isLogin
            ? `${user?.businessSectorYears ?? 0}년차 프리랜서`
            : "회원가입하고 간편한 소득 증빙을 시작해보세요 !"}
        </p>
      </div>

      {/* 메뉴 섹션 */}
      <div className="flex flex-col gap-[1rem] border-t border-basic-700 mx-[2rem]">
        <MenuSection title="회원 정보" items={myInfoItems} />
        <MenuSection title="고객센터" items={customerServiceItems} />
      </div>
    </div>
  );
};

export default MyPage;
