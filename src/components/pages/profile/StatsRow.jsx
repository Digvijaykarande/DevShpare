import { useEffect, useRef } from "react";
import { animate, motion } from "framer-motion";
import { Code2, FolderKanban, HelpCircle, Users } from "lucide-react";

function CountUp({ to }) {
  const ref = useRef(null);
  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v); },
    });
    return () => controls.stop();
  }, [to]);
  return <span ref={ref} className="tabular-nums">0</span>;
}

const TILES = [
  { key: "questions", label: "Questions", icon: HelpCircle, from: "from-indigo-500/15", text: "text-indigo-600 dark:text-indigo-300" },
  { key: "solved", label: "Problems solved", icon: Code2, from: "from-emerald-500/15", text: "text-emerald-600 dark:text-emerald-300" },
  { key: "projects", label: "Projects", icon: FolderKanban, from: "from-sky-500/15", text: "text-sky-600 dark:text-sky-300" },
  { key: "sessions", label: "Mentor sessions", icon: Users, from: "from-fuchsia-500/15", text: "text-fuchsia-600 dark:text-fuchsia-300" },
];

export default function StatsRow({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {TILES.map((t, i) => {
        const Icon = t.icon;
        return (
          <motion.div
            key={t.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className={`group relative overflow-hidden rounded-2xl border border-outline-variant/40 bg-gradient-to-br ${t.from} to-transparent bg-surface-container-lowest p-4 shadow-xs transition-shadow hover:shadow-lg`}
          >
            <Icon className={`absolute -right-2 -top-2 h-16 w-16 rotate-12 opacity-[0.08] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110 ${t.text}`} />
            <div className={`grid h-9 w-9 place-items-center rounded-xl bg-surface-container-lowest shadow-xs ${t.text}`}>
              <Icon className="h-[18px] w-[18px]" />
            </div>
            <p className="mt-3 font-display text-3xl font-bold tracking-tight text-on-surface"><CountUp to={stats[t.key] ?? 0} /></p>
            <p className="text-xs font-medium text-on-surface-variant">{t.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
