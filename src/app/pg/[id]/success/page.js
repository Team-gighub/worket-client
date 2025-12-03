"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import InfoCard from "@/components/common/InfoCard";
import MainButton from "@/components/common/MainButton";
import PaymentLoading from "@/components/pg/PaymentLoading";
import { postPgPaymentApproval } from "@/lib/api/client/pgServices";
import { formatDateTimeKorean } from "@/app/utils/dateFormatter";
import formatKRW from "@/app/utils/KRWFormatter";
import { useTradeDataStore } from "@/stores/tradeDataStore";

const PaymentSuccess = () => {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();

  const escrowId = searchParams.get("escrowId");
  const confirmToken = searchParams.get("confirmToken");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { updateEscrowId } = useTradeDataStore();

  useEffect(() => {
    const approvePayment = async () => {
      if (!escrowId || !confirmToken) {
        router.replace("fail");
        return;
      }

      updateEscrowId(escrowId);

      try {
        const { data: paymentData } = await postPgPaymentApproval({
          transactionId: id,
          escrowId,
          confirmToken,
        });
        setData(paymentData);
      } catch (err) {
        router.replace("fail");
      } finally {
        setLoading(false);
      }
    };

    approvePayment();
  }, [escrowId, confirmToken, router]);

  if (loading) {
    return <PaymentLoading title="대금 예치 중입니다..." />;
  }

  if (data) {
    return (
      <>
        <div
          className="overflow-y-scroll bg-basic-100 py-[3rem] px-[2rem] rounded-[10px]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <h2 className="pretendard-semibold-24 text-primary text-center">
            에스크로 대금예치 완료
          </h2>
          <p className="text-center text-basic-500 mb-[3rem]">
            대금이 안전하게 예치되었습니다.
          </p>

          {/* 1. 예치 결과 정보 */}
          <InfoCard
            title="예치 정보"
            description="결제 및 예치 상세 내역"
            items={[
              { label: "예치번호", value: data.escrowId },
              {
                label: "결제 금액",
                value: `${formatKRW(data.holdAmount)}원`,
              },
              { label: "예치 상태", value: data.holdStatus },
              {
                label: "결제 시간",
                value: formatDateTimeKorean(data.holdStartDatetime),
              },
            ]}
          />
        </div>
        <div className="text-center mt-8">
          <p className="pretendard-medium-12 text-point-green-300">
            지급 확정 전까지 대금이 안전하게 보관됩니다.
          </p>
          <MainButton
            text="홈으로 돌아가기"
            onClick={() => router.push(`/trade/${id}`)}
            width="100%"
          />
        </div>
      </>
    );
  }

  return null;
};

export default PaymentSuccess;
