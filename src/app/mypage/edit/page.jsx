"use client";

import "@/app/globals.css";
import EditableInfoCard from "@/components/common/EditableInfoCard";
import MainButton from "@/components/common/MainButton";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUsers, postUsers } from "@/lib/api/client/userServices";
import { formatDateYMD } from "@/app/utils/dateFormatter";
import { normalizeGender } from "@/app/utils/inputFormatter";

/* 회원 정보 수정 화면 */
const Edit = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: 성별/업종 옵션 설정 필요
  const genderOptions = [
    { value: "MALE", label: "남성" },
    { value: "FEMALE", label: "여성" },
  ];

  const businessSectorOptions = [
    { value: "IT", label: "IT" },
    { value: "디자인", label: "디자인" },
    { value: "청소", label: "청소" },
    { value: "마케팅", label: "마케팅" },
  ];

  const [myInfo, setMyInfo] = useState([
    { label: "성함", value: "", editable: false },
    { label: "전화번호", value: "", editable: false },
    { label: "생년월일", value: "", type: "date" },
    {
      label: "성별",
      value: "",
      type: "select",
      options: genderOptions,
      placeholder: "성별",
    },
  ]);

  const [freelancerInfo, setFreelancerInfo] = useState([
    {
      label: "업종",
      value: "",
      type: "select",
      options: businessSectorOptions,
      placeholder: "업종 선택",
    },
    { label: "업력", value: "", type: "number", placeholder: "년수" },
    {
      label: "사업자등록번호",
      value: "",
      type: "number",
      placeholder: "숫자만 입력",
    },
  ]);

  useEffect(() => {
    const controller = new AbortController(); // useEffect cleanup용

    const fetchProfile = async () => {
      try {
        const res = await getUsers();
        const profile = res.data;

        if (!profile) {
          router.push("/login");
          return;
        }

        setUser(profile);

        setMyInfo((prev) =>
          prev.map((item) => {
            if (item.label === "성함")
              return { ...item, value: profile.name ?? "-" };
            if (item.label === "전화번호")
              return { ...item, value: profile.phone ?? "-" };
            if (item.label === "생년월일") {
              return { ...item, value: profile.birthDate ?? "-" };
            }
            if (item.label === "성별")
              return { ...item, value: profile.gender ?? "-" };
            return item;
          }),
        );

        setFreelancerInfo((prev) =>
          prev.map((item) => {
            if (item.label === "업종")
              return { ...item, value: profile.businessSector ?? "-" };
            if (item.label === "업력")
              return { ...item, value: profile.businessSectorYears ?? "-" };
            if (item.label === "사업자등록번호")
              return {
                ...item,
                value: profile.businessRegistrationNumber ?? "-",
              };
            return item;
          }),
        );
      } catch (err) {
        // TODO: 에러 핸들링
        if (err.response.status === 401) {
          router.push("/login");
        } else if (err.name !== "AbortError") {
          console.error("프로필 조회 실패:", err);
          router.push("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
    return () => controller.abort();
  }, [router]);

  // payload를 서버의 Request 타입에 맞춰 포맷해서 전송
  const handleSave = async () => {
    try {
      const birthRaw = myInfo.find((i) => i.label === "생년월일").value;
      const genderRaw = myInfo.find((i) => i.label === "성별").value;
      const sectorRaw = freelancerInfo.find((i) => i.label === "업종").value;
      const yearsRaw = freelancerInfo.find((i) => i.label === "업력").value;
      const regNumRaw = freelancerInfo.find(
        (i) => i.label === "사업자등록번호",
      )?.value;

      const birthDate = formatDateYMD(birthRaw);
      const gender = normalizeGender(genderRaw);
      const businessSector = sectorRaw ? String(sectorRaw).trim() : undefined;
      const businessSectorYears = Number.parseInt(yearsRaw);
      const businessRegistrationNumber = regNumRaw
        ? String(regNumRaw).trim()
        : undefined;

      const payload = {
        ...(birthDate !== undefined && { birthDate }),
        ...(gender !== undefined && { gender }),
        ...(businessSector !== undefined && { businessSector }),
        ...(businessSectorYears !== undefined && { businessSectorYears }),
        ...(businessRegistrationNumber !== undefined && {
          businessRegistrationNumber,
        }),
      };

      const res = await postUsers(payload);

      // TODO: res status 코드에 따른 처리
      if (res.status === 401) {
        router.push("/login");
        return;
      }

      if (!(res.status >= 200 && res.status < 300)) {
        console.error("프로필 저장 실패:", res);
        return;
      }

      // 저장 성공 시 최신 프로필 다시 조회하여 화면 갱신
      const refreshRes = await getUsers();
      const updated = refreshRes.data ?? null;
      if (updated) {
        setUser(updated);
        setMyInfo((prev) =>
          prev.map((item) => {
            if (item.label === "성함")
              return { ...item, value: updated.name ?? "-" };
            if (item.label === "전화번호")
              return { ...item, value: updated.phone ?? "-" };
            if (item.label === "생년월일")
              return { ...item, value: updated.birthDate ?? "-" };
            if (item.label === "성별")
              return { ...item, value: updated.gender ?? "-" };
            return item;
          }),
        );
        setFreelancerInfo((prev) =>
          prev.map((item) => {
            if (item.label === "업종")
              return { ...item, value: updated.businessSector ?? "-" };
            if (item.label === "업력")
              return { ...item, value: updated.businessSectorYears ?? "-" };
            if (item.label === "사업자등록번호")
              return {
                ...item,
                value: updated.businessRegistrationNumber ?? "-",
              };
            return item;
          }),
        );
      }

      setIsEditing(false);
    } catch (err) {
      if (err.response.status === 401) {
        router.push("/login");
      } else {
        console.error("프로필 저장 실패:", err);
      }
    }
  };

  if (isLoading) {
    return <div className="py-[5rem]">로딩 중...</div>;
  }

  return (
    <div className="h-full py-[5rem]">
      {/* TODO: 프로필 사진 */}
      <div className="flex justify-center">
        <p className="w-[10rem] h-[10rem] rounded-full bg-gradient-to-b from-point-gradient-dest to-point-gradient-dist"></p>
      </div>

      <div className="max-w-[33.5rem] w-full mx-auto my-[2rem] flex flex-col items-center gap-2.5">
        <p className="pretendard-semibold-20 flex flex-col">
          {user.name ?? "사용자명"}
        </p>
        <p className="pretendard-medium-16 text-basic-500">
          {user?.businessSectorYears
            ? `${user.businessSectorYears}년차 프리랜서`
            : "0년차 프리랜서"}
        </p>
      </div>

      <EditableInfoCard
        title="내정보"
        items={myInfo}
        isEditing={isEditing}
        setItems={setMyInfo}
      />
      <EditableInfoCard
        title="내 업력"
        items={freelancerInfo}
        isEditing={isEditing}
        setItems={setFreelancerInfo}
      />

      <div className="p-[1rem]">
        {isEditing ? (
          <div className="flex gap-[1rem] justify-center">
            <MainButton
              text="저장"
              onClick={handleSave}
              theme="secondary"
              width="16.5rem"
            />
            <MainButton
              text="취소"
              onClick={() => setIsEditing(false)}
              theme="gray"
              width="16.5rem"
            />
          </div>
        ) : (
          <MainButton
            text="수정"
            onClick={() => setIsEditing(true)}
            theme="secondary"
            width="33.5rem"
          />
        )}
      </div>
    </div>
  );
};

export default Edit;
