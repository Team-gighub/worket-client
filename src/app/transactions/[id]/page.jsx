import "@/app/globals.css";
import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";
import TransactionStatusBox from "@/components/transactions/TransactionStatusBox";
import TransactionTimeline from "@/components/transactions/TransactionTimeLine";
import TransactionInfo from "@/components/transactions/TransactionInfo";
import { getTransactionsDetail } from "@/lib/api/server/transactionServices";
import formatKRW from "@/app/utils/KRWFormatter";
import CopyTradeLinkButton from "@/components/transactions/CopyTradeLinkButton";
import ViewContractButton from "@/components/transactions/ViewContractButton";
import PostModifyButton from "@/components/transactions/PostModifyButton";

/* 거래 페이지 */
const Transaction = async ({ params }) => {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const { data: transaction } = await getTransactionsDetail(id);

  return (
    <div>
      <InfoText
        mainTexts={[
          transaction.contractInfo.title,
          `${formatKRW(transaction.contractInfo.amount)} 원`,
        ]}
      />

      {/* 거래 상태 표시 섹션 */}
      <TransactionStatusBox status={transaction.status} />

      {/* 거래 타임라인 섹션 */}
      <TransactionTimeline data={transaction} />

      {/* 거래페이지 링크 복사 섹션  */}
      <div className="m-[2rem] flex flex-col">
        <p className="pretendard-semibold-20">거래 페이지</p>
        <CopyTradeLinkButton transactionId={id} />
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
        <ViewContractButton pdfUrl={transaction.contractFileUrl} />
      </div>

      {/* 계약서 수정 요청 섹션  */}

      <div className="m-[2rem] flex flex-col">
        <p className="pretendard-semibold-20">계약서 수정 요청</p>
        <PostModifyButton postId={id} />
      </div>
    </div>
  );
};

export default Transaction;
