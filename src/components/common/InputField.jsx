"use client";

import React from "react";

const InputField = ({
  question,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
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
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="pretendard-medium-18 outline-none bg-transparent w-full"
        />
      </div>
    </div>
  );
};

export default InputField;
