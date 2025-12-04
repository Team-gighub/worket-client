"use client";

import { useState } from "react";
import Link from "next/link";
import { usePdfViewer } from "@/hooks/usePdfViewer";
import { postContractModifyApprove } from "@/lib/api/client/adminContractService";

// 상태 배지 컴포넌트 (순수 Tailwind CSS)
const StatusBadge = ({ status }) => {
  let colorClass = "";
  switch (status) {
    case "PENDING":
      colorClass = "bg-point-yellow-300/30 text-point-yellow-300";
      break;
    case "APPROVED":
      colorClass = "bg-point-green-300/30 text-point-green-300";
      break;
    case "REJECTED":
      colorClass = "bg-point-red-300/30 text-point-red-300";
      break;
    default:
      colorClass = "bg-gray-300/30 text-basic-600";
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1  font-medium ${colorClass}`}
    >
      {status}
    </span>
  );
};

// API 응답 구조를 받아 컴포넌트에서 사용하기 쉬운 형태로 변환하는 유틸리티 함수
// 이 함수는 page.jsx에서 호출되어 정제된 데이터를 넘겨주는 것이 더 좋지만,
// 현재는 컴포넌트 내부에서 데이터를 재구성합니다.
const mapApiDataToDisplay = (apiData) => {
  console.log("Mapping API data to display format:", apiData);
  const {
    freelancerInfoDto,
    clientInfoDto,
    contractInfoDto,
    content,
    id,
    status,
    fileUrl,
  } = apiData;

  // OCR 메타데이터 매핑
  const ocrMetadata = {
    계약명: contractInfoDto.title,
    "계약 기간": `${contractInfoDto.startDate} ~ ${contractInfoDto.endDate}`,
    "계약 금액": `${Number(contractInfoDto.amount).toLocaleString()}원`,
    의뢰인: clientInfoDto.name,
    "의뢰인 연락처": clientInfoDto.phone,
    프리랜서: freelancerInfoDto.name,
    "프리랜서 연락처": freelancerInfoDto.phone,
    "프리랜서 계좌": `${freelancerInfoDto.bank} ${freelancerInfoDto.account}`,
  };

  return {
    id: id,
    status: status,
    requestReason: content,
    ocrMetadata: ocrMetadata,
    fileUrl: fileUrl,
  };
};

// 💡 새로운 함수: 평탄화된 formData를 API 요구 형식(중첩 객체)으로 변환
const mapFormDataToApiPayload = (formData) => {
  // 1. 금액에서 '원'과 쉼표 제거 후 숫자로 변환
  const cleanAmount = formData["계약 금액"].replace(/[원,]/g, "").trim();

  // 2. 계약 기간 분리
  const [startDate, endDate] = formData["계약 기간"]
    .split("~")
    .map((s) => s.trim());

  // 3. 프리랜서 계좌 분리 (ex: 국민은행 111-22-333333)
  const [bank, account] = formData["프리랜서 계좌"]
    .split(/\s(.+)/, 2)
    .map((s) => s.trim());

  return {
    freelancerInfoDto: {
      name: formData["프리랜서"],
      phone: formData["프리랜서 연락처"],
      account: account || "", // 계좌번호
      bank: bank || "", // 은행명
    },
    clientInfoDto: {
      name: formData["의뢰인"],
      phone: formData["의뢰인 연락처"],
    },
    contractInfoDto: {
      title: formData["계약명"],
      amount: Number(cleanAmount), // 숫자로 변환
      startDate: startDate,
      endDate: endDate,
    },
  };
};

const ContractRevisionDetail = ({ data }) => {
  const [adminComment, setAdminComment] = useState("");

  // 계약서 조회
  const { open, Viewer } = usePdfViewer();

  // API 응답 데이터 (data)를 디스플레이용 데이터로 변환
  const displayData = mapApiDataToDisplay(data);
  const initialData = displayData.ocrMetadata; // 초기 데이터 저장
  const metadataKeys = Object.keys(initialData);
  const modificationId = displayData.id; // API 요청 시 사용할 요청 ID

  // 1. 상태 정의
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);

  // 입력 필드 변경 핸들러 (Controlled Component)
  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // '수정' 버튼 클릭 핸들러: 수정 모드로 전환
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // '취소' 버튼 클릭 핸들러: 보기 모드로 전환하고, 수정 사항은 버림 (원본 initialData로 복구)
  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData(initialData);
  };

  // '적용' (로컬 저장) 버튼 클릭 핸들러: 수정 모드만 종료, 서버 전송은 하지 않음.
  const handleApplyEditClick = () => {
    setIsEditing(false);
    console.log(
      "OCR 메타데이터 수정 내용이 임시 저장되었습니다. 최종 승인 버튼을 눌러주세요.",
    );
  };

  // 관리자 액션 (승인/거부) 처리 핸들러
  const handleAction = async (actionType) => {
    if (actionType === "Approve") {
      // 1. 승인 액션: OCR 메타데이터 수정 내용을 포함하여 서버에 전송
      try {
        // 💡 1. formData (수정된 데이터)를 API 요구 형식으로 변환
        const payload = mapFormDataToApiPayload(formData);

        console.log("Final Approval Payload:", payload);

        // 💡 2. API 호출
        // postContractModifyApprove 함수는 이제 임시로 정의된 함수이므로 호출 가능합니다.
        await postContractModifyApprove(modificationId, payload);

        alert(
          "계약 수정 요청이 승인되었습니다. 데이터가 서버에 반영되었습니다.",
        );
        // 승인 후 목록으로 이동하거나 상태를 업데이트하는 로직 추가
      } catch (error) {
        console.error("계약 수정 승인 실패:", error);
        alert("계약 수정 승인 중 오류가 발생했습니다.");
      }
    } else if (actionType === "Reject") {
      // 2. 거부 액션: 관리자 코멘트만 포함하여 서버에 전송 (메타데이터 수정은 무시)
      // TODO: 이 부분은 가정된 API가 없으므로 로깅만 합니다.
      console.log(`[API] 계약 수정 거부 요청 (ID: ${modificationId})`);
      console.log("거부 코멘트:", adminComment);
      alert("계약 수정 요청이 거부되었습니다.");
    }
  };

  return (
    <div className=" min-h-screen pretendard-medium-14">
      {/* Header Bar */}
      <div className="bg-basic-100 flex justify-between items-center py-4 px-2 border-b border-basic-300 sticky top-0 z-10">
        <div className="flex items-center space-x-4 ">
          <Link href="/admin/transactions">
            <span className="mr-2">←</span> 목록으로
          </Link>
          <span className=" text-basic-500">요청 ID: {displayData.id}</span>
        </div>
        <div className="flex items-center space-x-3 text-basic-500">
          <span>상태:</span>
          <StatusBadge status={displayData.status} />
        </div>
      </div>

      {/* Main Content: 2-Column Layout */}
      <div className="flex gap-8 mt-6">
        <div className="w-[60%] space-y-6">
          {/* 원본 PDF 뷰어 */}
          <section className="p-6 rounded-lg border border-basic-300 shadow-sm">
            <h2 className="pretendard-semibold-20 mb-3 text-basic-600 border-b border-basic-300 pb-2">
              원본 계약서 PDF
            </h2>

            <div className="h-[70vh] w-full flex flex-col items-center justify-center rounded-lg text-gray-500 overflow-hidden">
              {/* TODO: aws에 presignedUrl 받아서 보여주기 추가 */}
              {/* <ViewContractButton pdfUrl={displayData.fileUrl} /> */}
              <button onClick={() => open(displayData.fileUrl)}>
                계약서 보기
              </button>
              <Viewer />
            </div>
          </section>
        </div>

        <div className="w-[40%] space-y-6">
          {/* OCR 메타데이터 (수정 가능한 영역) */}
          <section className="p-6 rounded-lg border border-basic-300 shadow-sm">
            <h2 className="pretendard-semibold-20 mb-3 text-basic-600 border-b border-basic-300 pb-2">
              OCR로 추출된 계약서
            </h2>

            <div className="space-y-2">
              {metadataKeys.map((key) => (
                <div key={key} className="flex">
                  <span className="w-1/3 text-basic-800">{key}</span>
                  <span className="w-2/3 text-basic-600">
                    {/* 조건부 렌더링: 수정 모드일 때 input 필드 표시 */}
                    {isEditing ? (
                      <input
                        type="text"
                        // formData를 사용하여 입력 값 제어
                        value={formData[key]}
                        // 변경 시 formData 업데이트
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-full border border-blue-300 p-1 rounded focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                      />
                    ) : (
                      // 보기 모드일 때 텍스트 표시
                      <span>{formData[key]}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* 메타데이터 섹션 버튼 영역: 수정/취소/적용 */}
            <div className="flex justify-end mt-4 space-x-2">
              {isEditing ? (
                <>
                  <button onClick={handleCancelClick} className="px-4 py-2">
                    취소
                  </button>
                  <button
                    onClick={handleApplyEditClick}
                    className="px-4 py-2 rounded"
                  >
                    적용 (수정 완료)
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2"
                  // TODO: 상태가 '대기'일 때만 수정 가능하도록 제어 로직 추가 필요
                >
                  수정
                </button>
              )}
            </div>
          </section>

          {/* 사용자 수정 요청 사유 (API content 필드 매핑) */}
          <section className="p-6 rounded-lg border border-basic-300 shadow-sm">
            <h2 className="pretendard-semibold-20 mb-3 text-basic-600 border-b border-basic-300 pb-2">
              사용자 수정 요청 사유
            </h2>
            <p className="pretendard-medium-14 text-basic-600 whitespace-pre-line">
              {displayData.requestReason}
            </p>
          </section>

          {/* 관리자 코멘트 및 처리 액션 */}
          <section className="p-6 rounded-lg border border-basic-300 shadow-sm">
            <h2 className="pretendard-semibold-20 mb-3 text-basic-600 border-b border-basic-300 pb-2">
              관리자 코멘트 (선택)
            </h2>
            <textarea
              rows="4"
              className="w-full p-3 border border-basic-300 rounded-lg  text-basic-500 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              placeholder="내부 메모나 사용자에게 전달할 메시지를 입력하세요."
              value={adminComment}
              onChange={(e) => setAdminComment(e.target.value)}
            />

            <h2 className="pretendard-semibold-20 mt-6 mb-3 text-basic-700 border-b border-basic-300 pb-2">
              처리
            </h2>
            <div className="mt-4 p-2 flex justify-end gap-3">
              {/* 승인 버튼 */}
              <button
                type="button"
                onClick={() => handleAction("Approve")}
                className="w-full px-10 py-2 pretendard-medium-16 text-basic-100 rounded-lg bg-point-green-200 hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                승인
              </button>
              {/* 거부 버튼 */}
              <button
                type="button"
                onClick={() => handleAction("Reject")}
                className="w-full px-10 py-2 pretendard-medium-16 text-basic-100  rounded-lg bg-point-red-200 hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                거부
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default ContractRevisionDetail;
