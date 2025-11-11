/**
 *
 * @param {string} phone 010-xxxx-xxxx 형식의 전화번호 포매터
 * @returns
 */
export const formatPhone = (phone) => {
  if (!phone) return "";

  // 혹시 숫자로 들어왔을 경우 대비 → 문자열로 변환
  const strPhone = String(phone);

  // 숫자만 남기기 (하이픈, 공백 제거)
  const cleaned = strPhone.replace(/\D/g, "");

  // 3-3-4 또는 3-4-4 형태로 포맷
  return cleaned.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
};
