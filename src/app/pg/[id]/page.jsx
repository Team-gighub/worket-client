"use client";
import PaymentButton from "@/components/pg/PaymentButton";
import paymentOptions from "@/components/pg/PaymentOptions";
import { useParams, useRouter } from "next/navigation";
import { usePaymentStore } from "@/stores/paymentStore";
import { usePgStore } from "@/stores/pgStore";

const PgMain = () => {
  const { id } = useParams();
  const router = useRouter();
  const selectBank = usePaymentStore((state) => state.selectBank);
  const { setPayerInfo } = usePgStore();

  const MAX_PAYMENT_OPTIONS_TO_SHOW = 15;

  const handlePaymentSelect = (bank) => {
    selectBank(bank.id, bank);
    setPayerInfo({ bankCode: bank.kftcCode });
    router.push(`${id}/account`);
  };
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="pretendard-semibold-16 font-semibold mb-10 ml-2">
        결제 수단/카드사 선택
      </h2>
      <div className="grid grid-cols-3 gap-12">
        {/* 들어있는 은행 만큼 */}
        {paymentOptions.slice(0, MAX_PAYMENT_OPTIONS_TO_SHOW).map((option) => (
          <PaymentButton
            key={option.id}
            label={option.label}
            icon={option.icon}
            onClick={() => handlePaymentSelect(option)}
          />
        ))}
      </div>
    </div>
  );
};
export default PgMain;
