import { create } from "zustand";

export const useSignatureStore = create((set) => ({
  // State
  signUrl: null,
  isUploading: false,
  error: null,
  tempPreviewUrl: null,
  tempSignatureData: null, // Base64 문자열이 저장될 상태

  // Simple actions (상태 변경만)
  setSignUrl: (url) => set({ signUrl: url, error: null }),
  setIsUploading: (loading) => set({ isUploading: loading }),
  setError: (error) => set({ error }),
  clearSignature: () => set({ signUrl: null, error: null }),
  setTempPreviewUrl: (url) => set({ tempPreviewUrl: url, error: null }),
  clearTempPreviewUrl: () => set({ tempPreviewUrl: null, error: null }),
  setTempSignatureData: (data) => set({ tempSignatureData: data }),
}));
