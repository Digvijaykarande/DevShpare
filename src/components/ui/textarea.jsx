import * as React from "react";
import { cn } from "../../utils/cn";

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full min-h-24 px-3.5 py-2.5 bg-surface-container-lowest text-on-surface placeholder:text-outline text-sm leading-relaxed rounded-lg border border-outline-variant shadow-xs outline-none resize-none hover:border-outline focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 aria-[invalid=true]:border-error aria-[invalid=true]:ring-error/15 transition-[border-color,box-shadow]",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
