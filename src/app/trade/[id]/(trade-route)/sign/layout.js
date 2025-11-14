import Header from "@/components/common/Header";
import PageLayout from "@/components/layouts/PageLayout";

const TradeLayout = ({ children }) => {
  return (
    <PageLayout header={<Header title="계약 서명" onBack={1} />}>
      {children}
    </PageLayout>
  );
};

export default TradeLayout;
