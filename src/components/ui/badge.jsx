import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-medium leading-4 ring-1 ring-inset ring-current/10",
  {
    variants: {
      variant: {
        default: "bg-primary-container/10 text-primary",
        solid: "bg-primary-container text-on-primary",
        neutral: "bg-surface-container text-on-surface-variant",
        muted: "bg-surface-container text-outline",
        success: "bg-success-container text-success",
        warning: "bg-warning-container text-warning",
        critical: "bg-critical-container text-critical",
        code: "bg-surface-container text-on-surface-variant font-code font-normal text-[10px]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => (
  <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
));
Badge.displayName = "Badge";

export { Badge, badgeVariants };
