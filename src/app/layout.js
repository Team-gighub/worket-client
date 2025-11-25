import "@/app/globals.css";
import { headers } from "next/headers";
import AppLayout from "@/components/layouts/AppLayout";

export const metadata = {
  title: "WORKET",
  description: "긱노동자 간편한 소득증빙 플랫폼",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};

const RootLayout = async ({ children }) => {
  const headersList = await headers();
  const layoutType = headersList.get("x-layout-type") || "mobile";
  const isAdmin = layoutType === "admin";

  return (
    <html lang="ko">
      <body
        className={`min-h-[100dvh] ${isAdmin ? "admin-view" : "mobile-view"}`}
      >
        {/* Admin View - 웹 레이아웃 */}
        {isAdmin && (
          <div className="w-full h-[100dvh] bg-basic-100">{children}</div>
        )}

        {/* Mobile View - 모바일 레이아웃 */}
        {!isAdmin && (
          <>
            {/* 좌측 소개 영역 */}
            <aside className="hidden lg:flex flex-col justify-center px-32 w-1/2 bg-basic-200">
              <h1 className="pretendard-semibold-32">
                <p>긱 노동자를 위한</p>
                <p>소득증빙 서비스, WORKET</p>
              </h1>

              <p className="pretendard-semibold-16 text-gray-300 mb-8">
                배달 · 프리랜서 · 플랫폼 노동자 누구나 간편하게 소득을 모으고,
                증빙까지 한 번에
              </p>
            </aside>

            {/* 우측 모바일뷰 */}
            <div className="flex justify-center items-center w-full lg:w-1/2 lg:p-0 bg-basic-200">
              <div
                className="w-[375px] h-[100dvh] bg-basic-100 shadow-lg overflow-y-auto rounded-2xl
                            sm:w-[375px] md:w-[375px] lg:w-[375px]
                            max-sm:w-full max-sm:rounded-none max-sm:shadow-none"
              >
                <AppLayout>{children}</AppLayout>
              </div>
            </div>
          </>
        )}
      </body>
    </html>
  );
};

export default RootLayout;
