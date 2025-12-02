"use client";
import { useCallback, useState } from "react";
import MainButton from "../common/MainButton";
import RequestModal from "./RequestModal";
import { postContractModify } from "@/lib/api/client/transactionServices";

const PostModifyButton = ({ postId }) => {
  // 1. 모달의 열림/닫힘 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 2. 중복 제출 방지를 위한 관리
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 2. 모달 열기 핸들러
  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // 3. 모달 닫기 핸들러
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // 4. 요청 제출 핸들러
  const handleSubmitRequest = useCallback(
    async (requestData) => {
      if (isSubmitting) return; // 중복 제출 방지

      const payload = {
        content: requestData.requestText,
      };

      setIsSubmitting(true);

      try {
        console.log("계약 수정 요청 페이로드:", payload);

        // 5. API 호출
        await postContractModify(payload, postId);

        alert("✅ 수정 요청이 관리자에게 성공적으로 접수되었습니다.");
      } catch (error) {
        console.error("수정 요청 실패:", error);

        const errorMessage =
          error.response?.data?.message ||
          "수정 요청 중 오류가 발생했습니다. 다시 시도해 주세요.";
        alert(`❌ 요청 실패: ${errorMessage}`);
      } finally {
        setIsSubmitting(false);
        setIsModalOpen(false); // 성공/실패 여부와 관계없이 모달 닫기
      }
    },
    [postId, isSubmitting],
  );
  return (
    <>
      <MainButton
        text={"관리자에게 수정 요청"}
        height={"4rem"}
        theme={"darkgray"}
        onClick={handleOpenModal}
      />
      {/* 5. 모달 컴포넌트 렌더링 */}
      {isModalOpen && (
        <RequestModal
          onClose={handleCloseModal}
          onSubmit={handleSubmitRequest}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
};

export default PostModifyButton;
