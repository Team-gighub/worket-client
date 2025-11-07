"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * [InputAccountField] - 하나의 디자인 폼 안에 Input과 Select를 나란히 배치하는 컴포넌트
 * (예: 계좌번호 입력 + 은행 선택)
 * * @param {string} question - 입력 필드의 제목 (필수)
 * @param {string} inputValue - Input 필드의 현재 값
 * @param {function} onInputChange - Input 필드 값 변경 핸들러
 * @param {string} selectValue - Select 필드의 현재 값
 * @param {function} onSelectChange - Select 필드 값 변경 핸들러
 * @param {string} placeholder - Input 필드의 placeholder
 * @param {boolean} [error=false] - 에러 상태 여부
 * @param {Array<{value: string, label: string}>} selectOptions - Select에 표시할 옵션 배열
 */

const InputTwoField = ({
  question,
  inputValue,
  onInputChange,
  selectValue,
  onSelectChange,
  placeholder,
  error = false,
  selectOptions = [],
}) => {
  return (
    <div className="flex justify-center my-4">
      <div
        className={`w-[342px] h-[67px] rounded-[10px] border ${
          error ? "border-point-red-300" : "border-basic-300"
        } px-8 py-3 flex flex-col justify-between`}
      >
        <div className="flex items-center pretendard-bold-12">
          <span className="text-basic-500">{question}</span>
          {error && (
            <span className="text-point-red-300 ml-4">잘못된 응답입니다</span>
          )}
        </div>

        <div className="flex w-full items-center justify-between">
          <input
            type="text"
            value={inputValue}
            onChange={onInputChange}
            placeholder={placeholder}
            className="flex-1 min-w-0 pretendard-medium-18 outline-none bg-transparent"
          />

          {/* 2. shadcn/ui Select 컴포넌트 적용 */}
          <div className="w-[7rem] shrink-0">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="은행선택" />
              </SelectTrigger>
              <SelectContent>
                {selectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputTwoField;
