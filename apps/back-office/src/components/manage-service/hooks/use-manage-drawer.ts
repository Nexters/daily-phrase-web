import { create } from "zustand";

export const useManageDrawer = create<{
  open: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: API 연동 후 타입 정의
  data?: any;
  setOpen: (open: boolean) => void;
  openNewDrawer: () => void;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  openEditDrawer: (data: any) => void;
}>((set) => ({
  open: false,
  data: undefined,
  setOpen: (open) => set({ open }),
  openNewDrawer: () => {
    set({ open: true, data: undefined });
  },
  openEditDrawer: (data) => {
    set({ open: true, data });
  },
}));
