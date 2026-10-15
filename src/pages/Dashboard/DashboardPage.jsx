import { useEffect, useState } from "react";
import WelcomeBanner from "../../components/pages/dashboard/WelcomeBanner";
import KpiSection from "../../components/pages/dashboard/KpiSection";
import ContinueLearningCard from "../../components/pages/dashboard/ContinueLearningCard";
import ActiveProjectsSection from "../../components/pages/dashboard/ActiveProjectsSection";
import RecommendedSection from "../../components/pages/dashboard/RecommendedSection";
import WeeklyGoalWidget from "../../components/pages/dashboard/WeeklyGoalWidget";
import ActivityStream from "../../components/pages/dashboard/ActivityStream";
import UpcomingEvents from "../../components/pages/dashboard/UpcomingEvents";
import { api } from "../../lib/api";
import { Code2, MessageSquare, UserPlus } from "lucide-react";
import {
  currentUser as staticUser,
  quickActions,
  kpis as staticKpis,
  activeRoadmap,
  projects as staticProjects,
  recommendations,
  weeklyGoal,
  activityItems as staticActivity,
  newBadge,
  upcomingEventsMeta,
  events,
} from "../../components/pages/dashboard/dashboardData";

const activityPresentation = {
  solved: { icon: Code2, iconBg: "bg-sky-50 border-sky-100", iconColor: "text-sky-600" },
  question: { icon: MessageSquare, iconBg: "bg-emerald-50 border-emerald-100", iconColor: "text-emerald-600" },
  project: { icon: UserPlus, iconBg: "bg-violet-50 border-violet-100", iconColor: "text-violet-600" },
};

// Map backend stats to the KPI format the dashboard expects
function buildKpis(stats, defaultKpis) {
  if (!stats) return defaultKpis;
  return defaultKpis.map((kpi) => {
    switch (kpi.id) {
      case "problems-solved":
        return {
          ...kpi,
          value: String(stats.solved ?? kpi.value),
          progress: kpi.progress ? { ...kpi.progress, percent: Math.min(100, Math.round(((stats.solved ?? 0) / 200) * 100)) } : kpi.progress,
        };
      case "active-projects":
        return { ...kpi, value: String(stats.projects ?? kpi.value) };
      case "reputation-score":
        return { ...kpi, value: String(stats.questions ?? kpi.value) };
      default:
        return kpi;
    }
  });
}

// NOTE: This page assumes it renders inside your existing layout shell
// (the one that already places the fixed sidebar + header and reserves
// `pl-64` / `pt-16` space for them). Only the scrollable <main> content
// lives here.
export default function DashboardPage() {
  const [user, setUser] = useState(staticUser);
  const [kpis, setKpis] = useState(staticKpis);
  const [projects, setProjects] = useState(staticProjects);
  const [activityItems, setActivityItems] = useState(staticActivity);

  // Hydrate dashboard from backend when signed in
  useEffect(() => {
    if (!localStorage.getItem("devsphere_token")) return;
    let mounted = true;

    api.get("/me/overview")
      .then((data) => {
        if (!mounted) return;
        if (data?.profile) {
          setUser((prev) => ({
            ...prev,
            name: data.profile.name ?? prev.name,
            username: data.profile.username ?? prev.username,
            avatar: data.profile.avatar ?? prev.avatar,
            role: data.profile.role ?? prev.role,
          }));
        }
        if (data?.stats) {
          setKpis((prev) => buildKpis(data.stats, prev));
        }
        if (data?.projects?.length) {
          // Map backend project format to dashboard card format
          const mapped = data.projects.map((p) => ({
            id: p.id || p._id,
            title: p.title,
            description: p.description || "",
            stage: p.stage || "In progress",
            percent: p.percent ?? 0,
            tech: p.tech || [],
            role: p.role || "Member",
          }));
          setProjects(mapped);
        }
        if (data?.activity?.length) {
          setActivityItems(data.activity.map((a) => {
            const type = a.text?.toLowerCase().includes("solved") ? "solved" : a.text?.toLowerCase().includes("question") ? "question" : "project";
            const presentation = activityPresentation[type];
            return {
              id: a.id,
              type,
              ...presentation,
              prefix: `${a.text || "Activity"}${a.target ? ": " : ""}`,
              highlight: a.target || "",
              highlightColor: "text-slate-900 font-medium",
              time: a.time || "Recently",
            };
          }));
        }
      })
      .catch(() => {}); // silently use static data if offline/unauthenticated

    return () => { mounted = false; };
  }, []);

  return (
    <main className="w-full bg-[#F8FAFC] px-8 py-8 min-h-screen">
      <div className="flex flex-col w-full gap-6 max-w-7xl mx-auto">
        <WelcomeBanner user={user} actions={quickActions} />

        <KpiSection kpis={kpis} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left column: primary workstreams */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <ContinueLearningCard roadmap={activeRoadmap} />
            <ActiveProjectsSection projects={projects} />
            <RecommendedSection items={recommendations} />
          </div>

          {/* Right column: feeds, activity, goals, events */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <WeeklyGoalWidget goal={weeklyGoal} />
            <ActivityStream items={activityItems} badge={newBadge} />
            <UpcomingEvents events={events} registeredLabel={upcomingEventsMeta.registeredLabel} />
          </div>
        </div>
      </div>
    </main>
  );
}
