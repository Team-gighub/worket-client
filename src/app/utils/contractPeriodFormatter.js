import { formatKoreanDate } from "./dateFormatter";

const formatContractPeriod = (startDate, endDate) => {
  return startDate === endDate
    ? formatKoreanDate(startDate)
    : formatKoreanDate(startDate) + " ~ " + formatKoreanDate(endDate);
};

export { formatContractPeriod };
