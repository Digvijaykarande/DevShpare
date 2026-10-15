import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Laptop, LoaderCircle, ShieldCheck, Smartphone, TriangleAlert } from "lucide-react";
import { api } from "../../../lib/api";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Switch } from "../../ui/switch";
import Field from "./Field";
import { SectionHeader, SettingRow, SubSection } from "./SettingsSection";
import { resetUserData, saveSettings, useProfile, useSettings } from "../../../lib/userStore";
import { validatePassword } from "../../../utils/validators";
import { INITIAL_SESSIONS } from "../../../pages/settings/data/settingsData";

const STRENGTH = [
  { label: "Too weak", bar: "bg-critical" },
  { label: "Weak", bar: "bg-critical" },
  { label: "Fair", bar: "bg-warning" },
  { label: "Good", bar: "bg-success" },
  { label: "Strong", bar: "bg-success" },
];

function scorePassword(pw) {
  if (!pw) return 0;
  let n = 0;
  if (pw.length >= 8) n++;
  if (pw.length >= 12) n++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) n++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) n++;
  return Math.min(n, 4);
}

function StrengthMeter({ password }) {
  const score = scorePassword(password);
  if (!password) return null;
  return (
    <div className="flex items-center gap-3" aria-live="polite">
      <div className="flex flex-1 gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <motion.span key={i} initial={false} animate={{ scaleX: i <= score ? 1 : 0.4, opacity: i <= score ? 1 : 0.35 }} className={`h-1.5 flex-1 origin-left rounded-full ${i <= score ? STRENGTH[score].bar : "bg-outline-variant"}`} />
        ))}
      </div>
      <span className="w-14 text-right text-xs font-medium text-on-surface-variant">{STRENGTH[score].label}</span>
    </div>
  );
}

const EMPTY = { current: "", next: "", confirm: "" };

function ChangePassword({ notify }) {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const errors = {
    current: form.current ? "" : "Enter your current password.",
    next: validatePassword(form.next) || (form.next && form.next === form.current ? "Choose a password you haven't used here." : ""),
    confirm: form.confirm === form.next ? "" : "Passwords don't match.",
  };
  const show = (k) => (submitted ? errors[k] : "");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.values(errors).some(Boolean)) return;
    setSaving(true);
    try {
      if (localStorage.getItem("devsphere_token")) await api.post("/me/change-password", { current: form.current, next: form.next });
      else await new Promise((r) => setTimeout(r, 500)); // demo mode (signed out)
      setForm(EMPTY);
      setSubmitted(false);
      notify("Password updated");
    } catch (err) {
      notify(err.message || "Couldn't update your password.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="flex max-w-md flex-col gap-4">
      <Field label="Current password" htmlFor="pw-current" error={show("current")}>
        <Input id="pw-current" type="password" autoComplete="current-password" value={form.current} onChange={set("current")} aria-invalid={!!show("current")} />
      </Field>
      <Field label="New password" htmlFor="pw-next" error={show("next")} hint={!show("next") ? "At least 8 characters, with uppercase, lowercase and a number." : ""}>
        <Input id="pw-next" type="password" autoComplete="new-password" value={form.next} onChange={set("next")} aria-invalid={!!show("next")} />
        <StrengthMeter password={form.next} />
      </Field>
      <Field label="Confirm new password" htmlFor="pw-confirm" error={show("confirm")}>
        <Input id="pw-confirm" type="password" autoComplete="new-password" value={form.confirm} onChange={set("confirm")} aria-invalid={!!show("confirm")} />
      </Field>
      <div>
        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? <><LoaderCircle className="h-4 w-4 animate-spin" />Updating…</> : "Update password"}
        </Button>
      </div>
    </form>
  );
}

