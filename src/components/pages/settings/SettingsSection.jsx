import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

/** Title + description header used at the top of every settings panel. Optional icon chip. */
export function SectionHeader({ title, description, icon: Icon, className }) {
  const text = (
    <>
      <h2 className="font-display text-lg font-semibold text-on-surface">{title}</h2>
      {description && <p className="text-sm text-on-surface-variant">{description}</p>}
    </>
  );
  if (!Icon) return <div className={cn("flex flex-col gap-0.5", className)}>{text}</div>;
  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      <motion.span
        initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 18 }}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary-container to-violet-500 text-white shadow-md shadow-primary-container/30"
      >
        <Icon className="h-5 w-5" />
      </motion.span>
      <div className="flex flex-col gap-0.5">{text}</div>
    </div>
  );
}

/** A titled block inside a panel, separated from the one above by a divider. */
export function SubSection({ title, description, children, className }) {
  return (
    <section className={cn("flex flex-col gap-4 border-t border-outline-variant/60 pt-6", className)}>
      <SectionHeader title={title} description={description} className="[&>h2]:text-base" />
      {children}
    </section>
  );
}

/** One row: label + hint on the left, a control (switch, button, badge) on the right. */
export function SettingRow({ label, hint, children, htmlFor }) {
  return (
    <div className="-mx-3 flex items-center justify-between gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-surface-container-low/70">
      <div className="min-w-0">
        <label htmlFor={htmlFor} className="text-sm font-medium text-on-surface">{label}</label>
        {hint && <p className="mt-0.5 text-xs text-on-surface-variant">{hint}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
