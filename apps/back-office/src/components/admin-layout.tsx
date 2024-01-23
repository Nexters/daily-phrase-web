"use client";

import { Archive, CloudIcon, Inbox, Send } from "lucide-react";
import { useState } from "react";
import { cn } from "~/libs/utils";
import Nav from "./nav";
import { Button } from "./ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { TooltipProvider } from "./ui/tooltip";

export interface AdminLayoutProps {
  defaultLayout?: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize?: number;
  children?: React.ReactNode;
}

// 아래 코드를 layout에서 건네 주면 됩니다.
// const layout = cookies().get("react-resizable-panels:layout")
// const collapsed = cookies().get("react-resizable-panels:collapsed")
//
// const defaultLayout = layout ? JSON.parse(layout.value) : undefined
// const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

export default function AdminLayout({
  defaultLayout = [265, 1105],
  defaultCollapsed = false,
  navCollapsedSize = 4,
  children,
}: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full items-stretch"
      >
        {/* Side Bar */}
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = "react-resizable-panels:collapsed=true";
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = "react-resizable-panels:collapsed=false";
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out",
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              !isCollapsed && "px-2",
            )}
          >
            <Button
              className="w-full"
              variant="ghost"
              size={isCollapsed ? "icon" : "sm"}
            >
              <CloudIcon className={cn("w-4 h-4", !isCollapsed && "hidden")} />
              <span className={cn("text-sm", isCollapsed && "hidden")}>
                계정 정보
              </span>
            </Button>
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Inbox",
                label: "128",
                icon: Inbox,
                variant: "default",
              },
              {
                title: "Sent",
                label: "",
                icon: Send,
                variant: "ghost",
              },
              {
                title: "Archive",
                label: "",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        {/* Content */}
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <ScrollArea className="h-screen">{children}</ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
