import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleAlert } from "lucide-react";

/**
 * Fixed-position toast. Controlled from outside: pass `message` (or null to hide).
 * `tone` is "success" (default) or "error".
 */
export default function Toast({ message, tone = "success" }) {
  const Icon = tone === "error" ? CircleAlert : CheckCircle2;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
      <AnimatePresence>
        {message && (
          <motion.div
            key={message}
            role="status"
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-inverse-surface text-inverse-on-surface shadow-xl text-sm font-medium ring-1 ring-white/10"
          >
            <motion.span initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.08, type: "spring", stiffness: 500, damping: 16 }} className="flex">
              <Icon className={`w-4 h-4 shrink-0 ${tone === "error" ? "text-critical" : "text-success"}`} />
            </motion.span>
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
