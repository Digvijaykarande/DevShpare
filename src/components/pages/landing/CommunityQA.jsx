import { CheckCircle2, Award, MessageSquare } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { buttonVariants } from "../../ui/button";

const QUESTIONS = [
  {
    votes: "+142",
    status: "Verified solution",
    time: "12m ago",
    title: "Rust Tokio channel backpressure causing CPU spike in WebSocket proxy",
    tags: ["rust", "async-io", "networking"],
    answers: "18 answers",
    author: "@marcus_v",
  },
  {
    votes: "+89",
    status: "Under review",
    time: "1h ago",
    title: "Zero-downtime database migration strategy with CockroachDB & Prisma schema changes",
    tags: ["distributed-db", "prisma", "sql"],
    answers: "9 answers",
    author: "@talia_cloud",
  },
  {
    votes: "+260",
    status: "Verified solution",
    time: "4h ago",
    title: "Optimizing bundle size in Next.js 15: dynamic imports vs package barrel exports",
    tags: ["nextjs", "webpack", "performance"],
    answers: "31 answers",
    author: "@dev_kenji",
  },
];

export default function CommunityQA() {
  return (
    <section id="community" className="max-w-[80rem] mx-auto px-6 lg:px-12 mb-20">
      <SectionHeading
        eyebrow="Step 02 — Peer problem solving"
        title="Community Q&A with real engineering rigor"
        description="No toxic gatekeeping or stale five-year-old threads. Questions demand reproducible sandboxes, profile-grade benchmarks, and solutions verified by domain contributors."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="flex items-start gap-3 bg-surface border border-outline-variant rounded-xl p-4">
            <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-on-surface mb-1">Verified solution guarantees</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Answers can be run live inside isolated in-browser sandboxes to prove they work.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-surface border border-outline-variant rounded-xl p-4">
            <Award className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-on-surface mb-1">Domain reputation badges</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Karma is weighted by commits to notable open-source repos and peer review depth.
              </p>
            </div>
          </div>
          <a href="#" className={buttonVariants({ variant: "outline" }) + " mt-1 justify-center"}>
            <MessageSquare className="w-4 h-4" />
            Ask a technical question
          </a>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-3">
          {QUESTIONS.map((q) => (
            <div
              key={q.title}
              className="flex flex-col sm:flex-row sm:items-center gap-4 bg-surface border border-outline-variant rounded-xl p-4 hover:border-primary/40 transition-colors"
            >
              <div className="flex sm:flex-col items-center gap-2 sm:w-16 shrink-0 text-center">
                <span className="font-display text-sm font-bold text-on-surface">{q.votes}</span>
                <span className="text-[10px] text-on-surface-variant uppercase">votes</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span
                    className={
                      "text-[11px] font-semibold px-2 py-0.5 rounded " +
                      (q.status === "Verified solution"
                        ? "text-success bg-success-container"
                        : "text-warning bg-warning-container")
                    }
                  >
                    {q.status}
                  </span>
                  <span className="text-[11px] text-on-surface-variant">{q.time}</span>
                </div>
                <h4 className="text-sm font-medium text-on-surface leading-snug mb-2">{q.title}</h4>
                <div className="flex items-center gap-2 flex-wrap">
                  {q.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-code text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right text-xs text-on-surface-variant shrink-0">
                <div className="font-medium text-on-surface">{q.answers}</div>
                <div>{q.author}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
