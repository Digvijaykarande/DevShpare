import { Layers, Brain, Cloud, Code2 } from "lucide-react";
import SectionHeading from "./SectionHeading";

const PATHS = [
  {
    icon: Layers,
    tag: "Beginner to advanced",
    title: "Full-Stack Modern Web",
    desc: "Node.js, Next.js App Router, Prisma ORM, Postgres internals, Docker containers.",
    topics: "92 topics",
    progress: "74% enrolled",
  },
  {
    icon: Brain,
    tag: "Specialization",
    title: "AI & Machine Learning",
    desc: "PyTorch, vector databases (Pinecone/pgvector), fine-tuning LLMs, and RAG pipelines.",
    topics: "68 topics",
    progress: "91% active",
  },
  {
    icon: Cloud,
    tag: "DevOps & SRE",
    title: "Cloud & Systems Infra",
    desc: "Kubernetes orchestration, Terraform IaC, Prometheus alerting, and CI/CD hardening.",
    topics: "54 topics",
    progress: "60% enrolled",
  },
  {
    icon: Code2,
    tag: "Modern UI/UX",
    title: "Frontend Architecture",
    desc: "React 19 server components, micro-frontends, WebGL transitions, and design systems.",
    topics: "48 topics",
    progress: "82% enrolled",
  },
];

export default function LearningRoadmaps() {
  return (
    <section id="roadmaps" className="max-w-[80rem] mx-auto px-6 lg:px-12 mb-20">
      <SectionHeading
        eyebrow="Step 01 — Structured progress"
        title="Interactive learning roadmaps"
        description="Skip outdated video playlists. Master modern stacks through clear step-by-step milestones, vetted open-source resources, and automated code validation."
        linkLabel="View all 24 curated paths"
        linkHref="#"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PATHS.map((p) => (
          <div
            key={p.title}
            className="group flex flex-col bg-surface border border-outline-variant rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all"
          >
            <div className="w-9 h-9 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center mb-4">
              <p.icon className="w-4.5 h-4.5" />
            </div>
            <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wide mb-1">
              {p.tag}
            </span>
            <h3 className="font-display font-semibold text-on-surface text-sm mb-1.5">{p.title}</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4 flex-1">{p.desc}</p>
            <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-medium pt-3 border-t border-outline-variant">
              <span>{p.topics}</span>
              <span className="text-success">{p.progress}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
