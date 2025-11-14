/**
 * pin 비밀번호 입력을 위해 필요한 상수, 배열, 함수
 */

export const PIN_LENGTH = 6;

export const KEYS = {
  CLEAR: "clear",
  DELETE: "delete",
};

// 숫자 배열 랜덤 섞기
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// 안내 문구 반환
export const getInstructionText = (mode, step) => {
  if (mode === "register") {
    return step === 1
      ? "간편 비밀번호 6자리를 입력해주세요"
      : "간편 비밀번호 6자리를 한번 더 입력해주세요";
  }
  return "간편 비밀번호를 입력해주세요";
};
