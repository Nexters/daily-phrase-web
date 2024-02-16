import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { create } from "zustand";
import { apis } from "~/apis";
import { PhraseItemWithId } from "~/types/phrase";
import { ManageValues, manageFormProps } from "../manage-drawer.meta";

export const useManageDrawer = create<{
  isBlocking: boolean;
  open: boolean;
  data?: PhraseItemWithId;
  setOpen: (open: boolean) => void;
  setBlocking: (isBlocking: boolean) => void;
  openNewDrawer: () => void;
  openEditDrawer: (data: PhraseItemWithId) => void;
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
      if (defaultValues) {
        const drawerValue = {
          title: defaultValues.title,
          content: defaultValues.content,
          imageList: defaultValues.url
            ? [
                {
                  src: defaultValues.url,
                  radio: "1:1",
                  filename: defaultValues.filename,
                },
              ]
            : [],
        } satisfies ManageValues;
        form.reset(drawerValue);
      } else {
        form.reset(manageFormProps.defaultValues);
      }
    }
  }, [form, isDrawerOpen, defaultValues]);

  return { form };
};

export const useManageDrawerMutation = () => {
  const defaultValues = useManageDrawer((v) => v.data);
  const isBlocking = useManageDrawer((v) => v.isBlocking);
  const setBlocking = useManageDrawer((v) => v.setBlocking);
  const closeDrawer = useManageDrawer((v) => v.closeDrawer);

  async function onSubmit(values: ManageValues) {
    if (isBlocking) {
      return;
    }

    setBlocking(true);

    try {
      const blobImageList = values.imageList.filter((image) =>
        image.src.startsWith("data:"),
      );

      if (blobImageList.length > 0) {
        toast.loading("이미지 업로드 중...");
        await Promise.all(
          blobImageList.map(async (blogImage, i) => {
            const res = await apis.phraseApi.uploadImage({
              src: blogImage.src,
              filename: blogImage.filename,
            });
            blobImageList[i].src = res.result.imageUrl;
            // TODO: 로컬 이미지 blob 제거
            // URL.revokeObjectURL(blogImage.previewSrc);
          }),
        );
      }

      if (defaultValues) {
        toast.loading("글귀 수정 중...");
        await apis.phraseApi.updatePhrase(defaultValues.phraseId, {
          ...defaultValues,
          title: values.title,
          content: values.content,
        });
        toast.dismiss();
        toast.success("수정 되었습니다.");
      } else {
        toast.loading("글귀 등록 중...");
        await apis.phraseApi.createPhrase({
          title: values.title,
          content: values.content,
          imageUrl: values.imageList[0]?.src ?? "",
          imageRatio: values.imageList[0]?.radio ?? "",
          fileName: values.imageList[0]?.filename ?? "",
          fileSize: values.imageList[0]?.size ?? "",
        });
        toast.dismiss();
        toast.success("등록 되었습니다.");
      }

      setBlocking(false);
      closeDrawer();
    } catch (e) {
      setBlocking(false);
      const message = e instanceof Error ? e.message : "알 수 없는 오류";
      toast.dismiss();
      toast.error(message);
    }
  }

  return { onSubmit };
};
