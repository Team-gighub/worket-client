import Header from "@/components/common/Header";
import PageLayout from "@/components/layouts/PageLayout";

const TradeLayout = ({ children }) => {
  return (
    <PageLayout header={<Header title="지급 확정" onBack={1} />}>
      {children}
    </PageLayout>
  );
};

export default TradeLayout;
