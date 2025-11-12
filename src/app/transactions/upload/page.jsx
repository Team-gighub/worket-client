"use client";

import "@/app/globals.css";
import InfoText from "@/components/common/InfoText";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import MainButton from "@/components/common/MainButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

/* 기존 계약서 업로드하기 */
const UploadPage = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    //1. 검증되지 않았을 경우
    if (!selected) return;
    // 2. 지원 형식 검증 (PDF, PNG, JPG)
    // 확장자를 소문자로 변환하여 확인
    const acceptedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];
    if (!acceptedTypes.includes(selected.type)) {
      alert(
        "지원되지 않는 파일 형식입니다. PDF, PNG, JPG 파일만 업로드 가능합니다.",
      );
      return;
    }

    // 3. 최대 크기 검증 (10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (selected.size > MAX_FILE_SIZE) {
      alert("파일 크기가 너무 큽니다. 최대 10MB까지 업로드 가능합니다.");
      return;
    }

    // 4. 모든 검증을 통과한 경우
    setFile(selected);
  };

  const handleUpload = async () => {
    //message 필드
    const ocrApiData = {
      images: [{ format: "png", name: file.name }],
      requestId: `worket_${Date.now()}`,
      version: "V2",
      timestamp: Date.now(),
    };
    // 유효성 검사
    if (!file) {
      alert("업로드할 파일을 선택해주세요.");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      //ocr 필요 field(file, message)
      formData.append("file", file);
      formData.append("message", JSON.stringify(ocrApiData));
      //백엔드 전송
      const res = await fetch("http://localhost:8080/contracts/extract", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `API 요청 실패: ${res.status}`);
      }
      const data = await res.json();

      // OCR 결과를 세션 스토리지에 저장
      sessionStorage.setItem("ocrResult", JSON.stringify(data));

      router.push("/transactions/upload/result");
    } catch (err) {
      alert("업로드 중 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }
  return (
    <div>
      <InfoText
        mainTexts={["이미 체결된 계약서를", "업로드해주세요"]}
        subText={"워켓이 자동으로 정보를 읽어서 등록해드려요!"}
        subTextColor="gray"
      ></InfoText>

      <section className="flex flex-col items-center w-full mb-6 mt-8">
        <label
          htmlFor="file"
          className="w-[31rem] h-[32rem] border-2 border-dashed border-basic-300 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:border-basic-500 transition"
        >
          {file ? (
            <p className="text-basic-600">{file.name}</p>
          ) : (
            <p className="text-basic-600 text-base text-center">
              해당 부분을 눌러
              <br />
              파일을 업로드하세요
            </p>
          )}
          <input
            id="file"
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        <section className="mt-10 flex flex-col items-center">
          <MainButton
            onClick={handleUpload}
            text="계약서 추출하기"
          ></MainButton>
          <p className="pretendard-medium-12 text-center text-basic-400">
            지원형식 PDF,PNG,JPG
            <br />
            파일 크기 최대 10MB
          </p>
        </section>
      </section>
    </div>
  );
};

export default UploadPage;
