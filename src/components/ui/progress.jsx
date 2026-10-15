import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../utils/cn";

/**
 * Linear progress bar. The fill animates from 0 to `value` once on mount and
 * whenever `value` changes, so a checked-off outcome visibly moves the bar.
 */
const Progress = React.forwardRef(
  ({ className, indicatorClassName, value = 0, ...props }, ref) => {
    const reduceMotion = useReducedMotion();
    const pct = Math.min(100, Math.max(0, value));

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          "w-full h-2 rounded-full bg-surface-container-high overflow-hidden",
          className
        )}
        {...props}
      >
        <motion.div
          className={cn("h-full rounded-full bg-primary-container", indicatorClassName)}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
