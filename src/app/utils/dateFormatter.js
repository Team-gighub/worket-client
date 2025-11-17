/**
 * YYYY-MM-DD 형태로 날짜 포맷
 * @param {string | Date} dateInput - Date 객체 또는 날짜 문자열
 * @returns {string} 예: "2025-11-07"
 */
export const formatDateYMD = (dateInput) => {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * YYYY.MM.DD 형태로 날짜 포맷
 * @param {string | Date} dateInput - Date 객체 또는 날짜 문자열
 * @returns {string} 예: "2025.11.07"
 */
export const formatDateDot = (dateInput) => {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

/**
 * YYYY년 MM월 DD일 형태로 한국어 날짜 포맷
 * @param {string | Date} dateInput - Date 객체 또는 날짜 문자열
 * @returns {string} 예: "2025년 11월 7일"
 */
export const formatKoreanDate = (dateInput) => {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

/**
 * YYYY-MM-DD HH:mm 형태로 날짜+시간 포맷
 * @param {string | Date} dateInput
 * @returns {string} 예: "2025-11-07 14:30"
 */
export const formatDateTime = (dateInput) => {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

/**
 * YYYY년 MM월 DD일 HH시 mm분 형태의 한국어 날짜+시간 포맷
 * @param {string | Date} dateInput
 * @returns {string} 예: "2025년 11월 7일 14시 30분"
 */
export const formatDateTimeKorean = (dateInput) => {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
};

/**
 * 시작일과 종료일을 지정된 포맷으로 변환해 기간 문자열로 반환
 *
 * @param {string | Date} startDate - Date 객체 또는 날짜 문자열
 * @param {string | Date} endDate - Date 객체 또는 날짜 문자열
 * @param {(date: string | Date) => string} formatter - 날짜 포맷 함수 (예: formatDateYMD)
 * @returns {string} 예: "2025.11.07 ~ 2025.11.08"
 */
export const formatPeriod = (startDate, endDate, formatter) => {
  return `${formatter(startDate)} ~ ${formatter(endDate)}`;
};
