import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Crown, ExternalLink, Flame, Link2, Rocket, Sparkles, Target } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import Toast from "../../components/ui/toast";
import ProfileHero from "../../components/pages/profile/ProfileHero";
import StatsRow from "../../components/pages/profile/StatsRow";
import ActivityHeatmap from "../../components/pages/profile/ActivityHeatmap";
import CodingStatsCard from "../../components/pages/profile/CodingStatsCard";
import EditProfileModal from "../../components/pages/profile/EditProfileModal";
import { api } from "../../lib/api";
import { saveProfile, useProfile } from "../../lib/userStore";
import { cn } from "../../utils/cn";

const ICONS = { crown: Crown, target: Target, flame: Flame, rocket: Rocket, award: Award };
const TONES = {
  amber: "from-amber-400/25 to-amber-500/5 text-amber-600 dark:text-amber-300",
  emerald: "from-emerald-400/25 to-emerald-500/5 text-emerald-600 dark:text-emerald-300",
  rose: "from-rose-400/25 to-rose-500/5 text-rose-600 dark:text-rose-300",
  sky: "from-sky-400/25 to-sky-500/5 text-sky-600 dark:text-sky-300",
};
const TABS = [
  { id: "overview", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "activity", label: "Activity" },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const rise = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } } };

function Card({ title, action, children, className }) {
  return (
    <motion.section variants={rise} className={cn("rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-xs sm:p-6", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-[13px] font-semibold uppercase tracking-wider text-on-surface">{title}</h3>
        {action}
      </div>
      {children}
    </motion.section>
  );
}

function ProjectCard({ project }) {
  return (
    <motion.article
      variants={rise}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-low/60 p-4 transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-lg"
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary-container via-violet-500 to-sky-400 transition-transform duration-500 group-hover:scale-x-100" />
      <div className="space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-display text-sm font-bold text-on-surface">{project.title}</h4>
          {project.role && <Badge variant="default">{project.role}</Badge>}
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-on-surface-variant">{project.description}</p>
      </div>
      {typeof project.percent === "number" && (
        <div className="mt-3">
          <div className="mb-1 flex justify-between text-[10px] font-medium text-on-surface-variant"><span>{project.stage || "In progress"}</span><span>{project.percent}%</span></div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-high">
            <motion.div initial={{ width: 0 }} animate={{ width: `${project.percent}%` }} transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }} className="h-full rounded-full bg-gradient-to-r from-primary-container to-sky-400" />
          </div>
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-1">
        {(project.tech || []).map((t) => <span key={t} className="rounded-md bg-surface-container px-2 py-0.5 text-[10px] font-medium text-on-surface-variant">{t}</span>)}
      </div>
    </motion.article>
  );
}

function ActivityList({ items }) {
  if (!items.length) return <p className="py-6 text-center text-sm text-on-surface-variant">No activity yet. Ask a question or solve a problem to get started.</p>;
  return (
    <ol className="relative ml-2 space-y-1 border-l border-outline-variant/50 pl-5">
      {items.map((item) => (
        <motion.li key={item.id} variants={rise} className="relative py-2">
          <span className="absolute -left-[27px] top-3.5 h-2.5 w-2.5 rounded-full bg-primary-container ring-4 ring-surface-container-lowest" />
          <p className="text-[13px] text-on-surface-variant">{item.text} <span className="font-semibold text-on-surface">{item.target}</span></p>
          <p className="text-[11px] text-outline">{item.time}</p>
        </motion.li>
      ))}
    </ol>
  );
}

export default function ProfilePage() {
  const [profile] = useProfile();
  const [tab, setTab] = useState("overview");
  const [editOpen, setEditOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [overview, setOverview] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error | signedout
  const [reloadKey, setReloadKey] = useState(0);

  // Everything on this page comes from the backend. No sample numbers are ever shown.
  // The browser's UTC offset is sent so the heatmap and streak use the user's own calendar days.
  useEffect(() => {
    if (!localStorage.getItem("devsphere_token")) {
      setStatus("signedout");
      return;
    }
    const ctrl = new AbortController();
    setStatus("loading");
    api.get(`/me/overview?tz=${new Date().getTimezoneOffset()}`, { signal: ctrl.signal })
      .then((data) => { setOverview(data); setStatus("ready"); })
      .catch((err) => { if (err?.name !== "AbortError") setStatus("error"); });
    return () => ctrl.abort();
  }, [reloadKey]);

  if (status === "signedout") {
    return (
      <div className="mx-auto max-w-md py-2xl text-center">
        <h1 className="font-display text-xl font-semibold text-on-surface">Sign in to see your profile</h1>
        <p className="mt-2 text-sm text-on-surface-variant">Your stats, coding progress and activity live in your account.</p>
        <Link to="/login" className="mt-md inline-block rounded-lg bg-primary px-md py-xs text-sm font-semibold text-on-primary">Sign in</Link>
      </div>
    );
  }

  if (status === "loading") {
    return <div className="py-2xl text-center text-sm text-on-surface-variant">Loading your profile…</div>;
  }

  if (status === "error" || !overview) {
    return (
      <div className="mx-auto max-w-md py-2xl text-center">
        <h1 className="font-display text-xl font-semibold text-on-surface">Couldn't load your profile</h1>
        <p className="mt-2 text-sm text-on-surface-variant">Check that the backend is running, then try again.</p>
        <button type="button" onClick={() => setReloadKey((k) => k + 1)} className="mt-md rounded-lg bg-primary px-md py-xs text-sm font-semibold text-on-primary">Retry</button>
      </div>
    );
  }

  const { stats, heatmap, projects, activity, coding, achievements } = overview;
  const techStack = profile.techStack ?? [];
  const learning = profile.currentlyLearning ?? [];
  const links = profile.socialLinks ?? [];

  const handleSave = async (values) => {
    await saveProfile(values); // throws on server error so the modal can show it
    setEditOpen(false);
    setToast("Profile updated");
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5 pb-16">
      <ProfileHero profile={profile} onEdit={() => setEditOpen(true)} />
      <StatsRow stats={stats} />

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[20rem_1fr]">
        {/* ---------- Left rail ---------- */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-5">
          <Card title="About">
            <p className="text-sm leading-relaxed text-on-surface-variant">{profile.bio || "No bio yet."}</p>
          </Card>

          {techStack.length > 0 && (
            <Card title="Tech Stack">
              <div className="space-y-4">
                {techStack.map((cat) => (
                  <div key={cat.name} className="space-y-2">
                    <span className="text-xs font-medium text-outline">{cat.name}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 400, damping: 20 }}
                          whileHover={{ y: -2, scale: 1.06 }}
                          className="cursor-default rounded-lg border border-outline-variant/40 bg-surface-container px-2.5 py-1 text-xs font-medium text-on-surface-variant transition-colors hover:border-primary/40 hover:bg-primary-fixed hover:text-primary"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {learning.length > 0 && (
            <Card title="Currently Learning" action={<Sparkles className="h-4 w-4 text-primary" />}>
              <div className="flex flex-wrap gap-1.5">
                {learning.map((topic) => (
                  <span key={topic} className="inline-flex items-center gap-1.5 rounded-lg bg-primary-fixed px-2.5 py-1 text-xs font-medium text-on-primary-fixed">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-container" />{topic}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {links.length > 0 && (
          <Card title="Links">
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.name}>
                  <a href={l.url} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-surface-container-low">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-surface-container text-on-surface-variant transition-colors group-hover:bg-primary-container group-hover:text-on-primary"><Link2 className="h-4 w-4" /></span>
                    <span className="min-w-0 flex-1"><span className="block text-[13px] font-medium text-on-surface">{l.name}</span><span className="block truncate text-[11px] text-outline">{l.handle}</span></span>
                    <ExternalLink className="h-3.5 w-3.5 text-outline opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </Card>
          )}
        </motion.div>

        {/* ---------- Right: tabs ---------- */}
        <div className="min-w-0">
          <div role="tablist" aria-label="Profile sections" className="mb-5 flex gap-1 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-1.5 shadow-xs">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn("relative flex-1 rounded-xl px-4 py-2 text-sm font-medium transition-colors", tab === t.id ? "text-on-primary" : "text-on-surface-variant hover:text-on-surface")}
              >
                {tab === t.id && <motion.span layoutId="profile-tab-pill" transition={{ type: "spring", stiffness: 500, damping: 36 }} className="absolute inset-0 rounded-xl bg-primary-container shadow-md" />}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} variants={stagger} initial="hidden" animate="show" exit={{ opacity: 0, y: -8, transition: { duration: 0.12 } }} className="flex flex-col gap-5">
              {tab === "overview" && (
                <>
                  <Card title="Coding" action={<Link to="/coding" className="text-xs font-semibold text-primary hover:underline">Open workspace</Link>}>
                    <CodingStatsCard coding={coding} />
                  </Card>
                  <Card title="Contribution Activity"><ActivityHeatmap data={heatmap} /></Card>
                  <Card title="Achievements">
                    {achievements.length === 0 && (
                      <p className="py-4 text-center text-sm text-on-surface-variant">Solve a problem, build a project or earn votes to unlock your first badge.</p>
                    )}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {achievements.map((a) => {
                        const Icon = ICONS[a.icon] ?? Award;
                        return (
                          <motion.div key={a.label} whileHover={{ y: -3, rotate: -0.6 }} className={cn("relative flex items-center gap-3 overflow-hidden rounded-2xl border border-outline-variant/40 bg-gradient-to-br p-3.5", TONES[a.tone] ?? TONES.amber)}>
                            <motion.span aria-hidden className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/30" animate={{ left: ["-60%", "160%"] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }} />
                            <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-container-lowest shadow-sm"><Icon className="h-5 w-5" /></span>
                            <span className="relative"><span className="block text-[13px] font-bold text-on-surface">{a.label}</span><span className="block text-[11px] text-on-surface-variant">{a.value}</span></span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </Card>
                  <Card title="Latest Activity"><ActivityList items={activity.slice(0, 4)} /></Card>
                </>
              )}
              {tab === "projects" && (
                <Card title={`Projects · ${projects.length}`}>
                  {projects.length === 0 ? (
                    <p className="py-6 text-center text-sm text-on-surface-variant">
                      No projects yet. <Link to="/projects" className="font-semibold text-primary hover:underline">Browse projects</Link> or publish your own.
                    </p>
                  ) : (
                    <motion.div variants={stagger} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
                    </motion.div>
                  )}
                </Card>
              )}
              {tab === "activity" && <Card title="Activity Feed"><ActivityList items={activity} /></Card>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <EditProfileModal open={editOpen} profile={profile} onClose={() => setEditOpen(false)} onSave={handleSave} />
      <Toast message={toast} />
    </div>
  );
}