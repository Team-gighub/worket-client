import React from "react";

/**
 * 안내 텍스트를 보여주는 컴포넌트
 *
 * @param {Array<string>} mainTexts - 강조해서 보여줄 주요 텍스트 배열 (큰 글씨)
 * @param {string} subText - 보조 설명 또는 안내 문구 (작은 글씨)
 * @param {"primary" | "grey"} subTextColor - 보조 설명 색 (기본: primary)
 */
const InfoText = ({ mainTexts, subText, subTextColor = "primary" }) => {
  return (
    <div className="max-w-[33.5rem] mx-auto my-[2rem] flex flex-col gap-2.5">
      <div className="pretendard-semibold-20 flex flex-col">
        {mainTexts.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
      <p
        className={`pretendard-medium-16 ${subTextColor === "primary" ? "text-primary" : "text-basic-600"}`}
      >
        {subText}
      </p>
    </div>
  );
};

export default InfoText;
