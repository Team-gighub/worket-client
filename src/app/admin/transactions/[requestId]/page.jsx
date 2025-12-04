"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import adminContractService from "@/lib/api/client/adminContractService";
import ContractRevisionDetail from "@/components/admin/ContractRevisionDetail";
import Link from "next/link";

const ContractRevisionsDetailPage = () => {
  const routeParams = useParams();
  const modificationId = routeParams?.requestId; // useParams에서 가져온 값만 사용

  const searchParams = useSearchParams();
  const status = searchParams?.get("status") ?? undefined;

  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!modificationId) return;

    let mounted = true;
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res =
          await adminContractService.getContractDetail(modificationId);
        const payload = res?.data ?? res;
        if (!mounted) return;
        setApiData(payload);
        // console.log(
        //   "Fetched API data for modificationId",
        //   modificationId,
        //   ":",
        //   payload,
        // );
      } catch (err) {
        if (!mounted) return;
        console.error("getContractDetail error:", err);
        setError(err?.message ?? String(err));
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    fetchDetail();
    return () => {
      mounted = false;
    };
  }, [modificationId]);

  if (loading) return <div className="p-8">로딩 중...</div>;
  if (!apiData || error) {
    return (
      <div className="h-full">
        <div className="bg-basic-100 items-center py-4 px-2 border-b border-basic-300 sticky top-0 z-10">
          <div className="flex items-center space-x-4 ">
            <Link href="/admin/transactions">
              <span className="mr-2">←</span> 목록으로
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center h-80">
          <h1 className="pretendard-semibold-20 text-point-red-300">
            요청 ID {modificationId ?? "(없음)"}에 해당하는 내역을 찾을 수
            없습니다.
          </h1>
        </div>
      </div>
    );
  }

  const uiData = {
    ...apiData,
    id: apiData.id ?? apiData.modificationId ?? modificationId,
    status: apiData.status ?? status ?? null,
    fileUrl: apiData.fileUrl ?? null,
  };

  // console.log("Contract Revision Detail Data:", uiData);
  return (
    <div className="p-8 text-basic-600">
      <ContractRevisionDetail data={uiData} />
    </div>
  );
};

export default ContractRevisionsDetailPage;
