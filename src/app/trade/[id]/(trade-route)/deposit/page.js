"use client";

import ContractTemplate from "@/components/common/ContractTemplate";
import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";
import { usePgStore } from "@/stores/pgStore";
import { useTradeDataStore } from "@/stores/tradeDataStore";
import { useParams, useRouter } from "next/navigation";

const TradeDeposit = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data: tradeData } = useTradeDataStore();
  const { setPgStore } = usePgStore();
  const { contractInfo, clientInfo, freelancerInfo } = tradeData;

  const handleDepositClick = async () => {
    if (id) {
      try {
        const pgPayload = {
          merchantId: "WK",
          userName: clientInfo.name,
          productName: contractInfo.title,
          amount: contractInfo.amount,
          orderNo: id,
          payerInfo: {
            accountNo: "",
            bankCode: "",
            name: clientInfo.name,
            phone: clientInfo.phone,
          },
          payeeInfo: {
            accountNo: freelancerInfo.account,
            bankCode: freelancerInfo.bank,
            name: freelancerInfo.name,
            phone: freelancerInfo.phone,
          },
          successUrl: `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/pg/${id}/success`,
          failUrl: `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/pg/${id}/fail`,
        };
        setPgStore(pgPayload);

        //pg/:id 로 라우팅 -> pg 제공 창 이동
        router.push(`/pg/${id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="h-full w-full flex flex-col justify-between items-center pb-[3rem] px-[2rem] gap-[3rem]">
      <InfoText
        mainTexts={[`${clientInfo.name}님께`, `이체를 진행하겠습니다.`]}
        subText="계약명과 지급액을 한번 더 확인한 후 이체를 진행해주세요!"
      />
      <ContractTemplate
        contractInfo={contractInfo}
        clientInfo={clientInfo}
        freelancerInfo={freelancerInfo}
      />
      <MainButton text="대금 예치하기" onClick={handleDepositClick} />
    </div>
  );
};

export default TradeDeposit;
