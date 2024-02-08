import { Phrase } from "@daily-phrase/api";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { create } from "zustand";
import { ManageValues, manageFormProps } from "../manage-drawer.meta";

export const useManageDrawer = create<{
  isBlocking: boolean;
  open: boolean;
  data?: Phrase;
  setOpen: (open: boolean) => void;
  setBlocking: (isBlocking: boolean) => void;
  openNewDrawer: () => void;
  openEditDrawer: (data: Phrase) => void;
  closeDrawer: () => void;
}>((set, get) => ({
  isBlocking: false,
  open: false,
  data: undefined,
  setOpen: (open) => {
    set({ open });
  },
  setBlocking: (isBlocking) => {
    set({ isBlocking });
  },
  openNewDrawer: () => {
    if (get().isBlocking) return;
    set({ open: true, data: undefined });
  },
  openEditDrawer: (data) => {
    if (get().isBlocking) return;
    set({ open: true, data });
  },
  closeDrawer: () => {
    if (get().isBlocking) return;
    set({ open: false });
  },
}));

export const useManageDrawerForm = () => {
  const form = useForm<ManageValues>(manageFormProps);

  const isDrawerOpen = useManageDrawer((v) => v.open);
  const defaultValues = useManageDrawer((v) => v.data);

  useEffect(() => {
    if (isDrawerOpen) {
      form.reset(defaultValues ?? manageFormProps.defaultValues);
    }
  }, [form, isDrawerOpen, defaultValues]);

  return { form };
};

export const useManageDrawerMutation = () => {
  const isEdit = useManageDrawer((v) => !!v.data);
  const closeDrawer = useManageDrawer((v) => v.closeDrawer);
  const setBlocking = useManageDrawer((v) => v.setBlocking);

  const mutation = useMutation({
    mutationFn: (values: ManageValues) => {
      if (isEdit) {
        return new Promise((resolve) => setTimeout(resolve, 1000));
        // return apis.phraseApi.updatePhrase(defaultValues.phraseId);
      }
      return new Promise((resolve) => setTimeout(resolve, 2000));
      // return apis.phraseApi.createPhrase();
    },
  });

  async function onSubmit(values: ManageValues) {
    if (mutation.isPending) {
      return;
    }

    setBlocking(true);
    toast.loading("요청중...");

    try {
      if (isEdit) {
        await mutation.mutateAsync(values);
        toast.success("수정되었습니다.");
      } else {
        await mutation.mutateAsync(values);
        toast.success("추가되었습니다.");
      }
      closeDrawer();
    } catch (e) {
      const message = e instanceof Error ? e.message : "알 수 없는 오류";
      toast.error(message);
    } finally {
      setBlocking(false);
    }
  }

  return { mutation, onSubmit };
};
