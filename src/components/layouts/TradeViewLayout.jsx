import Header from "../common/Header";
import PageLayout from "./PageLayout";

/**
 * Trade 페이지 공통 레이아웃
 */
const TradeViewLayout = ({ children }) => {
  return (
    <PageLayout header={<Header title="WORKET 통합 거래" />}>
      <div className="h-full w-full flex flex-col justify-between items-center pb-[3rem] px-[2rem]">
        {children}
      </div>
    </PageLayout>
  );
};

export default TradeViewLayout;
