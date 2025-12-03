import { create } from "zustand";
import { persist } from "zustand/middleware";
import adminContractService from "@/lib/api/client/adminContractService";

export const useContractRevisionStore = create(
  persist(
    (set, get) => ({
      revisions: [],
      currentRevision: null,
      loading: false,
      error: null,

      fetchRevisions: async () => {
        set({ loading: true, error: null });
        try {
          let response = await adminContractService.getContractList();
          // let response = mockRevisions;
          const data = response?.data ?? response ?? [];
          set({ revisions: data, loading: false });
          console.log("Fetched revisions:", data);
          return data;
        } catch (error) {
          set({ error: error?.message ?? String(error), loading: false });
          throw error;
        }
      },

      fetchRevisionById: async (modificationId) => {
        set({ loading: true, error: null });
        try {
          if (adminContractService?.getContractDetail) {
            const res =
              await adminContractService.getContractDetail(modificationId);
            const data = res?.data ?? res;
            set({ currentRevision: data, loading: false });
            return data;
          }
          // fallback: try to find in local revisions
          const found = get().getRevisionById(modificationId);
          set({ currentRevision: found, loading: false });
          return found;
        } catch (error) {
          set({ error: error?.message ?? String(error), loading: false });
          throw error;
        }
      },

      getRevisionById: (modificationId) => {
        if (modificationId == null) return null;
        const idStr = String(modificationId);
        const revisions = get().revisions ?? [];
        return (
          revisions.find(
            (r) =>
              String(r.modificationId ?? r.id ?? r.transactionId) === idStr,
          ) ?? null
        );
      },

      getTransactionIdAndStatusById: (modificationId) => {
        const revision = get().getRevisionById(modificationId);

        if (revision) {
          return {
            transactionId: revision.transactionId,
            status: revision.status,
          };
        }

        return { transactionId: undefined, status: undefined };
      },

      setCurrentRevision: (payload) => set({ currentRevision: payload }),

      clear: () =>
        set({
          revisions: [],
          currentRevision: null,
          loading: false,
          error: null,
        }),
    }),
    {
      name: "contract-revision-store", // localStorage key
      // 기본 storage 사용 (브라우저 환경)
      // serialize / deserialize 기본 설정으로 충분합니다.
      // getStorage: () => localStorage, // optional explicit
      partialize: (state) => ({
        revisions: state.revisions,
        currentRevision: state.currentRevision,
      }),
    },
  ),
);

// TODO: api 연동 후 지우기
const mockRevisions = {
  status: "success",
  data: [
    {
      modificationId: 101,
      transactionId: 55,
      userName: "이동현",
      status: "PENDING",
      createdAt: "2025-12-03T09:40:00.000000",
    },
    {
      modificationId: 102,
      transactionId: 62,
      userName: "박서연",
      status: "APPROVED",
      createdAt: "2025-12-02T15:20:10.000000",
    },
    {
      modificationId: 103,
      transactionId: 71,
      userName: "정민준",
      status: "REJECTED",
      createdAt: "2025-12-01T08:05:45.000000",
    },
    {
      modificationId: 104,
      transactionId: 80,
      userName: "최지우",
      status: "PENDING",
      createdAt: "2025-11-30T19:35:22.000000",
    },
    {
      modificationId: 105,
      transactionId: 93,
      userName: "김태형",
      status: "APPROVED",
      createdAt: "2025-11-28T10:11:11.000000",
    },
  ],
};
