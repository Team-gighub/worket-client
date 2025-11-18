import React from "react";

/**
 * EditableInfoCard
 *
 * 공통 정보 카드 컴포넌트 (읽기/편집 모드 지원)
 *
 * Props
 * @param {string} title - 카드 제목 (필수)
 * @param {string} [description] - 제목 오른쪽에 표시할 보조 설명
 * @param {Array<Object>} [items=[]] - 카드에 표시할 항목 배열
 *   items 각각의 형태:
 *     {
 *       label: string,                      // 항목 레이블(왼쪽)
 *       value: string | number | null,      // 항목 값(오른쪽에 표시 또는 입력값)
 *       editable?: boolean,                 // 편집 가능 여부 (기본 true). false면 읽기 전용으로 표시
 *       type?: "text" | "date" | "number" | "select", // 입력 타입 (기본 "text")
 *       options?: Array<{ value: string|number, label?: string }>, // select 타입일 때 옵션 배열
 *       placeholder?: string,               // 입력 필드의 placeholder
 *     }
 *
 * @param {boolean} [isEditing=false] - 전체 카드의 편집 모드 여부.
 *   - isEditing === true 이면 항목 중 editable === true 인 항목은 입력 필드로 렌더링 됩니다.
 *   - isEditing === false 이면 모든 항목은 읽기 표시(값 또는 '-')로 렌더링 됩니다.
 *
 * @param {(items: Array<Object>) => void} [setItems] - items 상태 업데이트 콜백.
 *   - 입력값 변경 시 index와 변경된 값을 적용한 새로운 items 배열을 전달하여 호출합니다.
 *   - setItems이 제공되지 않으면 입력은 무시됩니다 (읽기 전용).
 *
 * - editable === false : 항상 읽기 표시(입력 필드 미표시)
 * - isEditing === false : 입력 타입에 상관없이 읽기 표시
 * - type === "date"  : <input type="date" />
 * - type === "number": <input type="number" /> (Tailwind 클래스 no-spinner 적용 가능)
 * - type === "select": <select> 옵션 렌더링 (options prop 사용)
 * - type === "text"  : 기본 텍스트 입력
 *
 */
const EditableInfoCard = ({
  title,
  description,
  items = [],
  isEditing = false,
  setItems,
}) => {
  const handleChange = (index, newValue) => {
    if (typeof setItems !== "function") return;
    const updated = items.map((it, i) =>
      i === index ? { ...it, value: newValue } : it,
    );
    setItems(updated);
  };

  const renderControl = (item, index) => {
    const {
      value,
      type = "text",
      editable = true,
      options = [],
      placeholder,
    } = item;

    // 읽기 전용 표시
    if (!editable) {
      return (
        <span
          className="font-medium text-basic-500 opacity-90"
          aria-disabled="true"
          title={value == null ? "" : String(value)}
        >
          {value ?? "-"}
        </span>
      );
    }

    // 편집 모드가 아니면 기본 텍스트 표시
    if (!isEditing) {
      return <span className="font-medium text-basic-700">{value ?? "-"}</span>;
    }

    // 편집 가능 + isEditing === true 이면 입력 컨트롤 렌더
    const commonClass =
      "w-[14rem] sm:w-[18rem] rounded-lg border border-basic-400 bg-basic-100 px-3 py-2 text-basic-800 focus:outline-none focus:ring-2 focus:ring-point-purple-300";

    switch (type) {
      case "date":
        return (
          <input
            type="date"
            value={value ?? ""}
            placeholder={placeholder}
            onChange={(e) => handleChange(index, e.target.value)}
            className={commonClass}
          />
        );
      case "select":
        return (
          <select
            value={value ?? ""}
            onChange={(e) => handleChange(index, e.target.value)}
            className={commonClass}
          >
            <option value="">{placeholder ?? "선택"}</option>
            {options.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label ?? String(opt.value)}
              </option>
            ))}
          </select>
        );
      case "number":
        return (
          <input
            type="number"
            value={value ?? ""}
            placeholder={placeholder}
            onChange={(e) => handleChange(index, e.target.value)}
            className={`${commonClass} no-spinner`}
          />
        );
      default:
        return (
          <input
            type="text"
            value={value ?? ""}
            placeholder={placeholder}
            onChange={(e) => handleChange(index, e.target.value)}
            className={commonClass}
          />
        );
    }
  };

  return (
    <div className="max-w-[33.5rem] w-full mx-auto mt-4">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="pretendard-semibold-18 text-basic-900">{title}</h3>
        {description && (
          <p className="pretendard-medium-14 text-basic-400">{description}</p>
        )}
      </div>

      <div className="bg-basic-200 p-6 rounded-[1rem] pretendard-medium-14">
        <div className="flex flex-col">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3">
              <span className="text-basic-600">{item.label}</span>
              {renderControl(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditableInfoCard;
