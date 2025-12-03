"use client";
import { usePaymentStore } from "@/stores/paymentStore";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import InputAccount from "@/components/common/InputField";
import DualButtons from "@/components/common/DualButtons";
import { useState, useEffect } from "react";
import TradePasscodeForm from "@/components/passcode/PGPasscodeForm";
import { usePgStore } from "@/stores/pgStore";
import { postPgPaymentAuthorize } from "@/lib/pg/api/pgClientServices";

const SelectAccount = () => {
  const router = useRouter();
  const { id } = useParams();
  const [accountNumber, setAccountNumber] = useState("");
  // passcodeForm출력
  const [showPassCodeForm, setShowPassCodeForm] = useState(false);
  // passcode 받기
  const [passcode, setPasscode] = useState("");
  //은행 정보(은행, 은행 아이콘) 가져오기
  const selectedBankInfo = usePaymentStore((state) => state.selectedBankInfo);
  const selectAccount = usePaymentStore((state) => state.selectAccount);
  const { payload, setPayerInfo } = usePgStore();

  useEffect(() => {
    if (!selectedBankInfo || !selectedBankInfo.id) {
      router.push(`/pg/${id}`);
    }
  }, [selectedBankInfo, router, id]);

  if (!selectedBankInfo || !selectedBankInfo.id) return null;

  const handleAccountChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleMainBtn = () => {
    if (!accountNumber) {
      alert("계좌번호를 입력해주세요.");
      return;
    }
    // 계좌 정보 store 저장
    selectAccount({ accountNumber });
    setPayerInfo({ accountNo: accountNumber });
    setShowPassCodeForm(true);
  };

  const handleSubBtn = () => {
    router.push(`/pg/${id}`);
  };
  const handlePasscodeComplete = async (enteredPasscode) => {
    setPasscode(enteredPasscode); // SelectAccount state에 저장
    //TODO: PG server API 호출-> accountNumber,selectedBankId 같이 넘김
    const { data } = await postPgPaymentAuthorize(payload);
    window.location.href = data.redirectUrl;
  };
  const { label, icon } = selectedBankInfo;

  return (
    <>
      {/* 카드 내부 콘텐츠 (showPassCodeForm이 false일 때만 표시) */}
      <div className="flex flex-col justify-between h-full pb-[3rem]">
        {!showPassCodeForm && (
          <>
            <div>
              <div className="flex gap-4 items-center w-[31rem] mb-8 mt-8 pl-8">
                {icon && (
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="text-lg font-medium">{label}</div>
              </div>

              <InputAccount
                onChange={handleAccountChange}
                question="계좌번호"
                placeholder="계좌번호를 입력하세요"
                type="number"
              />
            </div>

            <DualButtons
              mainText="확인"
              onMainClick={handleMainBtn} // '확인' 버튼 클릭 시 showPassCodeForm = true
              subText="이전"
              onSubClick={handleSubBtn}
              width="34rem"
              mainButtonTheme="secondary"
            />
          </>
        )}
      </div>
      {showPassCodeForm && (
        <div className="absolute inset-0 bg-basic-200 z-20 flex justify-center items-center">
          <TradePasscodeForm handlePasscodeComplete={handlePasscodeComplete} />
        </div>
      )}
    </>
  );
};

export default SelectAccount;
