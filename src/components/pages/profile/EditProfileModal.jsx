import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, UserPen, X } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";

const BIO_MAX = 250;

export default function EditProfileModal({ open, profile, onClose, onSave }) {
  return <AnimatePresence>{open && <EditProfileDialog profile={profile} onClose={onClose} onSave={onSave} />}</AnimatePresence>;
}

function EditProfileDialog({ profile, onClose, onSave }) {
  const [form, setForm] = useState({ name: profile.name, role: profile.role, bio: profile.bio, location: profile.location, website: profile.website });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const nameError = form.name.trim().length < 2 ? "Name must be at least 2 characters." : "";

  const submit = async (e) => {
    e.preventDefault();
    if (nameError) return setError(nameError);
    setSaving(true);
    setError("");
    try {
      await onSave(Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim()])));
    } catch (err) {
      setError(err.message || "Couldn't save your profile. Try again.");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Edit profile">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-outline-variant/40 bg-surface-container-lowest shadow-2xl"
      >
        <div className="h-1.5 bg-gradient-to-r from-primary-container via-violet-500 to-sky-400" />
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-fixed text-primary"><UserPen className="h-5 w-5" /></div>
            <div>
              <h2 className="font-display text-base font-semibold text-on-surface">Edit Profile</h2>
              <p className="text-xs text-on-surface-variant">Update how others see you on Devsphere.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container"><X className="h-4 w-4" /></button>
        </div>
        <form onSubmit={submit} noValidate className="flex flex-col gap-4 px-6 pb-6">
          <div className="flex flex-col gap-1.5"><Label htmlFor="edit-name">Full Name</Label><Input id="edit-name" value={form.name} onChange={set("name")} aria-invalid={!!nameError && !!error} /></div>
          <div className="flex flex-col gap-1.5"><Label htmlFor="edit-role">Role</Label><Input id="edit-role" value={form.role} onChange={set("role")} /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5"><Label htmlFor="edit-loc">Location</Label><Input id="edit-loc" value={form.location} onChange={set("location")} placeholder="City, Country" /></div>
            <div className="flex flex-col gap-1.5"><Label htmlFor="edit-web">Website</Label><Input id="edit-web" value={form.website} onChange={set("website")} placeholder="https://yoursite.dev" /></div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-bio">Bio</Label>
            <Textarea id="edit-bio" value={form.bio} onChange={set("bio")} rows={4} maxLength={BIO_MAX} />
            <span className="text-right text-[11px] tabular-nums text-outline">{form.bio.length}/{BIO_MAX}</span>
          </div>
          <AnimatePresence>{error && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} role="alert" className="rounded-lg bg-error-container px-3 py-2 text-xs text-on-error-container">{error}</motion.p>}</AnimatePresence>
          <div className="flex items-center justify-end gap-3 pt-1">
            <Button type="button" variant="surface" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={saving} className="min-w-32">
              {saving ? <><LoaderCircle className="h-4 w-4 animate-spin" />Saving…</> : "Save Changes"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
