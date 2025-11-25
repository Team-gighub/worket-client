"use client";
import InfoText from "@/components/common/InfoText";
import PaymentButton from "@/components/pg/PaymentButton";
import paymentOptions from "@/components/pg/PaymentOptions";
import { useParams, useRouter } from "next/navigation";
import { usePaymentStore } from "@/stores/paymentStore";
import Image from "next/image";

const PgMain = () => {
  const { id } = useParams();
  const router = useRouter();
  const selectBank = usePaymentStore((state) => state.selectBank);
  const MAX_PAYMENT_OPTIONS_TO_SHOW = 15;
  const handlePaymentSelect = (bank) => {
    selectBank(bank.id, bank);
    router.push(`${id}/account`);
  };
  return (
    <div className="h-full flex flex-col bg-basic-100 py-[4rem]">
      <div className="w-full max-w-6xl h-[90%] bg-basic-200 rounded-2xl shadow-lg p-8 overflow-hidden flex flex-col">
        <div className="border-t border-b border-gray-300 py-6 mb-12">
          <div className="flex flex-row items-center justify-between p-4">
            <div className="flex items-center gap-6">
              <p className="pretendard-semibold-16 text-basic-600 whitespace-nowrap">
                우리 PG
              </p>
              <p className="pretendard-semibold-14 text-basic-700 whitespace-nowrap">
                안전하고 편리한 우리 PG 입니다
              </p>
            </div>

            {/* 오른쪽 Close 버튼 */}
            <button
              onClick={() => router.push(`/trade/${id}/deposit`)}
              className="flex flex-col items-center hover:opacity-80"
              aria-label="닫기"
            >
              <div className="relative w-[1.6rem] h-[1.6rem]">
                <Image
                  src="/icons/icClose.png"
                  alt="닫기"
                  fill
                  sizes="1.6rem"
                  className="object-contain"
                  loading="eager"
                />
              </div>
            </button>
          </div>
        </div>
        <div className="p-4 max-w-4xl mx-auto">
          <h2 className="pretendard-semibold-16 font-semibold mb-10 ml-2">
            결제 수단/카드사 선택
          </h2>
          <div className="grid grid-cols-3 gap-12">
            {/* 들어있는 은행 만큼 */}
            {paymentOptions
              .slice(0, MAX_PAYMENT_OPTIONS_TO_SHOW)
              .map((option) => (
                <PaymentButton
                  key={option.id}
                  label={option.label}
                  icon={option.icon}
                  onClick={() => handlePaymentSelect(option)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PgMain;
