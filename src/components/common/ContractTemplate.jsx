import InfoCard from "@/components/common/InfoCard";
import formatKRW from "@/app/utils/KRWFormatter";
import { formatPhone } from "@/app/utils/phoneFormatter";
import { formatContractPeriod } from "@/app/utils/contractPeriodFormatter";
import { findBankLabel } from "../pg/PaymentOptions";

/**
 * @typedef {Object} ContractInfo
 * @property {string} title 계약명
 * @property {number} amount 계약금액 (숫자)
 * @property {string} startDate 계약 시작일 (YYYY-MM-DD 형식)
 * @property {string} endDate 계약 종료일 (YYYY-MM-DD 형식)
 */

/**
 * @typedef {Object} ClientInfo
 * @property {string} name 성함 (도급인/의뢰인)
 * @property {string} phone 전화번호 (하이픈 없는 문자열, 예: "01012345678")
 */

/**
 * @typedef {Object} FreelancerInfo
 * @property {string} name 성함 (수급인/프리랜서)
 * @property {string} phone 전화번호
 * @property {string} account 계좌번호
 * @property {string} bank 은행명
 */

/**
 * 계약 정보를 포맷하여 InfoCard 형태로 렌더링하는 템플릿 컴포넌트입니다.
 * * @param {Object} props
 * @param {ContractInfo} props.contractInfo - 계약의 핵심 정보
 * @param {ClientInfo} props.clientInfo - 도급인(클라이언트) 정보
 * @param {FreelancerInfo} props.freelancerInfo - 수급인(프리랜서) 정보
 */

const ContractTemplate = ({ contractInfo, clientInfo, freelancerInfo }) => {
  const { title, amount, startDate, endDate } = contractInfo;
  const { name: clientName, phone: clientPhone } = clientInfo;
  const {
    name: freelancerName,
    phone: freelancerPhone,
    account: freelancerAccount,
    bank: freelancerBank,
  } = freelancerInfo;

  const contractPeriod = formatContractPeriod(startDate, endDate);

  const bankLabel = findBankLabel(freelancerBank);

  const receivingAccount =
    bankLabel !== "-" && freelancerAccount
      ? bankLabel + " " + freelancerAccount
      : "-";

  const contractFields = [
    { label: "계약명", value: title || "-" },
    {
      label: "계약기간",
      value: contractPeriod || "-",
    },
    { label: "계약금액", value: amount ? `${formatKRW(amount)}원` : "-" },
  ];

  const clientFields = [
    { label: "성함", value: clientName || "-" },
    { label: "전화번호", value: formatPhone(clientPhone) || "-" },
  ];

  const freelancerFields = [
    { label: "성함", value: freelancerName || "-" },
    { label: "전화번호", value: formatPhone(freelancerPhone) || "-" },
    { label: "계좌번호", value: receivingAccount || "-" },
  ];

  return (
    <div>
      <InfoCard title="계약 정보" items={contractFields} />
      <InfoCard title="도급인 정보" items={clientFields} />
      <InfoCard title="수급인 정보" items={freelancerFields} />
    </div>
  );
};

export default ContractTemplate;
