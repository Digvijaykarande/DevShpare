import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Library, Sparkles, Tags } from "lucide-react";
import ResourcesHero from "../../components/pages/resources/ResourcesHero";
import ResourceFilters from "../../components/pages/resources/ResourceFilters";
import ResourceCard from "../../components/pages/resources/ResourceCard";
import ResourceModal from "../../components/pages/resources/ResourceModal";
import Toast from "../../components/ui/toast";
import { api } from "../../lib/api";
import { resolveIcon } from "./data/resourcesData";

const STAT_ICONS = [Library, Sparkles, Tags];

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [resourceStats, setResourceStats] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [reloadKey, setReloadKey] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [activeResource, setActiveResource] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimer = useRef(null);

  const notify = (message) => {
    setToastMessage(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), 2200);
  };

  // Backend is the single source of truth: no mock data is mixed in.
  useEffect(() => {
    let mounted = true;
    setStatus("loading");

    Promise.all([api.get("/resources"), api.get("/resources/stats")])
      .then(([list, stats]) => {
        if (!mounted) return;
        setResources(
          (list?.resources || []).map((r) => ({
            ...r,
            id: r._id || r.id,
            icon: resolveIcon(r.iconName),
            tags: r.tags || [],
          }))
        );
        setResourceStats(stats?.stats || []);
        setStatus("ready");
      })
      .catch(() => mounted && setStatus("error"));

    return () => { mounted = false; };
  }, [reloadKey]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return resources.filter((r) => {
      if (category && r.category !== category) return false;
      if (!term) return true;
      const haystack = `${r.title} ${r.provider} ${r.summary} ${(r.tags || []).join(" ")}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [resources, search, category]);

  return (
    <div className="max-w-[88rem] mx-auto flex flex-col gap-xl">
      <ResourcesHero search={search} onSearchChange={setSearch} />

      <div className="grid grid-cols-3 gap-md -mt-14 relative z-10 px-1 min-h-[4.5rem]">
        {resourceStats.map((stat, i) => {
          const Icon = STAT_ICONS[i % STAT_ICONS.length];
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 + i * 0.06 }}
              whileHover={{ y: -3 }}
              className="flex items-center gap-sm p-md rounded-2xl bg-surface-container-lowest border border-outline-variant/50 shadow-[0_10px_30px_-16px_rgba(19,27,46,0.25)]"
            >
              <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-4.5 h-4.5 text-primary" />
              </span>
              <div className="min-w-0">
                <div className="font-display text-lg font-bold text-on-surface leading-none">{stat.value}</div>
                <div className="text-xs text-on-surface-variant mt-1 truncate">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <ResourceFilters
        active={category}
        onChange={setCategory}
        filteredCount={filtered.length}
        totalCount={resources.length}
      />

      {status === "loading" ? (
        <div className="text-center py-2xl text-on-surface-variant text-sm">Loading resources…</div>
      ) : status === "error" ? (
        <div className="text-center py-2xl">
          <p className="text-on-surface font-display text-lg font-semibold">Couldn't load resources</p>
          <p className="text-on-surface-variant text-sm mt-1">Check that the backend is running, then try again.</p>
          <button type="button" onClick={() => setReloadKey((k) => k + 1)} className="mt-md px-md py-xs rounded-lg bg-primary text-on-primary text-sm font-semibold">Retry</button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-2xl">
          <p className="text-on-surface font-display text-lg font-semibold">
            {resources.length === 0 ? "No resources yet" : "No resources match those filters"}
          </p>
          <p className="text-on-surface-variant text-sm mt-1">
            {resources.length === 0 ? "Run node seedResources.js in the backend to add the starter set." : "Try a different search term or category."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-lg">
          {filtered.map((resource, i) => (
            <ResourceCard key={resource._id || resource.id || i} resource={resource} index={i} onOpen={setActiveResource} />
          ))}
        </div>
      )}

      <ResourceModal resource={activeResource} onClose={() => setActiveResource(null)} onNotify={notify} />
      <Toast message={toastMessage} />
    </div>
  );
}