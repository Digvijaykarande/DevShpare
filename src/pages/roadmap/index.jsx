import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Compass, Flame, LibraryBig } from "lucide-react";
import RoadmapCard from "../../components/pages/roadmap/RoadmapCard";
import RoadmapExplainer from "../../components/pages/roadmap/RoadmapExplainer";
import RoadmapCallout from "../../components/pages/roadmap/RoadmapCallout";
import { api } from "../../lib/api";
import { resolveIcon } from "./icons";

// Small facts computed from the roadmaps themselves, so the intro never drifts out of sync with the cards.
function buildStats(roadmaps) {
  const totalTopics = roadmaps.reduce((sum, r) => sum + r.topicsTotal, 0);
  const inProgress = roadmaps.filter((r) => r.percent > 0).length;
  return [
    { icon: LibraryBig, label: "Roadmaps", value: roadmaps.length },
    { icon: Compass, label: "Topics across all paths", value: totalTopics },
    { icon: Flame, label: "Paths in progress", value: inProgress },
  ];
}

export default function RoadmapsList() {
  const [roadmapCatalog, setRoadmapCatalog] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [reloadKey, setReloadKey] = useState(0);

  // Backend is the single source of truth; progress is the signed-in user's own.
  useEffect(() => {
    let mounted = true;
    api.get("/roadmaps")
      .then((data) => {
        if (!mounted) return;
        setRoadmapCatalog((data?.roadmaps || []).map((r) => ({ ...r, icon: resolveIcon(r.iconName) })));
        setStatus("ready");
      })
      .catch(() => mounted && setStatus("error"));
    return () => { mounted = false; };
  }, [reloadKey]);

  const stats = buildStats(roadmapCatalog);

  return (
    <div className="max-w-[80rem] mx-auto">
      {/* Overview banner — gives context before anyone clicks a card. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mb-xl"
      >
        <span className="text-xs font-code font-semibold text-primary">Roadmaps</span>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-on-surface mt-1">
          Pick a subject, follow a proven path
        </h1>
        <p className="text-sm text-on-surface-variant mt-1.5 max-w-[36rem]">
          Staged, verifiable milestones for each subject — no more guessing what to learn next.
          Pick a card to see the full plan.
        </p>

        <div className="flex flex-wrap items-center gap-sm mt-lg">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center gap-sm px-md py-sm rounded-full bg-surface-container-lowest border border-outline-variant/60 shadow-[0_1px_2px_rgba(19,27,46,0.05)]"
              >
                <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                </span>
                <span className="font-display text-sm font-bold text-on-surface">{stat.value}</span>
                <span className="text-xs text-on-surface-variant">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      <RoadmapExplainer />

      {status === "loading" ? (
        <div className="text-center py-2xl text-on-surface-variant text-sm">Loading roadmaps…</div>
      ) : status === "error" ? (
        <div className="text-center py-2xl">
          <p className="text-on-surface font-display text-lg font-semibold">Couldn't load roadmaps</p>
          <p className="text-on-surface-variant text-sm mt-1">Check that the backend is running, then try again.</p>
          <button type="button" onClick={() => { setStatus("loading"); setReloadKey((k) => k + 1); }} className="mt-md px-md py-xs rounded-lg bg-primary text-on-primary text-sm font-semibold">Retry</button>
        </div>
      ) : roadmapCatalog.length === 0 ? (
        <div className="text-center py-2xl">
          <p className="text-on-surface font-display text-lg font-semibold">No roadmaps yet</p>
          <p className="text-on-surface-variant text-sm mt-1">Run node seedRoadmaps.js in the backend to add the starter roadmaps.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
          {roadmapCatalog.map((roadmap, i) => (
            <RoadmapCard key={roadmap.slug} roadmap={roadmap} index={i} />
          ))}
        </div>
      )}

      <RoadmapCallout />
    </div>
  );
}