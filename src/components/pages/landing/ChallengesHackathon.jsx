import { Flame, CheckCircle2, ArrowRight } from "lucide-react";
import { buttonVariants } from "../../ui/button";

const CHALLENGES = [
  { title: "Implement lock-free ring buffer (RingQueue)", tags: "Concurrency · Memory order", level: "Hard" },
  { title: "Sliding window rate limiter with Redis token bucket", tags: "Distributed systems", level: "Medium" },
  { title: "Graph cycle detection in package dependency trees", tags: "Topological sort · DFS", level: "Easy" },
];

const LEVEL_COLOR = {
  Hard: "text-critical bg-critical-container",
  Medium: "text-warning bg-warning-container",
  Easy: "text-success bg-success-container",
};

export default function ChallengesHackathon() {
  return (
    <section className="max-w-[80rem] mx-auto px-6 lg:px-12 mb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Daily challenges */}
      <div className="bg-surface border border-outline-variant rounded-xl p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
            Daily algorithmic drills
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-warning">
            <Flame className="w-3.5 h-3.5" /> Streak: 12 days
          </span>
        </div>
        <h3 className="font-display text-xl font-bold text-on-surface mb-2">
          Real system design & algorithmic challenges
        </h3>
        <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
          Solve real-world challenges taken directly from tier-1 engineering interviews, complete
          with automated edge-case fuzzing and memory complexity constraints.
        </p>

        <div className="flex flex-col gap-2 mb-5">
          {CHALLENGES.map((c) => (
            <div
              key={c.title}
              className="flex items-center justify-between gap-3 bg-surface-container-low rounded-lg px-3.5 py-2.5"
            >
              <div className="min-w-0">
                <p className="text-xs font-medium text-on-surface truncate">{c.title}</p>
                <p className="text-[11px] text-on-surface-variant">{c.tags}</p>
              </div>
              <span className={"text-[11px] font-semibold px-2 py-0.5 rounded shrink-0 " + LEVEL_COLOR[c.level]}>
                {c.level}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-on-surface-variant">1,420+ challenges available</span>
          <a href="#" className={buttonVariants({ variant: "outline" }) + " text-xs h-9! group"}>
            Open code sandbox
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Hackathon banner */}
      <div className="bg-inverse-surface text-inverse-on-surface rounded-xl p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4 text-xs">
          <span className="font-semibold uppercase tracking-wide text-primary-fixed-dim">Global hackathon</span>
          <span className="text-inverse-on-surface/70">Starts in 4 days</span>
        </div>
        <h3 className="font-display text-xl font-bold mb-2">Autonomous Agentic Mesh 2025</h3>
        <p className="text-sm text-inverse-on-surface/75 leading-relaxed mb-5">
          Build the next generation of cooperative AI agents that orchestrate code review, CI/CD
          triage, and autonomous vulnerability patch generation.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div>
            <div className="font-display text-lg font-bold text-success">$25,000</div>
            <div className="text-[11px] text-inverse-on-surface/60">Prize pool</div>
          </div>
          <div>
            <div className="font-display text-lg font-bold">1,820</div>
            <div className="text-[11px] text-inverse-on-surface/60">Participants</div>
          </div>
          <div>
            <div className="font-display text-lg font-bold">48 hours</div>
            <div className="text-[11px] text-inverse-on-surface/60">Sprint duration</div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mb-5 text-sm">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
            Free cloud compute credits provided (Modal + Fly.io)
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
            Direct intros to partner YC/seed VC scouts
          </span>
        </div>

        <a href="#" className={buttonVariants() + " mt-auto justify-center"}>
          Register team or join solo
        </a>
      </div>
    </section>
  );
}
