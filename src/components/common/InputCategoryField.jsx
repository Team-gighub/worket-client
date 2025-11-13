"use client";

import React from "react";
import GroupButton from "./GroupButton";

const InputField = ({ question, onChange, error }) => {
  return (
    <div className="flex justify-center my-4">
      <div
        className={`w-[34.2rem] h-[6.7rem] rounded-[1rem] border ${
          error ? "border-point-red-300" : "border-basic-300"
        } px-8 py-3 flex flex-col justify-between`}
      >
        <div className="flex items-center pretendard-bold-12">
          <span className="text-basic-500">{question}</span>
          {error && (
            <span className="text-point-red-300 ml-4">잘못된 응답입니다</span>
          )}
        </div>
        <GroupButton onChange={onChange} />
      </div>
    </div>
  );
};

export default InputField;
