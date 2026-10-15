import { Link } from "react-router-dom";
import { Compass, ArrowRight } from "lucide-react";
import { Button } from "../../ui/button";

export default function RoadmapCallout() {
  return (
    <div className="relative mt-2xl overflow-hidden rounded-2xl bg-inverse-surface flex flex-col md:flex-row items-center justify-between gap-lg p-xl">
      {/* Ambient glow accents */}
      <div className="absolute -left-16 -top-16 w-56 h-56 bg-primary/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-10 -bottom-16 w-56 h-56 bg-secondary/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col max-w-[36rem]">
        <div className="flex items-center gap-xs text-inverse-on-surface/70 text-xs font-bold uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4" />
          Not sure which path?
        </div>
        <h2 className="text-inverse-on-surface font-display text-xl font-semibold">
          Talk to a mentor who's already walked it.
        </h2>
        <p className="text-inverse-on-surface/70 text-sm mt-1.5">
          A 20-minute call can save you weeks of picking the wrong stack. Mentors help you match a
          roadmap to your goals before you commit.
        </p>
      </div>

      <Link to="/mentorship" className="relative z-10 shrink-0 w-full md:w-auto">
        <Button variant="primary" size="default" type="button" className="w-full md:w-auto">
          Find a mentor
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
}
