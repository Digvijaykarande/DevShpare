import { BookOpen, ExternalLink, Newspaper, Wrench } from "lucide-react";

const TYPE_META = {
  docs: { icon: BookOpen, label: "Docs", className: "text-primary bg-primary/10" },
  article: { icon: Newspaper, label: "Article", className: "text-secondary bg-secondary-container/20" },
  interactive: { icon: Wrench, label: "Interactive", className: "text-tertiary bg-tertiary-container/15" },
};

export default function StudyMaterial({ resources }) {
  if (!resources?.length) return null;

  return (
    <section className="flex flex-col gap-sm mt-lg">
      <div className="flex items-center justify-between">
        <h4 className="text-[13px] font-semibold text-on-surface">Study material</h4>
        <span className="text-xs text-on-surface-variant">{resources.length} resources</span>
      </div>

      <ul className="flex flex-col gap-sm">
        {resources.map((resource) => {
          const meta = TYPE_META[resource.type] ?? TYPE_META.docs;
          const Icon = meta.icon;
          return (
            <li key={resource.id}>
              <a
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center gap-sm p-sm rounded-lg bg-surface-container-low hover:bg-surface-container border border-transparent hover:border-outline-variant/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className={`p-2 rounded-md shrink-0 ${meta.className}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <span className="flex flex-col min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wide shrink-0 ${meta.className.split(" ")[0]}`}
                    >
                      {meta.label}
                    </span>
                    <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors truncate">
                      {resource.title}
                    </span>
                  </span>
                  <span className="text-xs text-on-surface-variant truncate">
                    {resource.source} &middot; {resource.meta}
                  </span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-outline group-hover:text-primary transition-colors shrink-0" />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
