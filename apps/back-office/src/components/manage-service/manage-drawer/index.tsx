import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerMain,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";

export default function ManageDrawer() {
  return (
    <Drawer modal={false}>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent className="min-w-[480px] w-1/3">
        <DrawerHeader />
        <DrawerMain>
          <Textarea
            className="min-h-9 text-2xl font-bold"
            placeholder="제목 없음"
            draggable={false}
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
          <Textarea className="h-full" placeholder="텍스트를 작성해 주세요" />
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
      </DrawerContent>
    </Drawer>
  );
}
