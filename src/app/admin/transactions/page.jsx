"use client";

import { useEffect } from "react";
import { useContractRevisionStore } from "@/stores/contractRevisionStore";
import ContractRevisionTable from "@/components/admin/ContractRevisionTable";

const ContractRevisionsListPage = () => {
  // revisions: 수정 요청 내역 배열
  const { revisions, loading, error, fetchRevisions } =
    useContractRevisionStore();

  useEffect(() => {
    fetchRevisions();
  }, [fetchRevisions]);

  if (loading) return <div className="p-8">로딩 중...</div>;
  if (error) return <div className="p-8 text-point-red-300">에러: {error}</div>;

  return (
    <div className="p-8 text-basic-700">
      <h1 className="pretendard-semibold-20 mb-6"> 계약서 수정 요청 관리</h1>
      <div className="bg-basic-100 border border-basic-200 overflow-x-auto">
        <ContractRevisionTable revisions={revisions} />
      </div>
    </div>
  );
};

export default ContractRevisionsListPage;
