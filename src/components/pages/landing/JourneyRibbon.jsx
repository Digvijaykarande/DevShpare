import { ChevronRight } from "lucide-react";

const STEPS = ["Learn", "Practice", "Solve", "Build", "Collaborate", "Compete", "Contribute", "Grow"];

export default function JourneyRibbon() {
  return (
    <div className="max-w-[80rem] mx-auto px-6 lg:px-12 mb-16">
      <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-3">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center gap-1.5">
            <span className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant bg-surface-container-low border border-outline-variant rounded-full px-3 py-1.5">
              <span className="text-primary font-semibold">{i + 1}.</span> {step}
            </span>
            {i < STEPS.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-outline shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}
