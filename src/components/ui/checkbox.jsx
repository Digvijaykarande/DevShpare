import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../utils/cn";

const Checkbox = React.forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    role="checkbox"
    aria-checked={checked}
    onClick={() => onCheckedChange?.(!checked)}
    className={cn(
      "w-4 h-4 rounded-[5px] flex items-center justify-center shrink-0 border transition-colors",
      checked ? "bg-primary-container border-primary-container" : "bg-surface-container-lowest border-outline hover:border-primary-container",
      className
    )}
    {...props}
  >
    {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
  </button>
));
Checkbox.displayName = "Checkbox";

export { Checkbox };