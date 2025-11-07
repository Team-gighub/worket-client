import "@/app/globals.css";
import InfoText from "@/components/common/InfoText";
import InputField from "@/components/common/InputField";
import InputAccountField from "@/components/common/InputAccountField";
import MainButton from "@/components/common/MainButton";

/* 새 계약서 생성하기 */
const CreatePage = () => {
  /* TODO: 더미 데이터 수정 필요 */
  const bankOptions = [
    { value: "woori", label: "우리은행" },
    { value: "shinhan", label: "신한은행" },
    { value: "kb", label: "국민은행" },
  ];
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
          ></InputField>
          <InputField
            question="계약기간"
            placeholder="20250101~20251231"
          ></InputField>
          <InputField
            question="계약금액"
            placeholder="숫자만 입력해주세요"
          ></InputField>
          <InputField
            question="고객명"
            placeholder="고객명을 작성해주세요"
          ></InputField>
          <InputField
            question="고객 전화번호"
            placeholder="- 없이 번호만 입력해주세요"
          ></InputField>
          <InputAccountField
            question="입금받을 계좌번호 입력"
            placeholder="숫자만 입력해주세요"
            selectValue="은행선택"
            selectOptions={bankOptions}
          ></InputAccountField>
        </div>
        <div className="flex w-[342px]">
          <MainButton text="생성하기" isFullWidth={true}></MainButton>
        </div>
      </div>
    </div>
  );
};
export default CreatePage;
