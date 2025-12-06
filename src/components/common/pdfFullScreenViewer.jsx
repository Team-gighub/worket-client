"use client";

import { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import Header from "../common/Header";
import { getDownloadPresignedUrl } from "@/lib/presignedServices";

const PdfFullScreenViewer = ({ pdfUrl, onClose }) => {
  const [presignedUrl, setPresignedUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pdfUrl) return;

    const fetchPresignedUrl = async () => {
      try {
        setLoading(true);
        const url = await getDownloadPresignedUrl(pdfUrl);
        setPresignedUrl(url);
      } catch (err) {
        console.error(err);
        setError("PDF를 로드하지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPresignedUrl();
  }, [pdfUrl]);

  if (!pdfUrl) return null;

  return (
    <div className="absolute inset-0 z-50 transition-opacity bg-basic-100">
      <PageLayout header={<Header title="계약서 확인" onClose={onClose} />}>
        {loading && <p className="p-4 text-center text-white">로딩 중...</p>}
        {error && <p className="p-4 text-center text-white">{error}</p>}
        {presignedUrl && (
          <iframe
            src={presignedUrl + "#toolbar=0&navpanes=0"}
            title="Contract Viewer"
            className="flex-grow w-full h-full border-0"
            allowFullScreen
            aria-live="polite"
          >
            <p className="p-4 text-center text-white">
              문서 로드에 실패했습니다.
            </p>
          </iframe>
        )}
      </PageLayout>
    </div>
  );
};

export default PdfFullScreenViewer;
