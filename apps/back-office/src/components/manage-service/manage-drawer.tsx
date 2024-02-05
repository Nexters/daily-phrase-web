"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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

  async function onSubmit(values: ManageValues) {
    console.log(values);

    if (isEdit) {
      toast.success("수정되었습니다.");
    } else {
      toast.success("추가되었습니다.");
    }

    closeDrawer();
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
              <Button variant="secondary" size="lg">
                취소
              </Button>
            </DrawerClose>
            <Button variant="default" size="lg">
              저장
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Form>
  );
}
