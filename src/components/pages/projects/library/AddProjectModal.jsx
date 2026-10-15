import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, UploadCloud } from "lucide-react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { LIBRARY_LANGUAGES } from "../../../../pages/projects/data/projectLibraryData";

const EMPTY_FORM = { title: "", language: LIBRARY_LANGUAGES[0], description: "", tags: "", repoUrl: "" };

export default function AddProjectModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setError("");
    }
    const handleKey = (e) => e.key === "Escape" && open && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are required.");
      return;
    }

    onAdd({
      id: `custom-${Date.now()}`,
      title: form.title.trim(),
      language: form.language,
      description: form.description.trim(),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 6),
      author: "You",
      stars: 0,
      sizeKb: 0,
      updatedAt: new Date().toISOString().slice(0, 10),
      repoUrl: form.repoUrl.trim() || null,
      downloadUrl: form.repoUrl.trim() || null,
      custom: true,
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-inverse-surface/40"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Add a project to the library"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-[30rem] max-h-[90vh] overflow-y-auto bg-surface-container-lowest rounded-xl shadow-lg p-lg"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 pr-8">
              <UploadCloud className="w-5 h-5 text-primary" />
              <h3 className="font-display text-lg font-semibold text-on-surface">Add a project</h3>
            </div>
            <p className="text-sm text-on-surface-variant mt-1">
              Share something you've built — it shows up in the library instantly for others to view and download.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-md mt-lg">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lib-title">Project title *</Label>
                <Input id="lib-title" value={form.title} onChange={update("title")} placeholder="e.g. Markdown Note Sync" />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lib-language">Language *</Label>
                <select
                  id="lib-language"
                  value={form.language}
                  onChange={update("language")}
                  className="w-full py-3 px-3 bg-[#f2f3ff] text-[#131b2e] text-sm rounded-lg shadow-sm outline-none focus:bg-white transition-colors"
                >
                  {LIBRARY_LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lib-description">Description *</Label>
                <textarea
                  id="lib-description"
                  value={form.description}
                  onChange={update("description")}
                  rows={3}
                  placeholder="What does it do, and what makes it worth downloading?"
                  className="w-full py-3 px-3 bg-[#f2f3ff] text-[#131b2e] placeholder:text-[#777586] text-sm rounded-lg shadow-sm outline-none focus:bg-white transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lib-tags">Tags (comma separated)</Label>
                <Input id="lib-tags" value={form.tags} onChange={update("tags")} placeholder="React, Vite, Tailwind" />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lib-repo">Repository / download link</Label>
                <Input
                  id="lib-repo"
                  value={form.repoUrl}
                  onChange={update("repoUrl")}
                  placeholder="https://github.com/you/your-repo"
                />
                <p className="text-xs text-on-surface-variant">
                  Optional — leave blank and we'll generate a downloadable project summary instead.
                </p>
              </div>

              {error && <p className="text-xs text-critical font-medium">{error}</p>}

              <Button variant="primary" size="default" type="submit" className="w-full mt-xs">
                Add to library
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
