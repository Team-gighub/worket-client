import Header from "@/components/common/Header";
import PageLayout from "@/components/layouts/PageLayout";

const TradeLayout = ({ children }) => {
  return (
    <PageLayout header={<Header title="서명 완료" onBack={2} />}>
      {children}
    </PageLayout>
  );
};

export default TradeLayout;
