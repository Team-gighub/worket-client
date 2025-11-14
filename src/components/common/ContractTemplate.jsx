import InfoCard from "@/components/common/InfoCard";
import formatKRW from "@/app/utils/KRWFormatter";
import { formatPhone } from "@/app/utils/phoneFormatter";
import { formatContractPeriod } from "@/app/utils/contractPeriodFormatter";

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

  const receivingAccount =
    freelancerBank && freelancerAccount
      ? freelancerBank + " " + freelancerAccount
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
