import "@/app/globals.css";

const RootLayout = ({ children }) => {
  return (
    <html lang="ko">
      <body className="min-h-[100dvh] flex bg-basic-200">
        {/* 좌측 소개 영역 */}
        <aside className="hidden lg:flex flex-col justify-center px-32 w-1/2">
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
        <main className="flex justify-center items-center w-full lg:w-1/2 lg:p-0">
          <div
            className="w-[375px] h-[100dvh] bg-basic-100 shadow-lg overflow-y-auto rounded-2xl
                        sm:w-[375px] md:w-[375px] lg:w-[375px]
                        max-sm:w-full max-sm:rounded-none max-sm:shadow-none"
          >
            {children}
          </div>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
