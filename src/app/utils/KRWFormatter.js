/**
 * 숫자를 대한민국 표기(천 단위 콤마)로 포맷
 * @param {number|string} value - 포맷할 숫자 (숫자 또는 숫자 문자열)
 * @returns {string} 예: "1,234,567"
 */
const formatKRW = (value) => {
  const num =
    typeof value === "number" ? value : Number(String(value).replace(/,/g, ""));
  if (Number.isNaN(num)) return "";

  // 소수는 기본적으로 유지 (Intl이 자동으로 반영)
  const formatted = new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: 20,
  }).format(num);
  return formatted;
};

export default formatKRW;
