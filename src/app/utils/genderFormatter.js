/**
 * 성별 입력을 서버 기대값(MALE/FEMALE)으로 정규화
 * @param {string} val
 * @returns {string|undefined}
 */
export const formatGender = (val) => {
  if (!val && val !== 0) return undefined;
  const v = String(val).trim().toUpperCase();
  if (["MALE", "M", "남", "남성"].includes(v)) return "MALE";
  if (["FEMALE", "F", "여", "여성"].includes(v)) return "FEMALE";
  return v || undefined;
};
