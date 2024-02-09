"use client";

import { ChevronsRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerMain,
} from "~/components/ui/drawer";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";
import { ClearTextArea } from "~/components/ui/textarea";
import InputImage from "../ui/input-image";
import {
  useManageDrawer,
  useManageDrawerForm,
  useManageDrawerMutation,
} from "./hooks/use-manage-drawer";

export function ManageDrawerRoot(props: React.ComponentProps<typeof Drawer>) {
  const { open, setOpen } = useManageDrawer();

  return <Drawer {...props} modal={false} open={open} onOpenChange={setOpen} />;
}

export function ManageDrawerContent() {
  const isBlocking = useManageDrawer((v) => v.isBlocking);
  const closeDrawer = useManageDrawer((v) => v.closeDrawer);

  const { form } = useManageDrawerForm();
  const { onSubmit } = useManageDrawerMutation();

  return (
    <Form {...form}>
      <DrawerContent asChild>
        <form
          className="min-w-[480px] w-1/3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <DrawerHeader>
            <Button
              disabled={isBlocking}
              variant="ghost"
              size="icon"
              onClick={closeDrawer}
            >
              <ChevronsRight className="w-6 h-6" />
            </Button>
          </DrawerHeader>
          <DrawerMain>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ClearTextArea
                      disabled={isBlocking}
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
              name="imageList"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <InputImage
                      value={field.value}
                      onChange={field.onChange}
                      options={{ disabled: isBlocking }}
                    />
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
                      disabled={isBlocking}
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
            <Button
              type="button"
              variant="secondary"
              size="lg"
              disabled={isBlocking}
              onClick={closeDrawer}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={isBlocking}
            >
              저장
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Form>
  );
}
