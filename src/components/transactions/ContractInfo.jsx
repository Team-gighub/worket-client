"use client";
import "@/app/globals.css";
import { React } from "react";
import { useContractCreateStore } from "@/stores/contractCreateStore";
import ContractTemplate from "../common/ContractTemplate";

const ContractInfo = () => {
  const { contract } = useContractCreateStore();

  return (
    <ContractTemplate
      contractInfo={contract.contractInfo}
      clientInfo={contract.clientInfo}
      freelancerInfo={contract.freelancerInfo}
    />
  );
};

export default ContractInfo;
