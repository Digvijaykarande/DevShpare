import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { cn } from "../../../utils/cn";
import { TAGS } from "../../../pages/questions/data/questionsData";

const FIELD_CLASS =
  "w-full py-2.5 px-3.5 bg-surface-container-low text-on-surface placeholder:text-outline text-sm rounded-lg outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30 transition-colors";

export default function AskQuestionModal({ open, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (!open) return;
    setTitle("");
    setBody("");
    setTags([]);
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const toggleTag = (tag) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : prev.length < 3 ? [...prev, tag] : prev));
  };

  const canSubmit = title.trim().length > 8 && body.trim().length > 15 && tags.length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({ title: title.trim(), body: body.trim(), tags });
  };

  return (
    <AnimatePresence>
      {open && (
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
            aria-label="Ask a question"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-[32rem] max-h-[90vh] overflow-y-auto bg-surface-container-lowest rounded-xl shadow-lg p-lg"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-lg font-semibold text-on-surface pr-8">Ask a question</h3>
            <p className="text-sm text-on-surface-variant mt-1">
              Be specific — good titles get better, faster answers.
            </p>

            <div className="flex flex-col gap-md mt-lg">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="question-title">Title</Label>
                <input
                  id="question-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Why does my useEffect run twice in dev mode?"
                  className={FIELD_CLASS}
                  maxLength={140}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="question-body">Details</Label>
                <textarea
                  id="question-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="What have you tried? What did you expect to happen?"
                  rows={4}
                  className={cn(FIELD_CLASS, "resize-none")}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Tags (up to 3)</Label>
                <div className="flex flex-wrap gap-1.5">
                  {TAGS.map((tag) => {
                    const isActive = tags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors border",
                          isActive
                            ? "bg-primary-container text-on-primary border-transparent"
                            : "bg-surface-container-low text-on-surface-variant border-transparent hover:bg-surface-container"
                        )}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="default"
              type="button"
              className="w-full mt-lg"
              disabled={!canSubmit}
              onClick={handleSubmit}
            >
              Post question
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
