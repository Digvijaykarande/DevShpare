import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium tracking-[-0.005em] transition-[background-color,box-shadow,color,transform] duration-150 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // existing landing-page variants, kept as-is so nothing breaks
        default: "bg-primary-container text-on-primary shadow-sm ring-1 ring-inset ring-white/15 hover:bg-primary",
        dark: "bg-inverse-surface text-inverse-on-surface shadow-sm hover:bg-on-surface",
        outline: "bg-surface-container-lowest text-on-surface border border-outline-variant shadow-xs hover:bg-surface-container-low hover:border-outline",
        // token-driven variants used by the app shell + roadmap workspace
        primary: "bg-primary-container text-on-primary shadow-sm ring-1 ring-inset ring-white/15 hover:bg-primary",
        surface:
          "bg-surface-container-lowest text-on-surface border border-outline-variant shadow-xs hover:bg-surface-container-low hover:border-outline",
        ghost: "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface",
      },
      size: {
        default: "h-10 px-5 text-sm",
        sm: "h-8 px-3 text-[13px]",
        lg: "h-12 px-6 text-[15px]",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = "Button";

export { Button, buttonVariants };
