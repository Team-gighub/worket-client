"use client";

import { ClipLoader } from "react-spinners";

const LoadingSpinner = (isLoading, color = "primary", size = 150) => {
  if (!isLoading) return null;

  return (
    <div className="inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-basic-600 bg-opacity-60">
        <ClipLoader loading={isLoading} size={size} color={color} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
