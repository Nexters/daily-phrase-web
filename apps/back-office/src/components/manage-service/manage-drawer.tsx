"use client";

import { Plus } from "lucide-react";
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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { useManageDrawer } from "./hooks/use-manage-drawer";
import { ManageValues, manageFormProps } from "./manage-drawer.meta";

export function ManageDrawerRoot(props: React.ComponentProps<typeof Drawer>) {
  const { open, setOpen } = useManageDrawer();

  return <Drawer {...props} modal={false} open={open} onOpenChange={setOpen} />;
}

export function ManageDrawerContent() {
  const form = useForm<ManageValues>(manageFormProps);
  const { isEdit, isDrawerOpen, data, closeDrawer } = useManageDrawer((v) => ({
    isEdit: !!v.data,
    isDrawerOpen: v.open,
    data: v.data,
    closeDrawer: () => v.setOpen(false),
  }));

  useEffect(() => {
    if (isDrawerOpen) {
      form.reset(data ?? manageFormProps.defaultValues);
    }
  }, [form, isDrawerOpen, data]);

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
                    <Textarea
                      className="min-h-9 text-2xl font-bold"
                      placeholder="제목 없음"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator />
            <div className="flex w-full items-center gap-1.5">
              <Label
                htmlFor="phrase-img"
                className="text-base text-muted-foreground"
              >
                이미지를 추가해 주세요.
              </Label>
              <Input
                id="phrase-img"
                type="file"
                accept="image/*"
                multiple={true}
                className="hidden"
              />
              <Button variant="ghost" size="icon" className="ml-auto -my-2">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </Button>
            </div>
            <Separator />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="텍스트를 작성해 주세요"
                      className="h-full"
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