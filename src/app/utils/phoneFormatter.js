/**
 *
 * @param {string} phone 010-xxxx-xxxx 형식의 전화번호 포매터
 * @returns
 */
export const formatPhone = (value) => {
  if (!value) return "";

  // 숫자만 추출
  let cleaned = value.replace(/\D/g, "");

  // 11자리 이상 입력 안되게 제한
  cleaned = cleaned.slice(0, 11);

  // 자리수에 따라 동적으로 포맷팅
  if (cleaned.length < 4) {
    return cleaned; // 3자리 이하 → 그냥 표시
  }

  if (cleaned.length < 7) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  }

  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
};
