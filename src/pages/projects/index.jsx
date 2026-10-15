import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Brush, Bug, CloudCog, Code2, Cpu, Globe, Layers, Terminal } from "lucide-react";
import ProjectsHero from "../../components/pages/projects/ProjectsHero";
import StatsBento from "../../components/pages/projects/StatsBento";
import ProjectFilters from "../../components/pages/projects/ProjectFilters";
import ProjectCard from "../../components/pages/projects/ProjectCard";
import VerificationCallout from "../../components/pages/projects/VerificationCallout";
import ProjectLibrarySection from "../../components/pages/projects/library/ProjectLibrarySection";
import ApplyModal from "../../components/pages/projects/ApplyModal";
import CreateProjectModal from "../../components/pages/projects/CreateProjectModal";
import Toast from "../../components/ui/toast";
import { api } from "../../lib/api";

// Backend stores roles as plain text, so pick an icon from keywords in the role name.
const ROLE_ICON_RULES = [
  [/devops|cloud|infra/i, CloudCog],
  [/design|ui\/ux|css|tailwind/i, Brush],
  [/qa|test|bug/i, Bug],
  [/ebpf|systems|rust|go /i, Cpu],
  [/full ?stack/i, Layers],
  [/react|frontend|front-end|ui/i, Globe],
  [/backend|node|api|engineer/i, Terminal],
];
const roleIcon = (role = "") => ROLE_ICON_RULES.find(([re]) => re.test(role))?.[1] || Code2;

const normalizeProject = (p) => ({
  ...p,
  id: p._id || p.id,
  techStack: p.techStack || [],
  members: p.members || [],
  openPositions: (p.openPositions || []).map((pos) => ({ ...pos, icon: roleIcon(pos.role) })),
  cta: p.isOwnTeam ? "workspace" : "apply",
});

const EMPTY_FILTERS = { tech: "", difficulty: "", stage: "", role: "" };

export default function ProjectsPage() {
  const [projectList, setProjectList] = useState([]);
  const [projectStats, setProjectStats] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [reloadKey, setReloadKey] = useState(0);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [view, setView] = useState("grid");
  const [showMyTeams, setShowMyTeams] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [applyingProject, setApplyingProject] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const toastTimer = useRef(null);

  const notify = (message) => {
    setToastMessage(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), 2400);
  };

  // Backend is the single source of truth: no mock projects are mixed in.
  useEffect(() => {
    let mounted = true;
    Promise.all([api.get("/projects"), api.get("/projects/stats")])
      .then(([list, stats]) => {
        if (!mounted) return;
        setProjectList((list?.projects || []).map(normalizeProject));
        setProjectStats(stats?.stats || []);
        setStatus("ready");
      })
      .catch(() => mounted && setStatus("error"));
    return () => { mounted = false; };
  }, [reloadKey]);

  const reload = () => {
    setStatus("loading");
    setReloadKey((k) => k + 1);
  };

  const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
  const clearAll = () => {
    setSearch("");
    setFilters(EMPTY_FILTERS);
    setShowMyTeams(false);
  };

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return projectList.filter((p) => {
      if (showMyTeams && !p.isOwnTeam) return false;
      const techStack = p.techStack || [];
      if (filters.tech && !techStack.includes(filters.tech)) return false;
      if (filters.difficulty && p.difficulty !== filters.difficulty) return false;
      const stage = p.status?.stage || p.status?.label;
      if (filters.stage && stage !== filters.stage) return false;
      const positions = p.openPositions || [];
      if (filters.role && !positions.some((r) => r.role.toLowerCase().includes(filters.role.toLowerCase()))) {
        return false;
      }
      if (!term) return true;
      const haystack = `${p.title} ${p.description} ${techStack.join(" ")}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [projectList, search, filters, showMyTeams]);

  const myTeamsCount = projectList.filter((p) => p.isOwnTeam).length;

  const handleApplySubmit = async (proj, role, message) => {
    if (!localStorage.getItem("devsphere_token")) {
      notify("Please sign in to apply to a project");
      return;
    }
    try {
      await api.post(`/projects/${proj._id || proj.id}/apply`, { role, message });
      notify(`Application for ${role} submitted to "${proj.title}"!`);
    } catch (err) {
      notify(err?.data?.error || err?.message || "Failed to submit application");
    }
  };

  // Re-fetch so the new project comes back fully shaped (populated lead, isOwnTeam, stats).
  const handleProjectCreated = (newProj) => {
    notify(`Project "${newProj.title}" created successfully!`);
    reload();
  };

  return (
    <div className="max-w-[88rem] mx-auto flex flex-col gap-xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col gap-lg"
      >
        <ProjectsHero
          myTeamsCount={myTeamsCount}
          showingMyTeams={showMyTeams}
          onToggleMyTeams={() => setShowMyTeams((v) => !v)}
          onCreateProject={() => setCreateOpen(true)}
        />
        {projectStats.length > 0 && <StatsBento stats={projectStats} />}
      </motion.div>

      <ProjectFilters
        search={search}
        onSearchChange={setSearch}
        filters={filters}
        onFilterChange={updateFilter}
        onClearAll={clearAll}
        filteredCount={filtered.length}
        totalCount={projectList.length}
        view={view}
        onViewChange={setView}
      />

      {status === "loading" ? (
        <div className="text-center py-2xl text-on-surface-variant text-sm">Loading projects…</div>
      ) : status === "error" ? (
        <div className="text-center py-2xl">
          <p className="text-on-surface font-display text-lg font-semibold">Couldn't load projects</p>
          <p className="text-on-surface-variant text-sm mt-1">Check that the backend is running, then try again.</p>
          <button type="button" onClick={reload} className="mt-md px-md py-xs rounded-lg bg-primary text-on-primary text-sm font-semibold">Retry</button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-2xl">
          <p className="text-on-surface font-display text-lg font-semibold">
            {projectList.length === 0 ? "No projects yet" : "No projects match those filters"}
          </p>
          <p className="text-on-surface-variant text-sm mt-1">
            {projectList.length === 0
              ? "Publish the first one, or run node seedProjects.js in the backend for the starter set."
              : "Try clearing a filter or searching a different term."}
          </p>
        </div>
      ) : (
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg"
              : "flex flex-col gap-md"
          }
        >
          {filtered.map((project, i) => (
            <ProjectCard
              key={project._id || project.id || i}
              project={project}
              index={i}
              onApply={(p) => setApplyingProject(p)}
              onOpenWorkspace={(p) => notify(`Opening workspace for "${p.title}"`)}
            />
          ))}
        </div>
      )}

      <VerificationCallout
        onReadPlaybook={() => notify("Opening the verification playbook")}
        onSubmit={() => notify("Submitted for verification review")}
      />

      <div className="border-t border-outline-variant/60 pt-xl">
        <ProjectLibrarySection onNotify={notify} />
      </div>

      <ApplyModal
        project={applyingProject}
        onClose={() => setApplyingProject(null)}
        onSubmitSuccess={handleApplySubmit}
      />

      <CreateProjectModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={handleProjectCreated}
      />

      <Toast message={toastMessage} />
    </div>
  );
}