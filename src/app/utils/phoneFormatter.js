/**
 *
 * @param {string} value 010-xxxx-xxxx 형식의 전화번호 포매터
 * @returns
 */
export const formatPhone = (value) => {
  if (!value) return "";

  const cleaned = value.replace(/\D/g, "").slice(0, 11);
  const { length } = cleaned;

  if (length < 4) {
    return cleaned;
  }
  if (length < 8) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  }

  // 11자리 번호 (e.g., 010-xxxx-xxxx)
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
};
