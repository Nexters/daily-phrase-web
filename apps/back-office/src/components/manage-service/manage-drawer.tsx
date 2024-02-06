"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { apis } from "~/apis";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerMain,
} from "~/components/ui/drawer";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";
import { ClearTextArea } from "~/components/ui/textarea";
import InputImage from "../ui/input-image";
import { useManageDrawer } from "./hooks/use-manage-drawer";
import { ManageValues, manageFormProps } from "./manage-drawer.meta";

export function ManageDrawerRoot(props: React.ComponentProps<typeof Drawer>) {
  const { open, setOpen } = useManageDrawer();

  return <Drawer {...props} modal={false} open={open} onOpenChange={setOpen} />;
}

export function ManageDrawerContent() {
  const form = useForm<ManageValues>(manageFormProps);

  const isDrawerOpen = useManageDrawer((v) => v.open);
  const isEdit = useManageDrawer((v) => !!v.data);
  const defaultValues = useManageDrawer((v) => v.data);
  const closeDrawer = useManageDrawer((v) => () => v.setOpen(false));

  useEffect(() => {
    if (isDrawerOpen) {
      form.reset(defaultValues ?? manageFormProps.defaultValues);
    }
  }, [form, isDrawerOpen, defaultValues]);

  const mutation = useMutation({
    mutationFn: (values: ManageValues) => {
      if (isEdit) {
        return apis.phraseApi.updatePhrase(defaultValues.phraseId);
      }
      return apis.phraseApi.createPhrase();
    },
  });

  async function onSubmit(values: ManageValues) {
    if (mutation.isPending) {
      return;
    }

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
    }
  }

  return (
    <Form {...form}>
      <DrawerContent asChild>
        <form
          className="min-w-[480px] w-1/3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <DrawerHeader />
          <DrawerMain>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ClearTextArea
                      className="min-h-9 text-2xl font-bold"
                      placeholder="제목 없음"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <InputImage />
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormControl>
                    <ClearTextArea
                      placeholder="텍스트를 작성해 주세요"
                      className="h-full text-base"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </DrawerMain>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                disabled={mutation.isPending}
              >
                취소
              </Button>
            </DrawerClose>
            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={mutation.isPending}
            >
              저장
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Form>
  );
}
