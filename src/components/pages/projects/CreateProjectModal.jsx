import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X, Rocket, Code2, Users, Layers } from "lucide-react";
import { Button } from "../../ui/button";
import { api } from "../../../lib/api";

// Must match the stage enum in the backend Project model.
const STAGE_META = {
  Ideation: { variant: "default", percent: 10 },
  "MVP in Progress": { variant: "neutral", percent: 40 },
  "Alpha Testing": { variant: "warning", percent: 70 },
  Production: { variant: "success", percent: 100 },
};

export default function CreateProjectModal({ open, onClose, onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [stage, setStage] = useState("Ideation");
  const [roleName, setRoleName] = useState("");
  const [roleSlots, setRoleSlots] = useState("1 slot");
  const [openPositions, setOpenPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const addPosition = () => {
    if (!roleName.trim()) return;
    setOpenPositions((prev) => [...prev, { role: roleName.trim(), slots: roleSlots.trim() }]);
    setRoleName("");
    setRoleSlots("1 slot");
  };

  const removePosition = (index) => {
    setOpenPositions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const positions = [...openPositions];
      if (roleName.trim()) {
        positions.push({ role: roleName.trim(), slots: roleSlots.trim() });
      }

      const res = await api.post("/projects", {
        title: title.trim(),
        description: description.trim(),
        techStack: techStack.split(",").map((s) => s.trim()).filter(Boolean),
        difficulty,
        status: {
          label: stage,
          stage,
          variant: STAGE_META[stage]?.variant || "default",
        },
        openPositions: positions,
        progress: {
          label: stage,
          percent: STAGE_META[stage]?.percent ?? 10,
          barVariant: "primary",
        },
      });

      setLoading(false);
      onCreated?.(res.project);
      onClose();
      // Reset form
      setTitle("");
      setDescription("");
      setTechStack("");
      setOpenPositions([]);
    } catch (err) {
      setLoading(false);
      setError(err?.data?.error || err?.message || "Failed to create project. Please sign in.");
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-[34rem] max-h-[90vh] overflow-y-auto bg-surface-container-lowest rounded-2xl shadow-xl p-6 sm:p-8 border border-outline-variant/60"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary mb-1">
              <Rocket className="w-3.5 h-3.5" />
              NEW COLLABORATION
            </span>
            <h2 className="font-display text-xl font-bold text-on-surface">Publish a Project</h2>
            <p className="text-xs text-on-surface-variant mt-1">
              Form a dev team, list open roles, and invite contributors across DevSphere.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Project Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Distributed Task Scheduler"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/60 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Description</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you're building, the problem it solves, and the team vision..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/60 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Tech Stack</label>
                <input
                  type="text"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  placeholder="React, Go, Docker, Redis"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/60 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/60 text-sm text-on-surface focus:outline-none focus:border-primary"
                >
                  <option value="Beginner Friendly">Beginner Friendly</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/60 text-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="Ideation">Ideation</option>
                <option value="MVP in Progress">MVP in Progress</option>
                <option value="Alpha Testing">Alpha Testing</option>
                <option value="Production">Production</option>
              </select>
            </div>

            {/* Open Roles */}
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5">Open Positions / Roles</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="e.g. Backend Engineer"
                  className="flex-1 px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/60 text-xs text-on-surface focus:outline-none"
                />
                <input
                  type="text"
                  value={roleSlots}
                  onChange={(e) => setRoleSlots(e.target.value)}
                  placeholder="1 slot"
                  className="w-24 px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/60 text-xs text-on-surface focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addPosition}
                  className="px-3 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>

              {openPositions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {openPositions.map((pos, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface"
                    >
                      <span>{pos.role} ({pos.slots})</span>
                      <button
                        type="button"
                        onClick={() => removePosition(idx)}
                        className="text-outline hover:text-rose-500"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-outline-variant/40">
              <Button variant="surface" type="button" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Publishing..." : "Publish Project"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}