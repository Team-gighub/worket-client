"use client";

import { useState, useRef, useEffect } from "react";

const SelectBox = ({
  options = [],
  placeholder = "선택",
  onChange,
  defaultValue,
  font = "pretendard-medium-16",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    defaultValue ? options.find((opt) => opt.value === defaultValue) : null,
  );
  const [hoveredValue, setHoveredValue] = useState(null);
  const selectRef = useRef(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);

    if (onChange) {
      onChange(option.kftcCode);
    }
  };

  return (
    <div className="relative" ref={selectRef}>
      {/* 선택 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-basic-100 rounded-lg hover:border-basic-400 focus:outline-none"
      >
        <span className={`text-basic-600 ${font}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      {/* 드롭다운 옵션 */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1  bg-basic-100 border border-basic-200 rounded-xl shadow-lg max-h-60">
          {options.length === 0 ? (
            <div className={`px-4 py-2 text-basic-500 text-center ${font}`}>
              옵션이 없습니다
            </div>
          ) : (
            options.map((option) => {
              const isSelected = selectedOption?.value === option.value;
              const isHovered = hoveredValue === option.value;
              const shouldHighlight =
                isHovered || (isSelected && !hoveredValue);

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHoveredValue(option.value)}
                  onMouseLeave={() => setHoveredValue(null)}
                  className={`w-full text-left px-4 py-2 transition-colors ${font} ${
                    shouldHighlight ? "bg-basic-200" : "bg-basic-100"
                  } text-basic-600}`}
                >
                  {option.label}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default SelectBox;
