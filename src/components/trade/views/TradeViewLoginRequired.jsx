"use client";

import InfoText from "@/components/common/InfoText";
import TradeViewLayout from "@/components/layouts/TradeViewLayout";
import TradeStepIndicator from "../TradeStepIndicator";
import MainButton from "@/components/common/MainButton";

const TradeViewLoginRequired = ({ clientName, freelancerName }) => {
  return (
    <TradeViewLayout>
      <InfoText
        mainTexts={[
          `${clientName}님과 ${freelancerName}님의`,
          "거래 페이지입니다.",
        ]}
        subText="거래를 시작하기 전, 본인인증을 진행해주세요"
      />
      <TradeStepIndicator currentStep={0} />
      {/* TODO: 카카오 로그인 버튼 or 로크인 버튼으로 수정 & 클릭 액션 추가*/}
      <MainButton
        text="본인인증 하러가기"
        onClick={() => console.log("로그인 화면으로 이동")}
      />
    </TradeViewLayout>
  );
};

export default TradeViewLoginRequired;
