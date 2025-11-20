"use client";
import "@/app/globals.css";
import { React, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContractCreateStore } from "@/stores/contractCreateStore";
import InfoText from "@/components/common/InfoText";
import InputField from "@/components/common/InputField";
import InputAccountField from "@/components/common/InputAccountField";
import MainButton from "@/components/common/MainButton";
import { getUsers } from "@/lib/api/client/userServices";

/* 새 계약서 생성하기 */
const CreatePage = () => {
  const router = useRouter();
  const {
    contract: data,
    setNestedField,
    setFreelancerInfo, //사용자 정보를 받아와서 zustand 저장
  } = useContractCreateStore();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. ('users/me')호출
        const response = await getUsers();
        console.log(response);

        // 2. 응답 데이터 추출(휴대폰, 이름 추출)
        const phone = response.data.phone;
        const name = response.data.name;

        // 3. 저장
        setFreelancerInfo(name, phone);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  const { contractInfo, clientInfo, freelancerInfo } = data;

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
      { path: "contractInfo.title", message: "계약명을 입력해주세요." },
      { path: "contractInfo.startDate", message: "시작일을 입력해주세요." },
      { path: "contractInfo.endDate", message: "종료일을 입력해주세요." },
      { path: "contractInfo.amount", message: "계약금액을 입력해주세요." },

      { path: "clientInfo.name", message: "의뢰인 이름을 입력해주세요." },
      { path: "clientInfo.phone", message: "의뢰인 연락처를 입력해주세요." },

      { path: "freelancerInfo.account", message: "계좌번호를 입력해주세요." },
      { path: "freelancerInfo.bank", message: "은행명을 입력해주세요." },
    ];

    const invalidField = requiredFields.find((field) => {
      const keys = field.path.split(".");

      const value = keys.reduce((obj, key) => {
        if (obj === null || obj === undefined || typeof obj !== "object") {
          return null;
        }
        return obj[key];
      }, data);

      return !value || String(value).trim() === "";
    });

    if (invalidField) {
      alert(invalidField.message);
      return;
    }

    const startDate = new Date(data.contractInfo.startDate);
    const endDate = new Date(data.contractInfo.endDate);

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
      />
      <div className="flex flex-col justify-center items-center">
        <div>
          <InputField
            question="계약명"
            placeholder="계약명을 작성해주세요"
            value={contractInfo.title || ""}
            onChange={(e) =>
              setNestedField("contractInfo", "title", e.target.value)
            }
          />
          <InputField
            type="Date"
            question="계약 시작일"
            placeholder="날짜를 선택해주세요"
            value={contractInfo.startDate || ""}
            onChange={(e) =>
              setNestedField("contractInfo", "startDate", e.target.value)
            }
          />
          <InputField
            type="Date"
            question="계약 종료일"
            placeholder="날짜를 선택해주세요"
            value={contractInfo.endDate || ""}
            onChange={(e) =>
              setNestedField("contractInfo", "endDate", e.target.value)
            }
          />
          <InputField
            question="계약금액"
            placeholder="숫자만 입력해주세요"
            type="number"
            value={contractInfo.amount || ""}
            onChange={(e) =>
              setNestedField("contractInfo", "amount", e.target.value)
            }
          />
          <InputField
            question="고객명"
            placeholder="고객명을 작성해주세요"
            value={clientInfo.name || ""}
            onChange={(e) =>
              setNestedField("clientInfo", "name", e.target.value)
            }
          />
          <InputField
            question="고객 전화번호"
            placeholder="- 없이 번호만 입력해주세요"
            type="tel"
            value={clientInfo.phone || ""}
            onChange={(e) => {
              const value = e.target.value;
              const filtered = value.replaceAll(/\D/g, "").slice(0, 11);
              setNestedField("clientInfo", "phone", filtered);
            }}
          />
          <InputAccountField
            question="입금받을 계좌번호 입력"
            placeholder="- 없이 숫자만 입력해주세요"
            inputValue={freelancerInfo.account || ""}
            selectOptions={bankOptions}
            onInputChange={(e) =>
              setNestedField("freelancerInfo", "account", e.target.value)
            }
          />
        </div>
        <div className="flex w-[342px]">
          <MainButton
            text="생성하기"
            isFullWidth={true}
            onClick={handleNextStep}
          />
        </div>
      </div>
    </div>
  );
};
export default CreatePage;
