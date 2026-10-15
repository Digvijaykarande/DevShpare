import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Send, Briefcase } from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";

export default function ApplyModal({ project, onClose, onSubmitSuccess }) {
  const [selectedRole, setSelectedRole] = useState("");
  const [coverMessage, setCoverMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!project) return;
    // Default to the first open position if available
    if (project.openPositions && project.openPositions.length > 0) {
      setSelectedRole(project.openPositions[0].role);
    }
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [project, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request / application submission
    setTimeout(() => {
      setIsSubmitting(false);
      if (onSubmitSuccess) onSubmitSuccess(project, selectedRole, coverMessage);
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Apply to ${project.title}`}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-[30rem] max-h-[85vh] overflow-y-auto bg-surface-container-lowest rounded-2xl shadow-lg p-lg"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
            >
              ✕
            </button>

            {/* Header */}
            <div className="mb-md">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary mb-1">
                <Briefcase className="w-3.5 h-3.5" />
                TEAM APPLICATION
              </span>
              <h3 className="font-display text-lg font-semibold text-on-surface leading-snug">
                Join {project.title}
              </h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Choose an open position and let the team lead know why you're a great fit.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-md">
              {/* Select Role */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-on-surface-variant mb-2">
                  Select Open Position
                </label>
                <div className="flex flex-wrap gap-2">
                  {project.openPositions.map((pos) => {
                    const isSelected = selectedRole === pos.role;
                    return (
                      <button
                        key={pos.role}
                        type="button"
                        onClick={() => setSelectedRole(pos.role)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-left flex items-center gap-2 ${
                          isSelected
                            ? "bg-primary text-on-primary border-primary shadow-sm"
                            : "bg-surface-container-low text-on-surface border-outline-variant/40 hover:bg-surface-container"
                        }`}
                      >
                        <span>{pos.role}</span>
                        <span className={`text-[10px] opacity-80 ${isSelected ? "text-on-primary" : "text-primary font-code"}`}>
                          · {pos.slots}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message / Cover note */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-on-surface-variant mb-2">
                  Intro Note / Pitch (Optional)
                </label>
                <textarea
                  rows={3}
                  value={coverMessage}
                  onChange={(e) => setCoverMessage(e.target.value)}
                  placeholder="Tell the lead a bit about your experience with this tech stack..."
                  className="w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-3 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <Button variant="surface" type="button" size="sm" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" size="sm" disabled={isSubmitting || !selectedRole}>
                  {isSubmitting ? "Submitting..." : "Send Application"}
                  <Send className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}