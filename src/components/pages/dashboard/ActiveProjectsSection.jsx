import { GitBranch, ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";

export default function ActiveProjectsSection({ projects, onBrowseAll, onOpenProject }) {
  return (
    <section className="flex flex-col gap-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitBranch className="w-[22px] h-[22px] text-sky-600" />
          <h2 className="font-bold text-base text-slate-900">Active Projects & Collaboration</h2>
        </div>
        <button
          type="button"
          onClick={onBrowseAll}
          className="text-xs font-semibold text-sky-600 hover:text-sky-800 transition-colors flex items-center gap-1"
        >
          Browse All <ArrowRight className="w-[15px] h-[15px]" />
        </button>
      </div>

      <div className="flex flex-col gap-3.5">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={onOpenProject} />
        ))}
      </div>
    </section>
  );
}
