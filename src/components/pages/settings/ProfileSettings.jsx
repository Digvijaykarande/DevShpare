import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Camera, LoaderCircle, Link2, MapPin, User } from "lucide-react";
import Avatar from "../../ui/Avatar";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import Field from "./Field";
import { SectionHeader } from "./SettingsSection";
import { clearAvatar, saveAvatar, saveProfile, useProfile } from "../../../lib/userStore";
import { resizeImageToDataUrl } from "../../../utils/image";
import { validateFullName, validateUsername, validateWebsite } from "../../../utils/validators";
import { BIO_MAX, PHOTO_MAX_BYTES } from "../../../pages/settings/data/settingsData";

const toForm = (p) => ({ name: p.name, username: p.username, bio: p.bio, location: p.location, website: p.website });

export default function ProfileSettings({ notify }) {
  const [profile] = useProfile();
  const [form, setForm] = useState(() => toForm(profile));
  const [touched, setTouched] = useState({});
  const [saving, setSaving] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({}); // errors that only the server can detect (e.g. username taken)
  const fileRef = useRef(null);

  const errors = {
    name: validateFullName(form.name),
    username: validateUsername(form.username),
    website: validateWebsite(form.website),
  };
  const hasErrors = Object.values(errors).some(Boolean);
  const dirty = Object.keys(form).some((k) => form[k].trim() !== (profile[k] ?? "").trim());

  const set = (key) => (e) => { setFieldErrors((x) => ({ ...x, [key]: "" })); setForm((f) => ({ ...f, [key]: e.target.value })); };
  const blur = (key) => () => setTouched((t) => ({ ...t, [key]: true }));
  const shown = (key) => (touched[key] ? errors[key] : "") || fieldErrors[key] || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, username: true, website: true });
    if (hasErrors || !dirty) return;
    setSaving(true);
    const values = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim()]));
    try {
      await saveProfile(values); // PATCH /api/me (local-only when signed out)
      setForm(values);
      notify("Profile saved");
    } catch (err) {
      // "Username already taken" etc. come back from the server
      const serverErrors = err.data?.errors;
      if (serverErrors) setFieldErrors(serverErrors);
      notify(err.message || "Couldn't save your profile.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    setForm(toForm(profile));
    setTouched({});
    setFieldErrors({});
  };

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow picking the same file again
    if (!file) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) return setPhotoError("Use a JPG or PNG image.");
    if (file.size > PHOTO_MAX_BYTES) return setPhotoError("That photo is over 5 MB. Choose a smaller one.");
    try {
      const avatar = await resizeImageToDataUrl(file);
      await saveAvatar(avatar); // PUT /api/me/avatar
      setPhotoError("");
      notify("Profile photo updated");
    } catch (err) {
      setPhotoError(err.status ? err.message : "We couldn't read that image. Try a different file.");
    }
  };

  const removePhoto = async () => {
    try {
      await clearAvatar(); // DELETE /api/me/avatar
      setPhotoError("");
      notify("Profile photo removed");
    } catch (err) {
      notify(err.message || "Couldn't remove the photo.", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <SectionHeader icon={User} title="Profile Settings" description="Update your profile information." />

      {/* Photo */}
      <div className="flex flex-col gap-5 rounded-2xl border border-outline-variant/50 bg-gradient-to-br from-primary-fixed/60 to-transparent p-5 sm:flex-row sm:items-center">
        <motion.div whileHover="hover" className="group relative cursor-pointer" onClick={() => fileRef.current?.click()}>
          <Avatar name={profile.name} src={profile.avatar} size="xl" className="ring-4 ring-surface-container-lowest shadow-md" />
          <motion.span variants={{ hover: { opacity: 1 } }} initial={{ opacity: 0 }} className="absolute inset-0 grid place-items-center rounded-full bg-black/45 text-white"><Camera className="h-6 w-6" /></motion.span>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
            aria-label="Change profile photo"
            className="absolute -bottom-0.5 -right-0.5 grid h-7 w-7 place-items-center rounded-full bg-primary-container text-on-primary shadow-sm ring-2 ring-surface-container-lowest transition-colors hover:bg-primary"
          >
            <Camera className="h-3.5 w-3.5" />
          </button>
        </motion.div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-on-surface">Profile Photo</p>
          <p className="text-xs text-on-surface-variant">JPG or PNG, up to 5 MB.</p>
          <div className="mt-1 flex items-center gap-2">
            <Button type="button" variant="surface" size="sm" onClick={() => fileRef.current?.click()}>Change Photo</Button>
            {profile.avatar && <Button type="button" variant="ghost" size="sm" onClick={removePhoto}>Remove</Button>}
          </div>
          {photoError && <p role="alert" className="text-xs text-error">{photoError}</p>}
        </div>
        <input ref={fileRef} type="file" accept="image/png,image/jpeg" onChange={handlePhoto} className="hidden" tabIndex={-1} aria-hidden="true" />
      </div>

      <Field label="Full Name" htmlFor="set-name" error={shown("name")}>
        <Input id="set-name" value={form.name} onChange={set("name")} onBlur={blur("name")} autoComplete="name" aria-invalid={!!shown("name")} aria-describedby="set-name-msg" />
      </Field>

      <Field label="Username" htmlFor="set-username" error={shown("username")} hint="Lowercase letters, numbers, dots, dashes and underscores.">
        <Input
          id="set-username"
          value={form.username}
          onChange={(e) => setForm((f) => ({ ...f, username: e.target.value.toLowerCase().replace(/\s/g, "") }))}
          onBlur={blur("username")}
          autoComplete="username"
          spellCheck={false}
          aria-invalid={!!shown("username")}
          aria-describedby="set-username-msg"
        />
      </Field>

      <Field label="Email" htmlFor="set-email" hint="Your email can't be changed here.">
        <div className="flex items-center gap-2">
          <Input id="set-email" type="email" value={profile.email} disabled readOnly aria-describedby="set-email-msg" />
          {profile.emailVerified && (
            <Badge variant="success" className="h-7 shrink-0 px-2.5 text-xs"><BadgeCheck className="h-3.5 w-3.5" />Verified</Badge>
          )}
        </div>
      </Field>

      <Field label="Bio" htmlFor="set-bio">
        <div className="relative">
          <Textarea id="set-bio" value={form.bio} onChange={set("bio")} maxLength={BIO_MAX} rows={4} className="pb-7" placeholder="Tell people what you're building and learning." />
          <span aria-live="polite" className={`pointer-events-none absolute bottom-2 right-3 text-[11px] tabular-nums ${form.bio.length >= BIO_MAX ? "text-warning" : "text-outline"}`}>
            {form.bio.length}/{BIO_MAX}
          </span>
        </div>
      </Field>

      <Field inline label="Location" htmlFor="set-location">
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
          <Input id="set-location" value={form.location} onChange={set("location")} className="pl-10" placeholder="City, Country" autoComplete="address-level2" />
        </div>
      </Field>

      <Field inline label="Website" htmlFor="set-website" error={shown("website")}>
        <div className="relative">
          <Link2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
          <Input id="set-website" type="url" value={form.website} onChange={set("website")} onBlur={blur("website")} className="pl-10" placeholder="https://yoursite.dev" aria-invalid={!!shown("website")} aria-describedby="set-website-msg" />
        </div>
      </Field>

      <div className="flex items-center justify-end gap-2 pt-2">
        {dirty && !saving && <Button type="button" variant="ghost" onClick={handleDiscard}>Discard</Button>}
        <Button type="submit" variant="primary" disabled={!dirty || saving} className="min-w-32">
          {saving ? <><LoaderCircle className="h-4 w-4 animate-spin" />Saving…</> : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
