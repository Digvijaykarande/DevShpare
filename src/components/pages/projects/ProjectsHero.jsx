import { Plus, Users } from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";

export default function ProjectsHero({ myTeamsCount, onToggleMyTeams, showingMyTeams, onCreateProject }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
      <div className="flex flex-col max-w-[42rem]">
        <div className="flex items-center gap-xs text-primary text-xs font-semibold uppercase tracking-wider mb-1">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Open Collaborative Cohorts · Sprint 24.2
        </div>
        <h1 className="font-display text-2xl lg:text-[2.25rem] lg:leading-[2.75rem] font-semibold tracking-tight text-on-surface">
          Explore Projects & Team Collaboration
        </h1>
        <p className="text-base text-on-surface-variant mt-1">
          Escape tutorial purgatory. Team up with developers worldwide, build open-source MVPs,
          and prove your capabilities with git proof-of-work.
        </p>
      </div>

      <div className="flex items-center gap-sm self-start md:self-auto shrink-0">
        <Button
          variant={showingMyTeams ? "primary" : "surface"}
          size="default"
          type="button"
          onClick={onToggleMyTeams}
        >
          <Users className="w-4 h-4 text-secondary" />
          My Teams
          <Badge variant={showingMyTeams ? "solid" : "success"}>{myTeamsCount} Active</Badge>
        </Button>
        <Button variant="primary" size="default" type="button" onClick={onCreateProject}>
          <Plus className="w-4 h-4" />
          Create Project
        </Button>
      </div>
    </div>
  );
}
