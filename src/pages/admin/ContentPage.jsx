import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle, ArrowUpRight, CheckCircle2, ChevronRight, Code2, Flame, GraduationCap, 
  HelpCircle, Library, ListChecks, Newspaper, Route, Terminal, Eye, TrendingUp, Sparkles, Layers, Clock
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { buttonVariants } from "../../components/ui/button";
import { cn } from "../../utils/cn";
import { FilterTabs, PageHeader, SearchBox, StatusBadge } from "../../components/admin/AdminUI";
import { NEWS, PROJECTS, QUESTIONS, RESOURCES, ROADMAPS, SESSION_REQUESTS } from "./data/adminData";

const BASE_SECTIONS = [
  { label: "Roadmaps",   to: "/admin/roadmaps",   icon: Route,        group: "Learning",  hint: "Learning paths", count: 28,   published: 22,   review: 0,  draft: 6,  trend: [0, 1, 0, 0, 1, 0, 0] },
  { label: "Coding",     to: "/admin/coding",     icon: Terminal,     group: "Learning",  hint: "Problems & competitions", count: 532,  published: 498,  review: 14, draft: 20, trend: [2, 3, 1, 4, 2, 3, 2] },
  { label: "Resources",  to: "/admin/resources",  icon: Library,      group: "Learning",  hint: "Articles, videos, tools", count: 186,  published: 161,  review: 9,  draft: 16, trend: [1, 1, 2, 0, 1, 2, 1] },
  { label: "Questions",  to: "/admin/questions",  icon: HelpCircle,   group: "Community", hint: "Community Q&A", count: 1284, published: 1210, review: 62, draft: 12, trend: [11, 14, 13, 16, 12, 17, 13] },
  { label: "Projects",   to: "/admin/projects",   icon: Code2,        group: "Community", hint: "User projects & ideas", count: 623,  published: 571,  review: 34, draft: 18, trend: [10, 12, 13, 11, 14, 13, 14] },
  { label: "Mentorship", to: "/admin/mentorship", icon: GraduationCap, group: "Community", hint: "Mentors & sessions", count: 42,   published: 36,   review: 4,  draft: 2,  trend: [0, 1, 0, 1, 0, 0, 1] },
  { label: "News",       to: "/admin/news",       icon: Newspaper,    group: "Updates",   hint: "Tech news & updates", count: 128,  published: 109,  review: 3,  draft: 16, trend: [1, 2, 1, 2, 2, 1, 2] },
];

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const ramp = (i, n, from = "#4f46e5", to = "#0ea5e9") => {
  const a = hex(from), b = hex(to), t = i / (n - 1);
  return "#" + a.map((v, k) => Math.round(v + (b[k] - v) * t).toString(16).padStart(2, "0")).join("");
};
const SECTIONS = BASE_SECTIONS.map((s, i, all) => ({ ...s, color: ramp(i, all.length) }));
const GROUPS = ["All", "Learning", "Community", "Updates"];
const sum = (a) => a.reduce((x, y) => x + y, 0);
const viewsToNumber = (v) => (String(v).toUpperCase().endsWith("K") ? parseFloat(v) * 1000 : parseFloat(v)) || 0;

function buildAttention() {
  const rows = [];
  QUESTIONS.filter((q) => q.status === "Reported" || q.status === "Pending")
    .forEach((q) => rows.push({ key: `q${q.id}`, title: q.title, meta: `Question by ${q.askedBy}`, status: q.status, to: "/admin/questions" }));
  PROJECTS.filter((p) => p.status === "Pending")
    .forEach((p) => rows.push({ key: `p${p.id}`, title: p.title, meta: `Project by ${p.author}`, status: p.status, to: "/admin/projects" }));
  SESSION_REQUESTS.filter((s) => s.status === "Pending")
    .forEach((s) => rows.push({ key: `s${s.id}`, title: s.topic, meta: `${s.student} asked ${s.mentor}`, status: s.status, to: "/admin/mentorship" }));
  NEWS.filter((n) => n.status === "Draft")
    .forEach((n) => rows.push({ key: `n${n.id}`, title: n.title, meta: `News in ${n.category}`, status: n.status, to: "/admin/news" }));
  ROADMAPS.filter((r) => r.status === "Draft")
    .forEach((r) => rows.push({ key: `r${r.id}`, title: r.title, meta: `Roadmap in ${r.category}`, status: r.status, to: "/admin/roadmaps" }));
  RESOURCES.filter((r) => r.status === "Draft")
    .forEach((r) => rows.push({ key: `rs${r.id}`, title: r.title, meta: `${r.type} resource`, status: r.status, to: "/admin/resources" }));
  const order = { Reported: 0, Pending: 1, Draft: 2 };
  return rows.sort((a, b) => order[a.status] - order[b.status]);
}

