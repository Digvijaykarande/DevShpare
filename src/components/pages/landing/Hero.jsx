import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Terminal, CheckCircle2, Copy } from "lucide-react";
import Avatar from "../../ui/Avatar";
import { buttonVariants } from "../../ui/button";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative max-w-[80rem] mx-auto px-6 lg:px-12 pt-28 lg:pt-32 pb-16 overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[52rem] h-[25rem] bg-gradient-to-b from-primary-fixed/50 to-transparent blur-[6rem] rounded-full pointer-events-none -z-10" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center text-center max-w-[52rem] mx-auto"
      >
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-outline-variant shadow-xs text-primary text-xs font-semibold tracking-wide mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Build · Learn · Collaborate · Grow
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-on-surface mb-6 font-bold leading-[1.08]"
        >
          A community for developers who{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">
            build tomorrow
          </span>
        </motion.h1>

        <motion.p variants={item} className="font-body text-base sm:text-lg text-on-surface-variant max-w-[42rem] mb-8 leading-relaxed">
          Learn new technologies, solve challenging problems, collaborate on real-world projects,
          connect with experienced mentors, and accelerate your engineering career — all in one
          unified ecosystem.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-14">
          <Link
            to="/register"
            className={buttonVariants({ size: "lg" }) + " w-full sm:w-auto group"}
          >
            Get started — it's free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#roadmaps"
            className={buttonVariants({ variant: "outline", size: "lg" }) + " w-full sm:w-auto"}
          >
            <Terminal className="w-4 h-4 text-primary" />
            Explore community &amp; roadmaps
          </a>
        </motion.div>
      </motion.div>

      {/* Code + discussion preview card */}
      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-[64rem] mx-auto rounded-xl bg-surface border border-outline-variant shadow-xl p-2 sm:p-2.5"
      >
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-surface-container-low border-b border-outline-variant rounded-t-lg">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-critical" />
            <span className="w-3 h-3 rounded-full bg-warning" />
            <span className="w-3 h-3 rounded-full bg-success" />
            <span className="font-code text-xs text-on-surface-variant ml-3">session-orchestrator.ts</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-success font-semibold bg-success-container px-2 py-0.5 rounded">
              <CheckCircle2 className="w-3.5 h-3.5" /> Solved &amp; verified
            </span>
            <span className="font-code text-on-surface-variant">+382 upvotes</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 bg-surface-container-low/40 p-2 rounded-b-lg">
          <div className="lg:col-span-7 bg-surface border border-outline-variant p-4 sm:p-5 rounded-lg font-code text-[13px] overflow-x-auto text-on-surface">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-outline-variant text-on-surface-variant text-xs font-body">
              <div className="flex items-center gap-3">
                <span className="text-primary font-semibold">TypeScript</span>
                <span>lib/distributed-cache.ts</span>
              </div>
              <button className="hover:text-on-surface flex items-center gap-1 transition-colors">
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </div>
            <pre className="leading-relaxed whitespace-pre-wrap">
              <span className="text-tertiary font-semibold">import</span>{" "}
              {"{ createDistributedCluster, ClusterNode } "}
              <span className="text-tertiary font-semibold">from</span>{" "}
              <span className="text-success">'@devsphere/mesh'</span>;{"\n\n"}
              <span className="text-on-surface-variant italic">// ⚡ auto-replicating state hook for collaborative sessions</span>{"\n"}
              <span className="text-tertiary font-semibold">export async function</span>{" "}
              <span className="text-secondary font-medium">initClusterParticipant</span>
              {"(nodeId: "}
              <span className="text-warning">string</span>
              {"): "}
              <span className="text-warning">Promise</span>
              {"<ClusterNode> {\n  "}
              <span className="text-tertiary font-semibold">const</span> cluster ={" "}
              <span className="text-tertiary font-semibold">await</span> createDistributedCluster({"{"}
              {"\n    heartbeatMs: "}
              <span className="text-critical">250</span>
              {",\n    consensus: "}
              <span className="text-success">'raft-hybrid'</span>
              {",\n  }); \n\n  "}
              <span className="text-tertiary font-semibold">return</span> cluster.connect(nodeId);{"\n}"}
            </pre>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between bg-surface border border-outline-variant p-4 sm:p-5 rounded-lg">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] text-success font-bold uppercase tracking-wider bg-success-container px-2 py-0.5 rounded">
                  Solution snapshot
                </span>
                <span className="text-xs bg-surface-container-low text-on-surface-variant px-2 py-0.5 rounded font-code">
                  P99: 14ms
                </span>
              </div>
              <h3 className="font-display font-semibold text-on-surface text-sm sm:text-base mb-2 leading-snug">
                How to handle low-latency Raft sync across multi-region edge workers?
              </h3>
              <p className="text-xs text-on-surface-variant line-clamp-3 mb-4 leading-relaxed">
                We mitigated split-brain gossip partitions by introducing local quorum lease locks
                before falling back to WAN heartbeats. Verified on 40 global fly.io nodes.
              </p>
              <div className="flex items-center gap-3 p-2.5 bg-surface-container-low border border-outline-variant rounded-lg">
                <Avatar name="Evelyn Chen" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-on-surface truncate">Evelyn Chen</span>
                  <span className="text-[11px] text-on-surface-variant truncate">
                    Principal Systems Engineer @ Orbit
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-outline-variant flex items-center justify-between text-xs text-on-surface-variant">
              <div className="flex items-center -space-x-2">
                <Avatar name="Marcus Vance" size="sm" ring />
                <Avatar name="Talia Cloud" size="sm" ring />
                <Avatar name="Kenji Sato" size="sm" ring />
                <div className="w-7 h-7 rounded-full bg-primary-fixed border-2 border-surface text-on-primary-fixed flex items-center justify-center font-bold text-[10px]">
                  +18
                </div>
              </div>
              <span className="font-medium">Collaborating now</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
