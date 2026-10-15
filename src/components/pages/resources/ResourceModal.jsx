import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, ExternalLink, Tag, X } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { cn } from "../../../utils/cn";

const ACCENTS = {
  primary: { plate: "bg-primary text-on-primary", band: "from-primary/25 via-primary/10 to-transparent", ring: "text-primary" },
  secondary: { plate: "bg-secondary text-on-secondary", band: "from-secondary/25 via-secondary/10 to-transparent", ring: "text-secondary" },
  tertiary: { plate: "bg-tertiary text-on-tertiary", band: "from-tertiary/25 via-tertiary/10 to-transparent", ring: "text-tertiary" },
};

export default function ResourceModal({ resource, onClose, onNotify }) {
  const [copied, setCopied] = useState(false);

  // Reset any transient state whenever a different resource is opened, and close on Escape.
  useEffect(() => {
    setCopied(false);
    if (!resource) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [resource, onClose]);

  const accent = ACCENTS[resource?.accent] ?? ACCENTS.primary;
  const Icon = resource?.icon;

  const handleCopy = async () => {
    if (!resource?.url) return;
    try {
      await navigator.clipboard.writeText(resource.url);
      setCopied(true);
      onNotify?.("Link copied to clipboard");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard permission denied — nothing to do
    }
  };

  return (
    <AnimatePresence>
      {resource && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-inverse-surface/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={resource.title}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[30rem] max-h-[88vh] overflow-y-auto bg-surface-container-lowest rounded-2xl shadow-2xl"
          >
            {/* Header band */}
            <div className={cn("relative overflow-hidden bg-gradient-to-br p-lg pb-xl", accent.band)}>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <motion.div
                initial={{ scale: 0.6, rotate: -8, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.05 }}
                className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-md", accent.plate)}
              >
                {Icon && <Icon className="w-7 h-7" strokeWidth={2} />}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mt-md pr-8"
              >
                <div className="flex items-center gap-xs flex-wrap">
                  <Badge variant="solid" className={cn("rounded-full", accent.plate)}>{resource.type}</Badge>
                  <Badge variant={resource.free ? "success" : "warning"} className="rounded-full">
                    {resource.free ? "Free" : "Paid"}
                  </Badge>
                </div>
                <h2 className="font-display text-xl font-bold text-on-surface mt-2 tracking-tight">
                  {resource.title}
                </h2>
                <p className="text-sm text-on-surface-variant mt-0.5">{resource.provider}</p>
              </motion.div>
            </div>

            {/* Body */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="p-lg flex flex-col gap-lg"
            >
              <p className="text-sm text-on-surface leading-relaxed">{resource.details || resource.summary}</p>

              <div className="flex flex-wrap items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-outline" />
                {(resource.tags || []).map((tag) => (
                  <Badge key={tag} variant="code">{tag}</Badge>
                ))}
              </div>

              <div className="flex items-center gap-sm">
                {resource.url ? (
                  <>
                    <a href={resource.url} target="_blank" rel="noreferrer" className="flex-1">
                      <Button variant="primary" size="default" type="button" className="w-full">
                        <ExternalLink className="w-4 h-4" />
                        Open resource
                      </Button>
                    </a>
                    <Button variant="surface" size="icon" type="button" onClick={handleCopy} aria-label="Copy link">
                      {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </>
                ) : (
                  <Button variant="surface" size="default" type="button" className="w-full" disabled>
                    Link coming soon
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}