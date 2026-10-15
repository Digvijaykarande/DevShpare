import * as React from "react";
import { cn } from "../../utils/cn";

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "w-full h-11 px-3.5 bg-surface-container-lowest text-on-surface placeholder:text-outline text-sm rounded-lg border border-outline-variant shadow-xs outline-none hover:border-outline focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 aria-[invalid=true]:border-error aria-[invalid=true]:ring-error/15 disabled:bg-surface-container-low disabled:text-outline transition-[border-color,box-shadow]",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };