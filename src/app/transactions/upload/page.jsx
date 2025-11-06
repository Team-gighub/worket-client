"use client";
import "@/app/globals.css";
import MainButton from "@/components/common/MainButton";
import { useState } from "react";

/* 기존 계약서 업로드하기 */
const UploadPage = () => {
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // const res = await fetch("/api/ocr", {
      //   method: "POST",
      //   body: formData,
      // });

      const data = await res.json();

      // 🔹 OCR 결과를 세션 스토리지에 저장
      sessionStorage.setItem("ocrResult", JSON.stringify(data));
    } catch (err) {
      alert("업로드 중 오류가 발생했습니다");
    }
  };
  return (
    <main className="flex flex-col min-h-screen bg-white px-6 py-10">
      <section className="mb-10">
        <h1 className="pretendard-semibold-20">
          이미 체결된 계약서를
          <br /> 업로드해주세요
        </h1>
        <p className="pretendard-medium-16">
          워켓이 자동으로 정보를 읽어서 등록해드려요!
        </p>
      </section>
      <section className="flex flex-col items-center w-full">
        <label
          htmlFor="file"
          className="w-[315px] h-[332px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-lg cursor-pointer hover:border-indigo-400 transition"
        >
          {file ? (
            <p className="text-gray-700">{file.name}</p>
          ) : (
            <p className="text-gray-400 text-sm text-center">
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
        <MainButton onClick={handleUpload} text="계약서 불러오기"></MainButton>
      </section>
    </main>
  );
};

export default UploadPage;
