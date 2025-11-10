"use client";
import "@/app/globals.css";
import { React } from "react";
import { useRouter } from "next/navigation";
import { useContractCreateStore } from "@/stores/contractCreateStore";
import InfoText from "@/components/common/InfoText";
import InputField from "@/components/common/InputField";
import InputAccountField from "@/components/common/InputAccountField";
import MainButton from "@/components/common/MainButton";

/* 새 계약서 생성하기 */
const CreatePage = () => {
  const router = useRouter();
  const { contract, setField } = useContractCreateStore();

  /* TODO: 더미 데이터 수정 필요 */
  const bankOptions = [
    { value: "우리은행", label: "우리은행" },
    { value: "신한은행", label: "신한은행" },
    { value: "국민은행", label: "국민은행" },
  ];

  /* 로딩 및 데이터 상태 관리 */
  // const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = () => {
    const requiredFields = [
      "title",
      "start_date",
      "end_date",
      "amount",
      "client_name",
      "client_phone",
      "account_number",
      "bank",
    ];

    const isFormValid = requiredFields.every(
      (key) => contract[key] && contract[key].trim() !== "",
    );

    if (!isFormValid) {
      alert("모든 필수 정보를 입력해주세요.");
      return;
    }

    const startDate = new Date(contract.start_date);
    const endDate = new Date(contract.end_date);

    if (isNaN(startDate) || isNaN(endDate)) {
      alert("날짜 형식이 올바르지 않습니다.");
      return;
    }

    if (endDate < startDate) {
      alert("종료일은 시작일 이후여야 합니다.");
      return;
    }

    router.push("/transactions/create/preview");
  };

  return (
    <div className="px-8 py-4">
      <InfoText
        mainTexts={["진행될 계약 내용을", "작성해주세요"]}
        subText="워켓이 계약서를 만들어 거래 페이지를 제공합니다!"
        subTextColor="gray"
      ></InfoText>
      <div className="flex flex-col justify-center items-center">
        <div>
          <InputField
            question="계약명"
            placeholder="계약명을 작성해주세요"
            value={contract.title || ""}
            onChange={(e) => setField("title", e.target.value)}
          ></InputField>
          <InputField
            type="Date"
            question="계약 시작일"
            placeholder="날짜를 선택해주세요"
            value={contract.start_date || ""}
            onChange={(e) => setField("start_date", e.target.value)}
          ></InputField>
          <InputField
            type="Date"
            question="계약 종료일"
            placeholder="날짜를 선택해주세요"
            value={contract.end_date || ""}
            onChange={(e) => setField("end_date", e.target.value)}
          ></InputField>
          <InputField
            question="계약금액"
            placeholder="숫자만 입력해주세요"
            type="number"
            value={contract.amount || 0}
            onChange={(e) => setField("amount", e.target.value)}
          ></InputField>
          <InputField
            question="고객명"
            placeholder="고객명을 작성해주세요"
            value={contract.client_name || ""}
            onChange={(e) => setField("client_name", e.target.value)}
          ></InputField>
          <InputField
            question="고객 전화번호"
            placeholder="- 없이 번호만 입력해주세요"
            type="tel"
            value={contract.client_phone || ""}
            onChange={(e) => {
              const value = e.target.value;
              const filtered = value.replaceAll(/\D/g, "").slice(0, 11);
              setField("client_phone", filtered);
            }}
          ></InputField>
          <InputAccountField
            question="입금받을 계좌번호 입력"
            placeholder="- 없이 숫자만 입력해주세요"
            intputValue={contract.account_number || 0}
            selectOptions={bankOptions}
            onInputChange={(e) => setField("account_number", e.target.value)}
          ></InputAccountField>
        </div>
        <div className="flex w-[342px]">
          <MainButton
            text="생성하기"
            isFullWidth={true}
            onClick={handleNextStep}
          ></MainButton>
        </div>
      </div>
    </div>
  );
};
export default CreatePage;
