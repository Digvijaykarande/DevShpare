import { Flame, Bookmark, FileText, FileCode2, PlayCircle, GraduationCap, Users, Sprout, Plus, ArrowRight, Map } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { POPULAR_RESOURCES, QUICK_LINKS } from "../../../pages/resources/data/resourcesData";

const LINK_ICONS = [FileText, FileCode2, PlayCircle, GraduationCap, Users];

export default function ResourcesSidebarPanel({ onAddResource }) {
  return (
    <div className="flex flex-col gap-lg">
      <Card>
        <CardContent className="p-4 flex flex-col gap-3">
          <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-on-surface">
            <Flame className="h-4 w-4 text-warning" />
            Popular Resources
          </h3>
          <ol className="flex flex-col gap-3">
            {POPULAR_RESOURCES.map((item, i) => (
              <li key={item.id} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-container text-[11px] font-semibold text-on-surface-variant">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-on-surface leading-snug">{item.title}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    <span className="text-primary">{item.tags[0]}</span> · {item.tags[1]}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex flex-col gap-3">
          <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-on-surface">
            <Bookmark className="h-4 w-4 text-primary" />
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2.5">
            {QUICK_LINKS.map((label, i) => {
              const Icon = LINK_ICONS[i] || FileText;
              return (
                <li key={label}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2.5 text-sm text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4 flex flex-col gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-on-primary">
            <Plus className="h-4 w-4" />
          </span>
          <div>
            <h3 className="font-display text-sm font-semibold text-on-surface">Contribute a Resource</h3>
            <p className="text-xs text-on-surface-variant mt-1">
              Share your favorite resource with the community.
            </p>
          </div>
          <Button variant="primary" size="sm" type="button" onClick={onAddResource}>
            Add Resource
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex flex-col gap-3">
          <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-on-surface">
            <Map className="h-4 w-4 text-primary" />
            Related to Your Roadmap
          </h3>
          <p className="text-xs text-on-surface-variant">
            Explore resources based on your current learning path.
          </p>
          <Button variant="surface" size="sm" type="button" className="justify-between">
            View Roadmap
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-success/5 border-success/20">
        <CardContent className="p-4 flex flex-col items-start gap-2">
          <Sprout className="h-5 w-5 text-success" />
          <p className="text-sm font-semibold text-on-surface leading-snug">
            Good resources build great developers.
          </p>
          <span className="h-0.5 w-8 rounded-full bg-success" />
        </CardContent>
      </Card>
    </div>
  );
}
