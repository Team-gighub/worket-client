"use client";
import InfoText from "@/components/common/InfoText";
import { usePaymentStore } from "@/stores/paymentStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InputAccount from "@/components/common/InputField";
import DualButtons from "@/components/common/DualButtons";
import { useState, useEffect } from "react";

const SelectAccount = ({ id }) => {
  const router = useRouter();
  const [accountNumber, setAccountNumber] = useState("");
  //은행 정보(은행, 은행 아이콘) 가져오기
  const selectedBankInfo = usePaymentStore((state) => state.selectedBankInfo);
  const selectAccount = usePaymentStore((state) => state.selectAccount);
  // redirect 처리
  useEffect(() => {
    if (!selectedBankInfo || !selectedBankInfo.id) {
      router.push("/pg");
    }
  }, [selectedBankInfo, router]);

  if (!selectedBankInfo || !selectedBankInfo.id) return null;

  const handleAccountChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleMainBtn = () => {
    if (!accountNumber) {
      alert("계좌번호를 입력해주세요.");
      return;
    }
    //계좌정보 넣기
    selectAccount({ accountNumber });
    router.push("/pg/confirm");
  };

  const handleSubBtn = () => {
    router.push("/pg");
  };

  const { label, icon } = selectedBankInfo;

  return (
    <div className="h-full flex flex-col bg-basic-100 py-[4rem]">
      {/* 회색 카드 */}
      <div className="w-full max-w-6xl h-[90%] bg-basic-200 rounded-2xl shadow-lg p-8 overflow-hidden flex flex-col">
        {/* 회색 카드 상단 헤더 라인 */}
        <div className="border-t border-b border-gray-300 py-6 mb-12">
          <div className="flex flex-row items-center justify-between p-4">
            {/* 왼쪽 텍스트 */}
            <div className="flex items-center gap-6">
              <p className="pretendard-semibold-16 text-basic-600 whitespace-nowrap">
                우리 PG
              </p>
              <p className="pretendard-semibold-14 text-basic-700 whitespace-nowrap">
                안전하고 편리한 우리 PG 입니다
              </p>
            </div>

            {/* X 버튼 */}
            <button
              onClick={() => router.push("/")}
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
                />
              </div>
            </button>
          </div>
        </div>

        {/* 카드 내부 콘텐츠 */}
        <div className="flex flex-col justify-between h-full pb-[3rem]">
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
            onMainClick={handleMainBtn}
            subText="이전"
            onSubClick={handleSubBtn}
            width="34rem"
            mainButtonTheme="secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectAccount;
