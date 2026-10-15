import { useEffect, useMemo, useState } from "react";
import { Plus, Search, FolderGit2 } from "lucide-react";
import { Button } from "../../../ui/button";
import { cn } from "../../../../utils/cn";
import { api } from "../../../../lib/api";
import { LANGUAGE_META } from "../../../../pages/projects/data/projectLibraryData";
import LibraryProjectCard from "./LibraryProjectCard";
import ProjectPreviewModal from "./ProjectPreviewModal";
import AddProjectModal from "./AddProjectModal";

const normalizeItem = (item) => ({
  ...item,
  id: item._id || item.id,
  tags: item.tags || [],
  stars: item.stars || 0,
  sizeKb: item.sizeKb || 14,
  updatedAt: item.updatedAt || item.createdAt,
  author: typeof item.author === "object" ? item.author?.name || "DevSphere User" : item.author || "DevSphere User",
  custom: !!item.isMine,
});

/** Triggers a real browser download of a small text file summarizing the
 *  project — used for user-added projects that don't have a repo link yet. */
function downloadProjectSummary(project) {
  const lines = [
    `# ${project.title}`,
    "",
    `Language: ${project.language}`,
    `Tags: ${(project.tags || []).join(", ") || "—"}`,
    `Author: ${typeof project.author === "object" ? project.author?.name : project.author || "DevSphere User"}`,
    "",
    project.description,
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${project.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function ProjectLibrarySection({ onNotify }) {
  const [allProjects, setAllProjects] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [reloadKey, setReloadKey] = useState(0);
  const [query, setQuery] = useState("");
  const [activeLanguage, setActiveLanguage] = useState("All");
  const [previewProject, setPreviewProject] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  // Backend is the single source of truth: no seed or localStorage items are mixed in.
  useEffect(() => {
    let mounted = true;
    api.get("/library")
      .then((data) => {
        if (!mounted) return;
        setAllProjects((data?.items || []).map(normalizeItem));
        setStatus("ready");
      })
      .catch(() => mounted && setStatus("error"));
    return () => { mounted = false; };
  }, [reloadKey]);

  const languageCounts = useMemo(() => {
    const counts = {};
    allProjects.forEach((p) => {
      counts[p.language] = (counts[p.language] ?? 0) + 1;
    });
    return counts;
  }, [allProjects]);

  const languages = useMemo(
    () => Object.keys(languageCounts).sort((a, b) => languageCounts[b] - languageCounts[a]),
    [languageCounts]
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return allProjects.filter((p) => {
      if (activeLanguage !== "All" && p.language !== activeLanguage) return false;
      if (!term) return true;
      const haystack = `${p.title} ${p.description} ${(p.tags || []).join(" ")}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [allProjects, query, activeLanguage]);

  const handleAdd = async (project) => {
    if (!localStorage.getItem("devsphere_token")) {
      onNotify?.("Please sign in to add a project to the library");
      return;
    }
    try {
      await api.post("/library", {
        title: project.title,
        language: project.language,
        description: project.description,
        tags: project.tags,
        repoUrl: project.downloadUrl || null,
      });
      setAddOpen(false);
      setReloadKey((k) => k + 1);
      onNotify?.(`"${project.title}" added to the library`);
    } catch (err) {
      onNotify?.(err?.data?.error || err?.message || "Couldn't add the project");
    }
  };

  const handleDownload = (project) => {
    if (project.downloadUrl) {
      window.open(project.downloadUrl, "_blank", "noopener,noreferrer");
      onNotify?.(`Downloading "${project.title}"...`);
    } else {
      downloadProjectSummary(project);
      onNotify?.(`Downloaded a project summary for "${project.title}"`);
    }
  };

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div className="flex flex-col max-w-[42rem]">
          <div className="flex items-center gap-xs text-primary text-xs font-semibold uppercase tracking-wider mb-1">
            <FolderGit2 className="w-3.5 h-3.5" />
            Multi-Language Project Library
          </div>
          <h2 className="font-display text-xl lg:text-2xl font-semibold tracking-tight text-on-surface">
            Browse, download & share ready-made projects
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">
            A separate showcase from the team board above — view any project's details, download it straight to your
            machine, or upload your own for others to grab.
          </p>
        </div>

        <Button variant="primary" size="default" type="button" className="shrink-0 self-start md:self-auto" onClick={() => setAddOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      <div className="bg-surface-container-lowest rounded-lg p-md shadow-sm flex flex-col gap-md">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-outline pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the library by name, tag, or description..."
            className="w-full pl-10 pr-md py-sm bg-surface-container-low rounded-lg text-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveLanguage("All")}
            className={cn(
              "px-2.5 py-1 rounded-md text-xs font-semibold transition-colors",
              activeLanguage === "All"
                ? "bg-surface-container-low border border-outline-variant/60 text-on-surface"
                : "text-on-surface-variant hover:bg-surface-container-low font-medium"
            )}
          >
            All ({allProjects.length})
          </button>
          {languages.map((lang) => {
            const color = LANGUAGE_META[lang]?.color ?? LANGUAGE_META.Other.color;
            const isActive = activeLanguage === lang;
            return (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveLanguage(lang)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors",
                  isActive
                    ? "bg-surface-container-low border border-outline-variant/60 text-on-surface"
                    : "text-on-surface-variant hover:bg-surface-container-low font-medium"
                )}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                {lang} ({languageCounts[lang]})
              </button>
            );
          })}
        </div>
      </div>

      {status === "loading" ? (
        <div className="text-center py-2xl text-on-surface-variant text-sm">Loading library…</div>
      ) : status === "error" ? (
        <div className="text-center py-2xl">
          <p className="text-on-surface font-display text-lg font-semibold">Couldn't load the library</p>
          <p className="text-on-surface-variant text-sm mt-1">Check that the backend is running, then try again.</p>
          <button type="button" onClick={() => { setStatus("loading"); setReloadKey((k) => k + 1); }} className="mt-md px-md py-xs rounded-lg bg-primary text-on-primary text-sm font-semibold">Retry</button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-2xl">
          <p className="text-on-surface font-display text-lg font-semibold">
            {allProjects.length === 0 ? "The library is empty" : "No projects match those filters"}
          </p>
          <p className="text-on-surface-variant text-sm mt-1">
            {allProjects.length === 0 ? "Add the first project, or run node seedProjects.js for the starter set." : "Try a different language or search term."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
          {filtered.map((project, i) => (
            <LibraryProjectCard
              key={project.id}
              project={project}
              index={i}
              onView={setPreviewProject}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}

      <ProjectPreviewModal project={previewProject} onClose={() => setPreviewProject(null)} onDownload={handleDownload} />
      <AddProjectModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />
    </div>
  );
}