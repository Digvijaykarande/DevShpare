import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Avatar from "@/components/ui/Avatar";

const TAG_TONES = {
  emerald: "font-mono text-emerald-700 bg-emerald-50 border-emerald-200/60",
  sky: "font-mono text-sky-700 bg-sky-50 border-sky-200/60",
};

export default function ProjectCard({ project, onOpen }) {
  const Icon = project.icon;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-4 hover:border-slate-300 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${project.iconBg} ${project.iconColor}`}>
            <Icon className="w-[22px] h-[22px]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm text-slate-900 font-bold">{project.title}</h3>
              {project.titleBadge && (
                <Badge variant="outline" className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border-indigo-200/60 rounded text-[11px] font-semibold">
                  {project.titleBadge.text}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs mt-0.5">
              <span>
                {project.roleLabel}{" "}
                <strong className={project.roleValueMono ? "font-mono text-slate-700 font-normal" : "text-slate-800 font-medium"}>
                  {project.roleValue}
                </strong>
              </span>
              <span>•</span>
              <span className={`px-1.5 py-0.5 rounded border text-[11px] font-medium ${TAG_TONES[project.stackTag.tone]}`}>
                {project.stackTag.text}
              </span>
            </div>
          </div>
        </div>

        {project.statusBadge.dot ? (
          <span className="px-3 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full text-xs font-semibold text-emerald-700 self-start sm:self-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {project.statusBadge.text}
          </span>
        ) : (
          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium self-start sm:self-auto">
            {project.statusBadge.text}
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-slate-100 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 overflow-hidden">
            {project.members.map((member, i) => (
              <Avatar key={i} name={member.name} size="sm" ring />
            ))}
            {project.membersExtra && (
              <div className="h-7 w-7 rounded-full bg-slate-100 ring-2 ring-white flex items-center justify-center text-xs font-semibold text-slate-600">
                {project.membersExtra}
              </div>
            )}
          </div>
          <span className="text-xs text-slate-500">{project.membersLabel}</span>
        </div>

        <div className="flex items-center gap-3">
          {project.footerTag && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-md flex items-center gap-1">
              <project.footerTag.icon className="w-[14px] h-[14px]" /> {project.footerTag.text}
            </span>
          )}
          {project.footerText && (
            <span className="text-xs text-slate-500 font-medium">{project.footerText}</span>
          )}
          <button
            type="button"
            onClick={() => onOpen?.(project.id)}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
          >
            <ChevronRight className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}