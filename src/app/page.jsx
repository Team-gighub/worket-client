import { getServerAuthTokens } from "@/lib/authUtils";
import LoginPrompt from "../components/home/views/LoginPrompt";
import LoggedInHome from "../components/home/views/LoggedInHome";

const Home = async () => {
  // 1. Server Component 내에서 cookies() 함수를 사용해 쿠키 저장소에 접근

  // 2. 'accessToken' 쿠키 값 읽기
  const { accessToken, refreshToken } = await getServerAuthTokens();
  const isAuthenticated = accessToken !== null;
  // 3. accessToken 유무에 따라 조건부 렌더링
  if (isAuthenticated) {
    // accessToken이 있을 경우: 로그인 후 화면 표시
    // 이 컴포넌트(LoggedInScreen) 내에서 데이터를 fetch할 때도 accessToken을 사용할 수 있습니다.
    return <LoggedInHome />;
  } else {
    // accessToken이 없을 경우: 로그인 유도 화면 표시
    return <LoginPrompt />;
  }
};

export default Home;
