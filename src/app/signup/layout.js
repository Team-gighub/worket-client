import Header from "@/components/common/Header";
import PageLayout from "@/components/layouts/PageLayout";

const SignupLayout = ({ children }) => {
  return (
    <PageLayout header={<Header title="회원가입" />}>{children}</PageLayout>
  );
};

export default SignupLayout;
