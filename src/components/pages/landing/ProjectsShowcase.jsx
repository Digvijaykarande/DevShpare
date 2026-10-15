import SectionHeading from "./SectionHeading";
import { buttonVariants } from "../../ui/button";

const PROJECTS = [
  {
    stage: "MVP stage • 3 weeks left",
    level: "Intermediate",
    title: "NeuralDocs: Local RAG Search for Monorepos",
    desc: "High-performance CLI and web dashboard to vector-index proprietary repos locally via Ollama with zero token leakage.",
    roles: ["Rust Engineer (1)", "React/UI Designer (1)"],
    lead: "@arjun_ai",
  },
  {
    stage: "Alpha testing",
    level: "Advanced",
    title: "HyperPulse: Real-Time Telemetry Sandbox",
    desc: "Distributed event stream visualizer designed to trace microsecond anomalies across Kubernetes pods using eBPF probes.",
    roles: ["Go Backend (2)", "eBPF Specialist (1)"],
    lead: "@sarah_infra",
  },
  {
    stage: "Ideation & planning",
    level: "Beginner friendly",
    title: "DevDeck: Open-Source Keyboard Layout Studio",
    desc: "Web-based configurator for mechanical keyboard custom layouts, flashing QMK/VIA firmware directly via WebHID API.",
    roles: ["Tailwind Specialist (1)", "QA & Tester (2)"],
    lead: "@mads_dev",
  },
];

export default function ProjectsShowcase() {
  return (
    <section id="projects" className="max-w-[80rem] mx-auto px-6 lg:px-12 mb-20">
      <SectionHeading
        eyebrow="Step 03 — Team formation"
        title="Collaborate & build real projects"
        description="Escape tutorial purgatory. Team up with developers around the globe, ship production-ready open source MVPs, and prove your capabilities with git proof of work."
        linkLabel="Explore 140+ open rosters"
        linkHref="#"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PROJECTS.map((p) => (
          <div key={p.title} className="flex flex-col bg-surface border border-outline-variant rounded-xl p-5">
            <div className="flex items-center justify-between mb-3 text-[11px]">
              <span className="text-secondary font-semibold bg-secondary-container/30 px-2 py-0.5 rounded">
                {p.stage}
              </span>
              <span className="text-on-surface-variant font-medium">{p.level}</span>
            </div>
            <h3 className="font-display font-semibold text-on-surface text-sm mb-2 leading-snug">{p.title}</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4 flex-1">{p.desc}</p>

            <div className="mb-4">
              <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wide">
                Open positions
              </span>
              <div className="flex flex-col gap-1 mt-1.5">
                {p.roles.map((r) => (
                  <span key={r} className="text-xs text-on-surface">
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-outline-variant">
              <span className="text-xs text-on-surface-variant">
                Lead: <span className="font-medium text-on-surface">{p.lead}</span>
              </span>
              <a href="#" className={buttonVariants({ variant: "outline", size: "default" }) + " h-8! px-3! text-xs"}>
                Request to join
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
