import { create } from "zustand";

export const useSignatureStore = create((set) => ({
  // State
  signUrl: null,
  isUploading: false,
  error: null,

  // Simple actions (상태 변경만)
  setSignUrl: (url) => set({ signUrl: url, error: null }),
  setIsUploading: (loading) => set({ isUploading: loading }),
  setError: (error) => set({ error }),
  clearSignature: () => set({ signUrl: null, error: null }),
}));
