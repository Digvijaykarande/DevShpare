import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import { cn } from "../../../utils/cn";

function HintRow({ hint }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-surface-container-low border border-outline-variant/60 rounded-xl p-3.5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-xs font-semibold text-on-surface"
      >
        <div className="flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-secondary" />
          <span>{hint.title}</span>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-outline transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-on-surface-variant text-xs leading-relaxed">
              {hint.body.map((part, i) =>
                part.code ? (
                  <code
                    key={i}
                    className={cn(
                      "bg-surface-container-lowest border border-outline-variant/60 px-1.5 py-0.5 rounded font-code",
                      part.emphasis ? "text-success font-medium" : "text-primary-container"
                    )}
                  >
                    {part.code}
                  </code>
                ) : (
                  <span key={i}>{part.text}</span>
                )
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HintAccordion({ hints }) {
  return (
    <div className="space-y-2">
      {hints.map((hint) => (
        <HintRow key={hint.title} hint={hint} />
      ))}
    </div>
  );
}
