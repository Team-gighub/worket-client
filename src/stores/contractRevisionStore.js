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
          // console.log("Fetched revisions:", data);
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
