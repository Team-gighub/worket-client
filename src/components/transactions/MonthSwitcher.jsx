"use client";

import Image from "next/image";

const MonthSwitcher = ({ currentYear, currentMonth, onChange }) => {
  const handlePrev = () => {
    const newMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const newYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    onChange?.({ year: newYear, month: newMonth });
  };

  const handleNext = () => {
    const newMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const newYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    onChange?.({ year: newYear, month: newMonth });
  };

  return (
    <div className="flex gap-[2rem]">
      <button onClick={handlePrev} className="px-2 py-1 relative w-[0.5rem]">
        <Image
          src="/icons/icLeftArrow.png"
          alt="Prev"
          fill
          style={{ objectFit: "contain" }}
        />
      </button>
      <span className="pretendard-semibold-18 text-center w-[4rem]">
        {currentMonth}월
      </span>
      <button onClick={handleNext} className="px-2 py-1 relative w-[0.5rem]">
        <Image
          src="/icons/icLeftArrow.png"
          alt="Next"
          fill
          style={{ objectFit: "contain", transform: "rotate(180deg)" }}
        />
      </button>
    </div>
  );
};

export default MonthSwitcher;
