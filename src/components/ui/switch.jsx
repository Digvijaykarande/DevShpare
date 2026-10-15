import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

/** Accessible on/off toggle with a springy thumb. Controlled: pass `checked` + `onCheckedChange`. */
const Switch = React.forwardRef(({ className, checked = false, onCheckedChange, disabled, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onCheckedChange?.(!checked)}
    className={cn(
      "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-[background-color,box-shadow] duration-200 disabled:cursor-not-allowed disabled:opacity-50",
      checked ? "bg-primary-container shadow-[0_0_0_4px_rgb(79_70_229/0.12)]" : "bg-outline-variant",
      className
    )}
    {...props}
  >
    <motion.span
      layout
      transition={{ type: "spring", stiffness: 700, damping: 32 }}
      style={{ marginLeft: checked ? "auto" : 0 }}
      whileTap={{ width: 24 }}
      className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm"
    />
  </button>
));
Switch.displayName = "Switch";

export { Switch };
