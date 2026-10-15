import { Label } from "../../ui/label";
import { cn } from "../../../utils/cn";

/**
 * Label + control + error/hint. When `inline` is set the label sits to the left of the
 * control on wide screens (the layout used for Location and Website).
 */
export default function Field({ label, htmlFor, error, hint, inline = false, children, className }) {
  const message = error || hint;
  return (
    <div className={cn(inline ? "grid gap-1.5 sm:grid-cols-[6.5rem_1fr] sm:items-start sm:gap-4" : "flex flex-col gap-1.5", className)}>
      <Label htmlFor={htmlFor} className={cn(inline && "sm:flex sm:h-11 sm:items-center")}>{label}</Label>
      <div className="flex flex-col gap-1.5">
        {children}
        {message && (
          <p id={htmlFor ? `${htmlFor}-msg` : undefined} role={error ? "alert" : undefined} className={cn("text-xs", error ? "text-error" : "text-on-surface-variant")}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
