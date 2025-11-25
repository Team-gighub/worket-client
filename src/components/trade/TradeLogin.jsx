"use client";
import MainButton from "../common/MainButton";

const TradeLogin = ({ id }) => {
  console.log(id);
  const handleKakaoLogin = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    window.location.href = `${baseUrl}/oauth2/authorization/kakao?state=CLIENT:tx=${id}`;
  };
  return <MainButton text="본인인증 하러가기" onClick={handleKakaoLogin} />;
};

export default TradeLogin;
