"use client";

import { format, parse } from "date-fns";
import { ChevronsRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";
import { ClearTextArea } from "~/components/ui/textarea";
import { cn } from "~/libs/utils";
import { Calendar } from "../ui/calender";
import InputImage from "../ui/input-image";
import { Switch } from "../ui/switch";
import {
  useManageDrawer,
  useManageDrawerForm,
  useManageDrawerMutation,
} from "./hooks/use-manage-drawer";
import useTextareaHeight from "./hooks/use-textarea-height";

export function ManageDrawerContent() {
  const isOpen = useManageDrawer((v) => v.open);
  const phraseId = useManageDrawer((v) => v.data?.phraseId);
  const isBlocking = useManageDrawer((v) => v.isBlocking);
  const closeDrawer = useManageDrawer((v) => v.closeDrawer);

  const { form } = useManageDrawerForm();
  const { onSubmit } = useManageDrawerMutation();
  const { textAreaRef, setTextareaHeight } = useTextareaHeight("px");

  return (
    <Form {...form}>
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex h-auto flex-col border bg-background",
          "min-w-[480px] w-1/3 transition transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <form
          className="w-full h-full flex flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex items-center gap-1.5 p-6 pb-0">
            <Button
              type="button"
              disabled={isBlocking}
              variant="ghost"
              size="icon"
              onClick={closeDrawer}
            >
              <ChevronsRight className="w-6 h-6 text-muted-foreground" />
            </Button>
          </div>
          <div className="flex-1 flex flex-col gap-4 pt-8 pl-8 pr-12 overflow-y-auto">
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
            {phraseId && (
              <>
                <div className="flex gap-4 text-sm">
                  <a
                    className="text-primary underline-offset-4 hover:underline"
                    href={`https://www.daily-phrase.com/phrase-web/${phraseId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    웹 바로가기
                  </a>
                  <a
                    className="text-primary underline-offset-4 hover:underline"
                    href={`https://www.daily-phrase.com/phrase-webview/${phraseId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    앱 웹뷰 바로가기
                  </a>
                </div>
                <Separator />
              </>
            )}
            <FormField
              control={form.control}
              name="isReserved"
              render={({ field }) => (
                <>
                  <div className="flex gap-2">
                    <span className="font-semibold">예약 여부</span>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                  {field.value ? (
                    <FormField
                      control={form.control}
                      name="publishDate"
                      render={({ field }) => (
                        <Calendar
                          mode="single"
                          selected={
                            field.value
                              ? parse(field.value, "yyyy-MM-dd", new Date())
                              : new Date()
                          }
                          onSelect={(day, selectedDay, ...rest) =>
                            field.onChange(
                              format(day || new Date(), "yyyy-MM-dd"),
                              format(selectedDay, "yyyy-MM-dd"),
                              ...rest,
                            )
                          }
                          className="flex justify-center items-center rounded-md"
                        />
                      )}
                    />
                  ) : null}
                </>
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
                      {...field}
                      ref={(ref) => {
                        textAreaRef.current = ref;
                        field.ref(ref);
                        if (!textAreaRef.current) return;
                        setTextareaHeight(textAreaRef.current);
                      }}
                      disabled={isBlocking}
                      placeholder="텍스트를 작성해 주세요"
                      className="h-full text-base"
                      onChange={(...args) => {
                        if (!textAreaRef.current) return;
                        setTextareaHeight(textAreaRef.current);
                        field.onChange(...args);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-end gap-2 pt-8 pb-14 pl-8 pr-12">
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
          </div>
        </form>
      </div>
    </Form>
  );
}
