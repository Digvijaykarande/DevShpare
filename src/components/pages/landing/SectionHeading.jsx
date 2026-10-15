import { ArrowRight } from "lucide-react";

export default function SectionHeading({ eyebrow, title, description, linkLabel, linkHref }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
      <div className="max-w-[36rem]">
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">{eyebrow}</span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-on-surface mt-1.5 mb-2">
          {title}
        </h2>
        <p className="text-sm text-on-surface-variant leading-relaxed">{description}</p>
      </div>
      {linkLabel && (
        <a
          href={linkHref || "#"}
          className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-container group"
        >
          {linkLabel}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      )}
    </div>
  );
}