function buildTrending() {
  const tag = (list, type, to) => list.filter((i) => i.status === "Published").map((i) => ({ key: `${type}${i.id}`, title: i.title, type, to, views: i.views, n: viewsToNumber(i.views) }));
  return [...tag(NEWS, "News", "/admin/news"), ...tag(ROADMAPS, "Roadmap", "/admin/roadmaps"), ...tag(PROJECTS, "Project", "/admin/projects"), ...tag(RESOURCES, "Resource", "/admin/resources")]
    .sort((a, b) => b.n - a.n).slice(0, 5);
}

function Spark({ data, color }) {
  const W = 76, H = 22, max = Math.max(...data, 1);
  const pts = data.map((v, i) => [(i * (W - 6)) / (data.length - 1) + 3, H - 3 - (v / max) * (H - 6)]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} aria-hidden="true" className="overflow-visible">
      <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContentPage() {
  const [group, setGroup] = useState("All");
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("attention");

  const totals = useMemo(() => ({
    all: sum(SECTIONS.map((s) => s.count)),
    published: sum(SECTIONS.map((s) => s.published)),
    review: sum(SECTIONS.map((s) => s.review)),
    draft: sum(SECTIONS.map((s) => s.draft)),
    week: sum(SECTIONS.map((s) => sum(s.trend))),
  }), []);

  const attention = useMemo(buildAttention, []);
  const trending = useMemo(buildTrending, []);
  const topViews = trending[0]?.n || 1;

  const q = query.trim().toLowerCase();
  const visible = SECTIONS.filter((s) => (group === "All" || s.group === group) && (!q || `${s.label} ${s.hint}`.toLowerCase().includes(q)));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8 pb-20 max-w-[1400px] mx-auto px-4 sm:px-6"
    >
      {/* Hero Banner */}
      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-950 p-8 sm:p-10 rounded-[2.5rem] text-white shadow-xl overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Admin Command Center
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Content Management</h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Monitor library sections, review pending submissions, and audit platform traffic seamlessly.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 shrink-0">
          <Link to="/admin/questions" className={cn(buttonVariants({ variant: "default" }), "bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-12 px-6 rounded-2xl shadow-lg transition-all")}>
            <ListChecks className="w-4 h-4 mr-2" /> Review Queue
            <span className="ml-2.5 px-2.5 py-0.5 rounded-lg bg-white/20 text-xs font-black tabular-nums">{totals.review}</span>
          </Link>
        </div>
      </div>

      {/* Top Bento Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total Library", val: totals.all.toLocaleString(), icon: Layers, color: "text-indigo-500", bg: "bg-indigo-500/10" },
          { label: "Published Items", val: totals.published.toLocaleString(), icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Pending Review", val: totals.review.toLocaleString(), icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "7-Day Growth", val: `+${totals.week}`, icon: TrendingUp, color: "text-sky-500", bg: "bg-sky-500/10" },
        ].map((item) => (
          <div key={item.label} className="relative p-6 bg-card/80 backdrop-blur-xl border border-border/80 shadow-xs hover:shadow-lg transition-all duration-300 rounded-[2rem] flex items-center justify-between group overflow-hidden">
            <div className="space-y-1 relative z-10">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{item.label}</p>
              <p className="text-3xl font-black tracking-tight text-foreground">{item.val}</p>
            </div>
            <div className={cn("relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 shadow-sm", item.bg, item.color)}>
              <item.icon className="w-7 h-7" />
            </div>
          </div>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-muted/50 border border-border/80 rounded-[2rem] backdrop-blur-md">
        <FilterTabs tabs={GROUPS} value={group} onChange={setGroup} />
        <SearchBox value={query} onChange={setQuery} placeholder="Search sections..." className="w-full sm:w-72" />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Section Cards Grid (2 cols) - Removed Black Border, Added Sleek Glow */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <AnimatePresence>
            {visible.map((s, index) => {
              const Icon = s.icon;
              const weekSum = sum(s.trend);
              return (
                <motion.div
                  key={s.label}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                >
                  <Link to={s.to} className="group block h-full">
                    <div className="h-full p-7 bg-card border border-border/80 hover:border-primary/50 shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2.2rem] flex flex-col justify-between relative overflow-hidden">
                      {/* Subtle Colored Top Gradient Glow (Replaced Black Line) */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 opacity-80 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
                               style={{ background: `${s.color}15`, color: s.color }}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-muted border border-border/60 text-muted-foreground uppercase tracking-wider">
                            {s.group}
                          </span>
                        </div>

                        <h3 className="text-xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                          {s.label}
                          <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">{s.hint}</p>
                      </div>

                      <div className="mt-8 pt-5 border-t border-border/60 space-y-4">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-3xl font-black tabular-nums tracking-tight text-foreground">{s.count.toLocaleString()}</span>
                            <span className="text-xs font-medium text-muted-foreground ml-1">items</span>
                          </div>
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md tabular-nums">
                            +{weekSum} this wk
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                          <span>{s.published} Published</span>
                          {s.review > 0 ? (
                            <span className="text-amber-600 dark:text-amber-400 font-bold">{s.review} In Review</span>
                          ) : (
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">All clear</span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <Spark data={s.trend} color={s.color} />
                          <div className="w-9 h-9 rounded-xl bg-muted border border-border/70 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all shadow-xs">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {visible.length === 0 && (
            <div className="col-span-full py-16 text-center bg-card rounded-[2.2rem] border border-border/80 shadow-sm">
              <p className="text-sm font-semibold text-muted-foreground">No sections match "{query}".</p>
              <button type="button" onClick={() => { setQuery(""); setGroup("All"); }} className="mt-2 text-xs font-bold text-primary hover:underline">
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Right Sidebar Widget Card */}
        <div className="p-6 sm:p-7 bg-card/90 backdrop-blur-xl border border-border/80 shadow-sm rounded-[2.2rem] space-y-6">
          <div className="flex items-center justify-between p-1.5 bg-muted rounded-2xl border border-border/60 shadow-inner">
            <button 
              type="button" 
              onClick={() => setActiveTab("attention")}
              className={cn("flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all", activeTab === "attention" ? "bg-background text-foreground shadow-sm border border-border/60" : "text-muted-foreground hover:text-foreground")}
            >
              Attention ({attention.length})
            </button>
            <button 
              type="button" 
              onClick={() => setActiveTab("trending")}
              className={cn("flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all", activeTab === "trending" ? "bg-background text-foreground shadow-sm border border-border/60" : "text-muted-foreground hover:text-foreground")}
            >
              Trending Views
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "attention" ? (
              <motion.div key="att" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                <p className="text-xs text-muted-foreground font-medium px-1">Items requiring moderator intervention.</p>
                <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                  {attention.slice(0, 6).map((a) => (
                    <Link key={a.key} to={a.to}
                      className={cn("group flex items-center justify-between gap-3 p-3.5 rounded-2xl border border-border/70 bg-background/60 hover:bg-muted/60 transition-all shadow-2xs hover:border-primary/40",
                        a.status === "Reported" ? "border-l-4 border-l-rose-500" : a.status === "Pending" ? "border-l-4 border-l-amber-500" : "border-l-4 border-l-slate-400")}>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate text-foreground group-hover:text-primary transition-colors">{a.title}</p>
                        <p className="text-[11px] text-muted-foreground truncate mt-0.5">{a.meta}</p>
                      </div>
                      <StatusBadge value={a.status} className="shrink-0 scale-95" />
                    </Link>
                  ))}
                  {attention.length === 0 && (
                    <div className="py-16 text-center text-xs text-muted-foreground font-medium">All clear! No pending issues.</div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div key="trd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                <p className="text-xs text-muted-foreground font-medium px-1">Most viewed content across sections.</p>
                <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                  {trending.map((t) => (
                    <Link key={t.key} to={t.to} className="group block p-3.5 rounded-2xl border border-border/70 bg-background/60 hover:bg-muted/60 transition-all shadow-2xs hover:border-primary/40">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-bold truncate text-foreground group-hover:text-primary transition-colors">{t.title}</p>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground bg-muted border border-border/60 px-2 py-0.5 rounded-lg shrink-0">
                          <Eye className="w-3.5 h-3.5 text-primary" />{t.views}
                        </span>
                      </div>
                      <div className="mt-2.5 flex items-center gap-3">
                        <div className="flex-1 h-1.5 rounded-full bg-muted border border-border/50 overflow-hidden shadow-inner">
                          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${(t.n / topViews) * 100}%` }} />
                        </div>
                        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider shrink-0">{t.type}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}