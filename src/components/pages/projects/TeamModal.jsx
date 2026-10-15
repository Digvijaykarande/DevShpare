import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Crown, ExternalLink, Users } from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import Avatar from "../../ui/Avatar";

export default function TeamModal({ project, onClose, onApply, onOpenWorkspace }) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [project, onClose]);

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
            aria-label={`Team behind ${project.title}`}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-[28rem] max-h-[85vh] overflow-y-auto bg-surface-container-lowest rounded-2xl shadow-lg"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-surface-container-lowest px-lg pt-lg pb-md border-b border-outline-variant/40">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
              >
                ✕
              </button>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-on-surface-variant">
                <Users className="w-3.5 h-3.5" />
                TEAM
              </span>
              <h3 className="font-display text-lg font-semibold text-on-surface mt-1 pr-8 leading-snug">
                {project.title}
              </h3>
            </div>

            <div className="p-lg pt-md flex flex-col gap-lg">
              {/* Lead */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-on-surface-variant mb-sm">
                  Project Lead
                </p>
                <div className="flex items-center gap-md p-sm rounded-xl bg-primary/5 border border-primary/15">
                  <Avatar name={project.lead.name.replace("@", "")} size="lg" ring />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-on-surface truncate">{project.lead.name}</p>
                    <p className="text-xs text-primary font-medium">{project.lead.note || "Team Lead"}</p>
                  </div>
                  <Crown className="w-4 h-4 text-warning shrink-0" />
                </div>
              </div>

              {/* Members */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-on-surface-variant mb-sm">
                  Team Members · {project.members.length + project.memberOverflow}
                </p>
                <div className="flex flex-col gap-1.5">
                  {project.members.map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center gap-md p-sm rounded-xl hover:bg-surface-container-low transition-colors"
                    >
                      <Avatar name={member.name} size="md" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-on-surface truncate">{member.name}</p>
                        <p className="text-xs text-on-surface-variant truncate">{member.role}</p>
                      </div>
                    </div>
                  ))}

                  {project.memberOverflow > 0 && (
                    <div className="flex items-center gap-md p-sm rounded-xl">
                      <div className="w-9 h-9 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-bold flex items-center justify-center">
                        +{project.memberOverflow}
                      </div>
                      <p className="text-xs text-on-surface-variant">
                        {project.memberOverflow} more contributor{project.memberOverflow > 1 ? "s" : ""} on this project
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Open roles reminder */}
              {project.openPositions.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.openPositions.map((pos) => (
                    <Badge key={pos.role} variant="code">
                      {pos.role} · {pos.slots} open
                    </Badge>
                  ))}
                </div>
              )}

              {project.cta === "workspace" ? (
                <Button variant="primary" size="default" type="button" className="w-full" onClick={() => onOpenWorkspace(project)}>
                  Open Workspace
                  <ExternalLink className="w-4 h-4" />
                </Button>
              ) : (
                <Button variant="primary" size="default" type="button" className="w-full" onClick={() => onApply(project)}>
                  Apply to Join This Team
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}