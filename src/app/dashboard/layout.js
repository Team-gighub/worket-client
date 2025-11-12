import Header from "@/components/common/Header";
import PageLayout from "@/components/layouts/PageLayout";

const Layout = ({ children }) => {
  return <PageLayout header={<Header />}>{children}</PageLayout>;
};

export default Layout;
