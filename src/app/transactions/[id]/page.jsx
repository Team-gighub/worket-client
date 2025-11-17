import "@/app/globals.css";
import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";
import TransactionStatusBox from "@/components/transactions/TransactionStatusBox";
import TransactionTimeline from "@/components/transactions/TransactionTimeLine";
import TransactionInfo from "@/components/transactions/TransactionInfo";
import getTransactionById from "@/app/api/getTransactionById";
import LinkIcon from "@/assets/link.png";
import ExternalLinkIcon from "@/assets/external-link.png";

// 참고: getTransactionById가 반환하는 mock data 구조
// const transaction = {
//   client_name: "홍길동",
//   freelancer_bank: "우리",
//   freelancer_account: "1001-02-110-1254",
//   contract_start_date: "2024-01-15 10:30:00",
//   contract_end_date: "2024-01-15 10:30:00",
//   contract_created_at: "2024-01-15 10:30:00",
//   title: "워켓 프론트엔드 개발",
//   price: "10,000",
//   status: "SETTLED",
//   created_at: "2024-01-15 10:30:00",
//   signed_at: "2024-01-15 10:30:00",
//   deposit_hold_at: "2024-01-15 10:30:00",
//   payment_confirmed_at: "2024-01-15 10:30:00",
//   settled_at: "2024-01-15 10:30:00",
// };

/* 거래 페이지 */
const Transaction = async ({ params }) => {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const transaction = await getTransactionById(id);

  return (
    <div>
      <InfoText mainTexts={[transaction.title, `${transaction.price} 원`]} />

      {/* 거래 상태 표시 섹션 */}
      <TransactionStatusBox status={transaction.status} />

      {/* 거래 타임라인 섹션 */}
      <TransactionTimeline data={transaction} />

      {/* 거래페이지 링크 복사 섹션  */}
      <div className="m-[2rem] flex flex-col">
        <p className="pretendard-semibold-20">거래 페이지</p>
        <MainButton
          text={"링크 복사"}
          height={"4rem"}
          theme={"secondary"}
          icon={{ src: LinkIcon, alt: "링크 복사" }}
        />
        {transaction.status === "CREATED" && (
          <p className="pretendard-medium-14 text-point-red-300">
            고객이 아직 서명하지 않았어요. 링크를 다시 보내보세요!
          </p>
        )}
      </div>

      {/* 거래 정보 섹션 */}
      <div>
        <TransactionInfo data={transaction} />
      </div>

      {/* 계약서 원본 보기 섹션  */}
      <div className="m-[2rem] flex flex-col">
        <p className="pretendard-semibold-20">계약서 원본</p>
        <MainButton
          text={"원본 보기"}
          height={"4rem"}
          theme={"darkgray"}
          icon={{ src: ExternalLinkIcon, alt: "원본 보기" }}
        />
      </div>
    </div>
  );
};

export default Transaction;
