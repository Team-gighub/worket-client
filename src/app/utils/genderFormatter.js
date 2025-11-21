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

/**
 * 서버에서 받은 성별 값(MALE/FEMALE)을 한글로 표시
 * @param {string} val - MALE 또는 FEMALE
 * @returns {string} 남성 또는 여성
 */
export const displayGender = (val) => {
  if (!val) return "-";
  const v = String(val).trim().toUpperCase();
  if (v === "MALE") return "남성";
  if (v === "FEMALE") return "여성";
  return val;
};
