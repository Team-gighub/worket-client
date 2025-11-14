import { formatKoreanDate } from "./dateFormatter";

const formatContractPeriod = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return "-";
  }
  return startDate === endDate
    ? formatKoreanDate(startDate)
    : formatKoreanDate(startDate) + " ~ " + formatKoreanDate(endDate);
};

export { formatContractPeriod };
