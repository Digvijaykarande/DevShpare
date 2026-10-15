import { cn } from "../../utils/cn";

const PALETTE = [
  "bg-primary-container text-on-primary-container",
  "bg-secondary-container text-on-secondary-container",
  "bg-tertiary-container text-on-tertiary-container",
];

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Shows `src` when given (uploaded photo), otherwise coloured initials. */
export default function Avatar({ name = "", src, size = "md", ring = false, className }) {
  const sizes = {
    sm: "w-7 h-7 text-[10px]",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-24 h-24 text-3xl",
  };
  const palette = PALETTE[name.length % PALETTE.length];

  return (
    <div
      title={name}
      className={cn(
        "shrink-0 rounded-full flex items-center justify-center font-semibold overflow-hidden",
        sizes[size],
        !src && palette,
        ring && "ring-2 ring-surface-container-lowest shadow-xs",
        className
      )}
    >
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : initials(name)}
    </div>
  );
}
