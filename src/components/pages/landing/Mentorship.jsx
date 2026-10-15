import { Star } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Avatar from "../../ui/Avatar";
import { buttonVariants } from "../../ui/button";

const MENTORS = [
  {
    name: "Elena Rostova",
    role: "Staff Engineer @ Stripe",
    rating: "5.0",
    sessions: "142 sessions",
    focus: "Distributed systems, high-throughput microservices, backend interview prep, tech-lead transition.",
    slot: "Tomorrow 15:00 UTC",
  },
  {
    name: "Darius Vance",
    role: "Tech Lead @ Datadog",
    rating: "4.9",
    sessions: "98 sessions",
    focus: "Observability, Rust & Go systems programming, Kubernetes networking, performance tuning.",
    slot: "Friday 18:30 UTC",
  },
  {
    name: "Sora Takahashi",
    role: "ML Infra @ Anthropic",
    rating: "5.0",
    sessions: "87 sessions",
    focus: "LLM fine-tuning pipelines, transformer optimization, vector search indexing, Python profiling.",
    slot: "Saturday 10:00 UTC",
  },
  {
    name: "Felix Becker",
    role: "Principal UI Eng @ Vercel",
    rating: "4.9",
    sessions: "210 sessions",
    focus: "Design systems, WebGL rendering, React performance audit, frontend architecture at scale.",
    slot: "Monday 14:00 UTC",
  },
];

export default function Mentorship() {
  return (
    <section id="mentorship" className="max-w-[80rem] mx-auto px-6 lg:px-12 mb-20">
      <SectionHeading
        eyebrow="Step 04 — Experienced guidance"
        title="1-on-1 mentorship from industry engineers"
        description="Direct access to senior, staff, and principal developers for code architecture audits, mock interviews, and career unblocking."
        linkLabel="Find your mentor"
        linkHref="#"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MENTORS.map((m) => (
          <div key={m.name} className="flex flex-col bg-surface border border-outline-variant rounded-xl p-5">
            <Avatar name={m.name} size="lg" className="mb-3" />
            <h3 className="font-display font-semibold text-on-surface text-sm">{m.name}</h3>
            <p className="text-xs text-on-surface-variant mb-2">{m.role}</p>
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-3">
              <Star className="w-3.5 h-3.5 text-warning fill-warning" />
              <span className="font-medium text-on-surface">{m.rating}</span>
              <span>•</span>
              <span>{m.sessions}</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4 flex-1">
              <span className="font-semibold text-on-surface">Focus: </span>
              {m.focus}
            </p>
            <div className="pt-3 border-t border-outline-variant flex flex-col gap-2">
              <span className="text-[11px] text-on-surface-variant">Next slot: {m.slot}</span>
              <a href="#" className={buttonVariants({ variant: "outline" }) + " justify-center text-xs h-9!"}>
                Book call
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
