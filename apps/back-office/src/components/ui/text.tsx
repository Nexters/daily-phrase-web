import React from "react";
import { cn } from "~/libs/utils";

const EllipsisText = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { as?: React.ElementType }
>(({ as: Component = "span", className, ...props }, ref) => (
  <Component
    ref={ref}
    className={cn(
      "block whitespace-nowrap text-ellipsis overflow-hidden",
      className,
    )}
    {...props}
  />
));
EllipsisText.displayName = "EllipsisText";

export { EllipsisText };
