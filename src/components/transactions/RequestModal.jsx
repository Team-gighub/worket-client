"use client";
import React, { useState } from "react";

const RequestModal = ({ onClose, onSubmit, isSubmitting }) => {
  const [requestText, setRequestText] = useState("");

  const handleTextChange = (e) => {
    setRequestText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (requestText.trim() === "") {
      alert("요청 사항을 입력해주세요.");
      return;
    }
    onSubmit({ requestText: requestText.trim() });
  };

  return (
    // 1. 모달 배경 영역
    <div
      className="absolute inset-0 flex justify-center items-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose} // 외부 클릭 시 닫기 기능
    >
      {/* 2. 모달 컨텐츠 영역  */}
      <div
        className="bg-basic-200 p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="pretendard-medium-18 mb-3 border-b pb-3">
          수정 요청 사항 입력
        </h2>
        <p className="pretendard-light-14 mb-6">
          관리자에게 전달할 요청 내용을 입력해 주세요.
        </p>

        <form onSubmit={handleFormSubmit}>
          <textarea
            value={requestText}
            onChange={handleTextChange}
            placeholder="수정해야 할 내용을 상세하게 입력하세요."
            rows={8}
            className="bg-gray-50 w-full p-4 border border-gray-200 rounded-lg mt-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition duration-150 pretendard-light-14"
          />

          <div className="flex justify-end space-x-4 mt-4">
            {/* 취소 버튼 */}
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-3 pretendard-medium-12 rounded-lg hover:bg-basic-300 transition duration-150 disabled:opacity-50"
            >
              취소
            </button>

            {/* 요청 제출 버튼 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3  pretendard-medium-12 bg-blue-600 text-white rounded-lg hover:bg-basic-300 transition duration-150 shadow-md disabled:opacity-50 disabled:shadow-none"
            >
              {isSubmitting ? "요청 중..." : "요청 제출"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;
