"use client";

import { usePdfViewer } from "@/hooks/usePdfViewer";

const ViewContractButton = ({ pdfUrl }) => {
  const { open, Viewer } = usePdfViewer();
  return (
    <>
      <button
        onClick={() => open(pdfUrl)}
        className="mr-auto px-[0.5rem] py-[0.3rem] bg-point-red-200 text-white rounded-[5px] pretendard-medium-12"
      >
        계약서 보기
      </button>
      <Viewer />
    </>
  );
};

export default ViewContractButton;
