"use client";

import "@/app/globals.css";
import InfoText from "@/components/common/InfoText";
import MainButton from "@/components/common/MainButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* 기존 계약서 업로드하기 */
const UploadPage = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
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
      const res = await fetch("http://localhost:8080/api/ocr", {
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
    return <p>loading</p>;
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
          className="w-[315px] h-[332px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:border-indigo-400 transition"
        >
          {file ? (
            <p className="text-gray-700">{file.name}</p>
          ) : (
            <p className="text-gray-500 text-base text-center">
              여기에 파일을 드래그하거나
              <br />
              클릭하여 업로드
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
