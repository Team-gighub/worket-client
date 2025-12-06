"use client";

import React from "react";
import TradeStepIcon from "./TradeStepIcon";
import ViewContractButton from "./ViewContractButton";

/**
 * 거래 단계 표시 컴포넌트
 * @param {number} currentStep - 현재 단계 (0~5)
 * @param {string} pdfUrl - 계약서 pdf url */
const TradeStepIndicator = ({ currentStep = 0, pdfUrl }) => {
  const steps = [
    { id: 1, label: "STEP 1", title: "계약서 확인" },
    { id: 2, label: "STEP 2", title: "대금 예치" },
    { id: 3, label: "STEP 3", title: "지급 확정" },
  ];

  const isStepCompleted = (stepId) => currentStep > stepId;
  const isStepActive = (stepId) => currentStep === stepId;

  const getStepColor = (stepId) => {
    if (isStepCompleted(stepId)) return "text-basic-800";
    if (isStepActive(stepId)) return "text-basic-800";
    return "text-basic-400";
  };

  return (
    <div className="w-full py-8">
      <ul className="flex flex-col space-y-0">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <li className="flex items-center gap-6">
              {/* Step Icon */}
              {isStepCompleted(step.id) ? (
                <TradeStepIcon status="completed" />
              ) : isStepActive(step.id) ? (
                <TradeStepIcon status="active" />
              ) : (
                <TradeStepIcon status="inactive" />
              )}

              {/* Step Content */}
              <div className="flex items-center gap-6 flex-1">
                <div className="flex flex-col">
                  <span
                    className={`pretendard-medium-12 ${getStepColor(step.id)}`}
                  >
                    {step.label}
                  </span>
                  <span
                    className={`pretendard-medium-18 ${getStepColor(step.id)}`}
                  >
                    {step.title}
                  </span>
                </div>
                {/* 계약서 보기 버튼 */}
                {step.id === 1 && currentStep >= 2 && currentStep <= 4 && (
                  <ViewContractButton pdfUrl={pdfUrl} />
                )}
              </div>
            </li>

            {/* 연결선 */}
            {index < steps.length - 1 && (
              <div className="flex items-center pl-[26px] h-8">
                <div
                  className={`w-0.5 h-full ${
                    isStepCompleted(step.id + 1) || isStepActive(step.id + 1)
                      ? "bg-primary"
                      : "bg-basic-400"
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default TradeStepIndicator;
