import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  GitCommit,
  Ruler,
  TrendingUp,
  UserCheck,
  ExternalLink,
} from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import Avatar from "../../ui/Avatar";

const PROGRESS_ICONS = { clock: Clock, check: CheckCircle2, doc: FileText, commit: GitCommit, trend: TrendingUp, blueprint: Ruler };
const BAR_CLASS = { primary: "bg-primary-container", success: "bg-success", secondary: "bg-secondary" };

export default function ProjectCard({ project, index = 0, onApply, onOpenWorkspace }) {
  const ProgressIcon = PROGRESS_ICONS[project.progress?.icon] ?? Clock;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, ease: "easeOut", delay: (index % 6) * 0.05 }}
      className="h-full"
    >
      <Card className="relative p-lg h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        {project.isOwnTeam && (
          <div className="absolute top-0 right-0 bg-primary-container text-on-primary px-3 py-1 rounded-bl-lg text-xs font-bold flex items-center gap-1">
            <UserCheck className="w-3 h-3" />
            Your Team
          </div>
        )}

        <div className="flex flex-col">
          <div className={`flex items-center gap-xs mb-sm ${project.isOwnTeam ? "pr-24" : ""}`}>
            <Badge variant={project.status?.variant}>{project.status?.label}</Badge>
            <Badge variant="neutral">{project.difficulty}</Badge>
          </div>

          <h3 className="font-display text-lg font-semibold text-on-surface hover:text-primary transition-colors cursor-pointer">
            {project.title}
          </h3>
          <p className="text-sm text-on-surface-variant mt-1 line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-md">
            {(project.techStack || []).map((tech) => (
              <Badge key={tech} variant="code">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between mt-lg p-sm rounded-lg bg-surface-container-low/60">
            <div className="flex items-center gap-xs">
              <div className="flex -space-x-2">
                {(project.members || []).slice(0, 4).map((m, idx) => {
                  const name = typeof m === "string" ? m : m?.name || "Member";
                  return <Avatar key={idx} name={name} size="sm" ring />;
                })}
                {(project.memberOverflow > 0 || (project.members || []).length > 4) && (
                  <div className="h-7 w-7 rounded-full bg-surface-container-high text-on-surface text-[10px] font-bold flex items-center justify-center ring-2 ring-surface-container-lowest">
                    +{(project.memberOverflow || 0) + Math.max(0, (project.members || []).length - 4)}
                  </div>
                )}
              </div>
              <span className="text-on-surface text-xs">
                {(project.members || []).length + (project.memberOverflow || 0)} members
              </span>
            </div>
            <div className="text-on-surface-variant font-code text-[11px] text-right">
              Lead: <span className="text-primary font-semibold">{typeof project.lead === "object" ? project.lead?.name : project.lead || "Lead"}</span>
              {project.lead?.note && <span> ({project.lead.note})</span>}
            </div>
          </div>

          <div className="mt-md">
            <div className="text-on-surface-variant text-xs mb-1.5 flex items-center justify-between">
              <span>Open Positions:</span>
              <span className="text-primary font-bold">{(project.openPositions || []).length} needed</span>
            </div>
            <div className="flex flex-col gap-1">
              {(project.openPositions || []).map((pos, pIdx) => {
                const RoleIcon = pos.icon || Clock;
                return (
                  <div
                    key={pos.role || pIdx}
                    className="flex items-center justify-between px-xs py-1 rounded bg-surface-container-low text-on-surface text-xs"
                  >
                    <span className="flex items-center gap-1">
                      <RoleIcon className="w-3.5 h-3.5 text-primary" />
                      {pos.role}
                    </span>
                    <span className="font-code text-primary font-semibold">{pos.slots || "1 slot"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-lg pt-md flex flex-col gap-sm">
          <div className="flex items-center justify-between text-on-surface-variant text-xs">
            <span className="flex items-center gap-1">
              <ProgressIcon className="w-3.5 h-3.5 text-secondary" />
              {project.progress?.label || "Progress"}
            </span>
            <span className="font-code text-[11px] text-on-surface">
              {project.version ?? `${project.progress?.percent || 0}%`}
            </span>
          </div>
          <Progress value={project.progress?.percent || 0} indicatorClassName={BAR_CLASS[project.progress?.barVariant] || "bg-primary"} />

          {project.cta === "workspace" ? (
            <Button variant="primary" size="sm" type="button" className="w-full" onClick={() => onOpenWorkspace(project)}>
              Open Workspace
              <ExternalLink className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="surface" size="sm" type="button" className="w-full hover:bg-primary-container hover:text-on-primary" onClick={() => onApply(project)}>
              View & Apply to Join
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}