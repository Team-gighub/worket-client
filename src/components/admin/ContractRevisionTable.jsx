"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 1. 상태에 따른 배지 스타일을 반환하는 함수 (순수 div/span 태그 사용)
const getStatusBadge = (status) => {
  let colorClass = "";
  let text = "";

  switch (status) {
    case "PENDING":
      colorClass =
        "bg-point-yellow-100 text-point-yellow-300  border border-point-yellow-300";
      text = "대기";
      break;
    case "APPROVED":
      colorClass =
        "bg-point-green-100 text-point-green-300 border border-point-green-300";
      text = "승인";
      break;
    case "REJECTED":
      colorClass =
        "bg-point-red-100 text-point-red-300 border border-point-red-300";
      text = "거절";
      break;
    default:
      colorClass = "bg-basic-300 text-basic-600 border border-basic-500";
      text = "알 수 없음";
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 pretendard-medium-12 ${colorClass}`}
    >
      {text}
    </span>
  );
};

// 2. 테이블 UI 컴포넌트 (Server Component 또는 Client Component로 사용 가능)
const ContractRevisionTable = ({ revisions }) => {
  const router = useRouter();

  if (!revisions || revisions.length === 0) {
    return (
      <div className="p-6 text-center text-basic-600">
        표시할 수정 요청 내역이 없습니다.
      </div>
    );
  }

  // 각 행의 request 객체를 받아 안전하게 URL을 구성하고 이동합니다.
  const handleNavigate = (request) => {
    // console.log("Navigating to detail page for request:", request);
    if (!request) return;
    const modificationId = request.modificationId ?? request.id;
    const transactionId = request.transactionId ?? request.contractId ?? "";
    const status = request.status ?? "";

    const params = new URLSearchParams();
    if (transactionId !== "")
      params.set("transactionId", String(transactionId));
    if (status !== "") params.set("status", String(status));

    const query = params.toString();
    const href = `/admin/transactions/${encodeURIComponent(
      String(modificationId),
    )}${query ? `?${query}` : ""}`;

    router.push(href);
  };

  return (
    <table className="w-full table-auto ">
      <thead className=" border-b">
        <tr>
          <th className="text-center py-3 px-4 pretendard-bold-14">요청 ID</th>
          <th className="text-center py-3 px-4 pretendard-bold-14">계약 ID</th>
          <th className="text-center py-3 px-4 pretendard-bold-14">
            요청 사용자
          </th>
          <th className="text-center py-3 px-4 pretendard-bold-14">상태</th>
          <th className="text-center py-3 px-4 pretendard-bold-14">요청일</th>
          <th className="text-center py-3 px-4 pretendard-bold-14">작업</th>
        </tr>
      </thead>
      <tbody>
        {revisions.map((request) => (
          <tr
            key={request.modificationId ?? request.id}
            className="text-center pretendard-medium-12 border-b border-basic-300 hover:bg-basic-200 transition-colors"
          >
            <td className="py-3">
              {request.modificationId ?? request.id ?? "-"}
            </td>
            <td className="py-3">
              {request.transactionId ?? request.contractId ?? "-"}
            </td>
            <td className="py-3">
              {request.userName ?? request.requester ?? "-"}
            </td>
            <td className="py-3">{getStatusBadge(request.status)}</td>
            <td className="py-3">
              {request.createdAt ? String(request.createdAt).slice(0, 10) : "-"}
            </td>
            <td className="py-3">
              <button
                onClick={() => handleNavigate(request)}
                className="rounded-2xl h-8 px-3 text-basic-600 hover:bg-basic-300"
              >
                상세 보기
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContractRevisionTable;
