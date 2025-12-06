import AdminSideNavTab from "../common/AdminSideNavTab";

/**
 * 관리자 페이지 공통 레이아웃
 */
const WebLayout = ({ children }) => {
  return (
    <div className="flex h-full w-full">
      {/* 왼쪽 사이드바 */}
      <AdminSideNavTab />

      {/* 오른쪽 콘텐츠 영역 */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

export default WebLayout;
