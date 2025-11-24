import PageLayout from "../layouts/PageLayout";
import Header from "../common/Header";

const PdfFullScreenViewer = ({ pdfUrl, onClose }) => {
  if (!pdfUrl) return null;

  return (
    <div className="absolute inset-0 z-50 transition-opacity bg-basic-100">
      <PageLayout header={<Header title="계약서 확인" onClose={onClose} />}>
        <iframe
          src={pdfUrl + `#toolbar=0&navpanes=0`}
          title="Contract Viewer"
          className="flex-grow w-full h-full border-0"
          allowFullScreen
          aria-live="polite"
        >
          <p className="p-4 text-center text-white">
            문서 로드에 실패했습니다.
          </p>
        </iframe>
      </PageLayout>
    </div>
  );
};

export default PdfFullScreenViewer;
