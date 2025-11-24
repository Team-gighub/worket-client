import PdfFullScreenViewer from "@/components/common/pdfFullScreenViewer";
import { useState, useCallback } from "react";

export const usePdfViewer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const open = useCallback((url) => {
    if (!url) return console.error("PDF URL 없음");
    setPdfUrl(url);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setPdfUrl("");
  }, []);

  // Viewer 컴포넌트를 hook에서 직접 제공
  const Viewer = useCallback(() => {
    if (!isOpen) return null;

    return (
      <>
        <style jsx global>{`
          body {
            overflow: hidden;
          }
        `}</style>

        <PdfFullScreenViewer pdfUrl={pdfUrl} onClose={close} />
      </>
    );
  }, [isOpen, pdfUrl, close]);

  return { open, close, Viewer };
};
