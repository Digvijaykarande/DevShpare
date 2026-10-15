import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Clock } from "lucide-react";
import { Button } from "../../ui/button";
import Avatar from "../../ui/Avatar";
import { cn } from "../../../utils/cn";
import { TIME_SLOTS } from "../../../pages/mentorship/data/mentorshipData";

export default function BookingModal({ mentor, onClose, onConfirm }) {
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Reset the picked slot whenever a new mentor is opened, and close on Escape.
  useEffect(() => {
    setSelectedSlot(null);
    if (!mentor) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mentor, onClose]);

  return (
    <AnimatePresence>
      {mentor && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-inverse-surface/40"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Book a session with ${mentor.name}`}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-[26rem] bg-surface-container-lowest rounded-xl shadow-lg p-lg"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-md pr-8">
              <Avatar name={mentor.name} size="lg" ring />
              <div className="min-w-0">
                <h3 className="font-display text-base font-semibold text-on-surface truncate">
                  {mentor.name}
                </h3>
                <p className="text-xs text-on-surface-variant truncate">
                  {mentor.title} · {mentor.company}
                </p>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant mt-md">
              Pick a slot — {mentor.price === "Free" ? "these sessions are free." : `sessions are ${mentor.price}.`}
            </p>

            <div className="flex flex-col gap-1.5 mt-sm">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={cn(
                    "flex items-center gap-2 px-md py-sm rounded-lg text-sm text-left transition-colors border",
                    selectedSlot === slot
                      ? "bg-primary-container text-on-primary border-transparent"
                      : "bg-surface-container-low text-on-surface border-transparent hover:bg-surface-container"
                  )}
                >
                  <Clock className="w-4 h-4 shrink-0" />
                  {slot}
                </button>
              ))}
            </div>

            <Button
              variant="primary"
              size="default"
              type="button"
              className="w-full mt-lg"
              disabled={!selectedSlot}
              onClick={() => selectedSlot && onConfirm(mentor, selectedSlot)}
            >
              Confirm booking
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
