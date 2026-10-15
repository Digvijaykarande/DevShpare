import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, Check } from "lucide-react";
import { cn } from "../../../utils/cn";
import { PERSONALIZATION_TOPICS } from "../../../pages/news/data/newsData";

export default function PersonalizeFeedModal({ open, onClose, onSave, initialInterests }) {
  const [selected, setSelected] = useState(initialInterests || []);

  useEffect(() => {
    if (open) setSelected(initialInterests || []);
  }, [open, initialInterests]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const toggle = (topic) => {
    setSelected((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]));
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-surface-container-lowest shadow-2xl p-6 z-10 border border-outline-variant/40"
          >
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-base font-bold text-on-surface">Personalize Developer Feed</h2>
                  <p className="text-xs text-on-surface-variant">Select topics for your customized tech stream.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5 py-6 max-h-[60vh] overflow-y-auto">
              {PERSONALIZATION_TOPICS.map((topic) => {
                const active = selected.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => toggle(topic)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all shadow-xs cursor-pointer",
                      active
                        ? "border-primary bg-primary text-on-primary shadow-primary/20"
                        : "border-outline-variant/60 bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                    )}
                  >
                    {active && <Check className="h-3.5 w-3.5 shrink-0" />}
                    {topic}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-outline-variant/30">
              <button
                type="button"
                onClick={() => setSelected([])}
                className="rounded-xl border border-outline-variant/60 px-4 py-3 text-xs font-bold text-on-surface-variant hover:bg-surface-container-low transition-colors"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => onSave(selected)}
                className="flex-1 rounded-xl bg-primary py-3 text-xs font-bold text-on-primary shadow-md hover:opacity-90 transition-all cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}