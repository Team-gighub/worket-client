import Header from "@/components/common/Header";
import PageLayout from "@/components/layouts/PageLayout";

const mypageLayout = ({ children }) => {
  return (
    <PageLayout header={<Header title="마이페이지" />}>{children}</PageLayout>
  );
};

export default mypageLayout;
