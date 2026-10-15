import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronRight, Download, Play, Share2 } from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";

function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-xs">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1">
            {item.href && !isLast ? (
              <Link to={item.href} className="text-inverse-on-surface/60 hover:text-inverse-on-surface transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-inverse-on-surface font-semibold">{item.label}</span>
            )}
            {!isLast && <ChevronRight className="w-3.5 h-3.5 text-inverse-on-surface/40" />}
          </span>
        );
      })}
    </nav>
  );
}

export default function RoadmapHeader({ roadmap, onResume, onNotify }) {
  const [shared, setShared] = useState(false);
  const Icon = roadmap.icon;

  // Real share: native share sheet where available, clipboard copy as the universal fallback.
  const handleShare = async () => {
    const shareData = {
      title: roadmap.title,
      text: `I'm ${roadmap.progress.percent}% through the ${roadmap.title} roadmap on Devsphere.`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(shareData.url);
      setShared(true);
      onNotify?.("Link copied to clipboard");
      setTimeout(() => setShared(false), 1800);
    } catch {
      // user cancelled the share sheet — nothing to do
    }
  };

  // Real download: builds an actual file from the roadmap's current progress data.
  const handleDownload = () => {
    const payload = {
      roadmap: roadmap.title,
      version: roadmap.version,
      exportedAt: new Date().toISOString(),
      progress: roadmap.progress,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${roadmap.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-curriculum.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    onNotify?.("Curriculum summary downloaded");
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-inverse-surface mb-xl">
      {/* Ambient accent glows */}
      <div className="absolute -left-20 -top-24 w-72 h-72 bg-primary/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 -bottom-24 w-72 h-72 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-lg p-lg lg:p-xl">
        <Breadcrumb items={roadmap.breadcrumb} />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-lg">
          <div className="flex items-start gap-md max-w-3xl">
            {Icon && (
              <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 items-center justify-center shrink-0">
                <Icon className="w-7 h-7 text-inverse-on-surface" />
              </div>
            )}
            <div className="flex flex-col">
              <div className="flex items-center gap-sm mb-1.5">
                <Badge variant="code" className="bg-white/10 text-inverse-on-surface/80">
                  Version {roadmap.version}
                </Badge>
                <span className="inline-flex items-center gap-1.5 text-xs text-inverse-on-surface/60">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  {roadmap.reviewedBy}
                </span>
              </div>

              <h1 className="font-display text-2xl lg:text-[2rem] lg:leading-10 font-semibold tracking-tight text-inverse-on-surface">
                {roadmap.title}
              </h1>
              <p className="text-sm text-inverse-on-surface/70 mt-1.5">{roadmap.summary}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-sm">
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={handleShare}
              className="bg-white/10 text-inverse-on-surface hover:bg-white/15 hover:text-inverse-on-surface"
            >
              {shared ? <Check className="w-4 h-4 text-success" /> : <Share2 className="w-4 h-4" />}
              {shared ? "Copied" : "Share progress"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={handleDownload}
              className="bg-white/10 text-inverse-on-surface hover:bg-white/15 hover:text-inverse-on-surface"
            >
              <Download className="w-4 h-4" />
              Download curriculum
            </Button>
            <Button variant="primary" size="sm" type="button" onClick={onResume}>
              <Play className="w-4 h-4" />
              Resume next topic
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