function Sessions({ notify }) {
  const signedIn = !!localStorage.getItem("devsphere_token");
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const others = sessions.filter((s) => !s.current);

  // Signed in: show the real device list from the server.
  useEffect(() => {
    if (!signedIn) return;
    api.get("/me/sessions").then((d) => setSessions(d.sessions)).catch(() => {});
  }, [signedIn]);

  const signOut = async (id) => {
    try {
      if (signedIn) await api.delete(`/me/sessions/${id}`);
      setSessions((list) => list.filter((s) => s.id !== id));
      notify("Device signed out");
    } catch (err) { notify(err.message || "Couldn't sign that device out.", "error"); }
  };
  const signOutAll = async () => {
    try {
      if (signedIn) await api.delete("/me/sessions");
      setSessions((list) => list.filter((s) => s.current));
      notify("Signed out of all other devices");
    } catch (err) { notify(err.message || "Couldn't sign out other devices.", "error"); }
  };

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col divide-y divide-outline-variant/60 overflow-hidden rounded-xl border border-outline-variant/70">
        <AnimatePresence initial={false}>
        {sessions.map((s) => {
          const Icon = /iphone|android/i.test(s.device) ? Smartphone : Laptop;
          return (
            <motion.li key={s.id} layout exit={{ opacity: 0, x: 40, height: 0 }} transition={{ duration: 0.25 }} className="flex items-center gap-3 px-4 py-3">
              <Icon className="h-5 w-5 shrink-0 text-on-surface-variant" strokeWidth={1.75} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-on-surface">{s.device}</p>
                <p className="text-xs text-on-surface-variant">{s.place} · {s.when}</p>
              </div>
              {s.current ? <Badge variant="success">This device</Badge> : <Button type="button" variant="ghost" size="sm" onClick={() => signOut(s.id)}>Sign out</Button>}
            </motion.li>
          );
        })}
        </AnimatePresence>
      </ul>
      {others.length > 0 && (
        <div>
          <Button type="button" variant="surface" size="sm" onClick={signOutAll}>Sign out all other devices</Button>
        </div>
      )}
    </div>
  );
}

function DeleteAccount() {
  const navigate = useNavigate();
  const [profile] = useProfile();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const signedIn = !!localStorage.getItem("devsphere_token");
  const matches = typed.trim() === profile.username && (!signedIn || password.length > 0);

  const confirm = async () => {
    setBusy(true);
    setError("");
    try {
      if (signedIn) await api.delete("/me", { body: { confirm: typed.trim(), password } });
      resetUserData();
      navigate("/");
    } catch (err) {
      setError(err.message || "Couldn't delete your account.");
      setBusy(false);
    }
  };

  return (
    <div className="rounded-lg border border-critical/30 bg-critical-container/50 p-4">
      <div className="flex items-start gap-3">
        <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-critical" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-on-surface">Delete account</p>
          <p className="mt-0.5 text-xs text-on-surface-variant">Removes your profile, questions, answers and projects. This can't be undone.</p>

          {!open ? (
            <Button type="button" variant="surface" size="sm" className="mt-3 border-critical/40 text-critical hover:border-critical" onClick={() => setOpen(true)}>
              Delete my account
            </Button>
          ) : (
            <div className="mt-3 flex max-w-sm flex-col gap-3">
              <Field label={`Type ${profile.username} to confirm`} htmlFor="delete-confirm">
                <Input id="delete-confirm" value={typed} onChange={(e) => setTyped(e.target.value)} autoComplete="off" spellCheck={false} />
              </Field>
              {signedIn && (
                <Field label="Your password" htmlFor="delete-password" error={error}>
                  <Input id="delete-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Field>
              )}
              {!signedIn && error && <p role="alert" className="text-xs text-error">{error}</p>}
              <div className="flex gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => { setOpen(false); setTyped(""); setPassword(""); setError(""); }}>Cancel</Button>
                <Button type="button" size="sm" disabled={!matches || busy} onClick={confirm} className="bg-critical text-white hover:bg-critical/90">Delete account</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SecuritySettings({ notify }) {
  const [settings] = useSettings();

  const toggle2fa = async (on) => {
    // NOTE: this stores the preference. A real authenticator (TOTP) enrolment flow can be added on top later.
    const ok = await saveSettings({ security: { ...settings.security, twoFactor: on } });
    ok ? notify(on ? "Two-factor authentication on" : "Two-factor authentication off") : notify("Couldn't save. Check your connection.", "error");
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader icon={ShieldCheck} title="Account & Security" description="Keep your account safe and see where you're signed in." />

      <section className="flex flex-col gap-4">
        <SectionHeader title="Change password" className="[&>h2]:text-base" />
        <ChangePassword notify={notify} />
      </section>

      <SubSection title="Two-factor authentication">
        <SettingRow label="Require a code when you sign in" hint="Adds a second step using an authenticator app." htmlFor="switch-2fa">
          <Switch id="switch-2fa" checked={settings.security.twoFactor} onCheckedChange={toggle2fa} />
        </SettingRow>
      </SubSection>

      <SubSection title="Where you're signed in">
        <Sessions notify={notify} />
      </SubSection>

      <SubSection title="Danger zone">
        <DeleteAccount />
      </SubSection>
    </div>
  );
}
