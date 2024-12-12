import * as React from "react";


import { cn } from "~/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border px-3 py-2 text-base",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";