import Header from "@/components/common/Header";
import PageLayout from "@/components/layouts/PageLayout";

const IncomesLayout = ({ children }) => {
  return (
    <PageLayout header={<Header title="소득관리" />}>{children}</PageLayout>
  );
};

export default IncomesLayout;
