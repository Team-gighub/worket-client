import Header from "@/components/common/Header";
import PageLayout from "@/components/layouts/PageLayout";

const PinLayout = ({ children }) => {
  return (
    <PageLayout header={<Header title="간편 비밀번호 등록" onBack={1} />}>
      {children}
    </PageLayout>
  );
};

export default PinLayout;
