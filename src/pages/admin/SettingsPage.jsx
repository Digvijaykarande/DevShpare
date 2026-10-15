import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import Toast from "../../components/ui/toast";
import { useSettings } from "../../lib/userStore";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../utils/cn";
import { PageHeader, useToast } from "../../components/admin/AdminUI";
import {
  SETTINGS_SECTIONS, DEFAULT_PLATFORM, TIMEZONES, TOGGLE_SECTIONS, INTEGRATIONS, LOGS,
} from "./data/adminData";

function General({ notify }) {
  const [v, setV] = useState(DEFAULT_PLATFORM);
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));
  const save = () => { /* TODO(backend): PATCH /admin/settings/general */ notify("Settings saved"); };
  return (
    <div className="grid gap-5 max-w-xl">
      <div className="grid gap-1.5"><Label htmlFor="pn">Platform Name</Label><Input id="pn" value={v.name} onChange={set("name")} /></div>
      <div className="grid gap-1.5"><Label htmlFor="pu">Platform URL</Label><Input id="pu" value={v.url} onChange={set("url")} /></div>
      <div className="grid gap-1.5"><Label htmlFor="pe">Support Email</Label><Input id="pe" type="email" value={v.email} onChange={set("email")} /></div>
      <div className="grid gap-1.5">
        <Label htmlFor="pt">Timezone</Label>
        <select id="pt" value={v.timezone} onChange={set("timezone")} className="w-full h-11 px-3 rounded-lg text-sm bg-surface-container-lowest text-on-surface border border-outline-variant outline-none hover:border-outline focus:border-primary-container focus:ring-4 focus:ring-primary-container/15">
          {TIMEZONES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="flex justify-end"><Button onClick={save}>Save Changes</Button></div>
    </div>
  );
}

function Appearance({ notify }) {
  const [{ appearance }, update] = useSettings();
  const setTheme = (theme) => { update((s) => ({ appearance: { ...s.appearance, theme } })); notify(`Theme: ${theme}`); };
  return (
    <div className="grid gap-4 max-w-xl">
      <p className="text-sm text-on-surface-variant">Choose how the admin panel looks.</p>
      <div className="grid grid-cols-3 gap-3">
        {["light", "dark", "system"].map((t) => (
          <button key={t} type="button" onClick={() => setTheme(t)}
            className={cn("h-12 rounded-lg border text-sm font-medium capitalize transition-colors",
              appearance.theme === t ? "border-primary-container bg-primary-container/10 text-primary" : "border-outline-variant hover:bg-surface-container-low")}>{t}</button>
        ))}
      </div>
    </div>
  );
}

function Toggles({ items, notify }) {
  const [state, setState] = useState(() => Object.fromEntries(items.map((i) => [i.id, i.on])));
  return (
    <ul className="divide-y divide-outline-variant/60 max-w-xl">
      {items.map((i) => (
        <li key={i.id} className="flex items-center justify-between gap-4 py-3.5">
          <div><p className="text-sm font-medium">{i.label}</p><p className="text-xs text-on-surface-variant">{i.hint}</p></div>
          <Switch checked={state[i.id]} onCheckedChange={(on) => { setState((s) => ({ ...s, [i.id]: on })); notify("Preference updated"); }} aria-label={i.label} />
        </li>
      ))}
    </ul>
  );
}

function Integrations({ notify }) {
  const [on, setOn] = useState(() => Object.fromEntries(INTEGRATIONS.map((i) => [i.id, i.connected])));
  return (
    <ul className="divide-y divide-outline-variant/60 max-w-xl">
      {INTEGRATIONS.map((i) => (
        <li key={i.id} className="flex items-center justify-between gap-4 py-3.5">
          <div><p className="text-sm font-medium">{i.name}</p><p className="text-xs text-on-surface-variant">{i.hint}</p></div>
          <div className="flex items-center gap-3">
            <Badge variant={on[i.id] ? "success" : "muted"}>{on[i.id] ? "Connected" : "Not connected"}</Badge>
            <Button size="sm" variant="surface" onClick={() => { setOn((s) => ({ ...s, [i.id]: !s[i.id] })); notify(on[i.id] ? `${i.name} disconnected` : `${i.name} connected`); }}>
              {on[i.id] ? "Disconnect" : "Connect"}
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Backup({ notify }) {
  return (
    <div className="grid gap-4 max-w-xl">
      <p className="text-sm text-on-surface-variant">Last backup: Today, 02:00 (1.2 GB). Backups run daily and are kept for 30 days.</p>
      <div className="flex gap-2">
        <Button onClick={() => notify("Backup started")}>Back up now</Button>
        <Button variant="surface" onClick={() => notify("Export requested")}>Export all data</Button>
      </div>
    </div>
  );
}

function Logs() {
  return (
    <ul className="divide-y divide-outline-variant/60 max-w-2xl">
      {LOGS.map((l) => (
        <li key={l.id} className="flex items-center justify-between gap-4 py-3 text-sm">
          <span>{l.text}</span><span className="text-xs text-outline whitespace-nowrap">{l.time}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AdminSettingsPage() {
  const [section, setSection] = useState("General");
  const [toast, notify] = useToast();

  const body = {
    General: <General notify={notify} />,
    Appearance: <Appearance notify={notify} />,
    "Backup & Data": <Backup notify={notify} />,
    Integrations: <Integrations notify={notify} />,
    Logs: <Logs />,
  }[section] ?? <Toggles key={section} items={TOGGLE_SECTIONS[section]} notify={notify} />;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Settings" subtitle="Manage platform configuration and preferences." />
      <Card className="overflow-hidden grid md:grid-cols-[14rem_1fr]">
        <nav aria-label="Settings sections" className="flex md:flex-col gap-0.5 p-3 border-b md:border-b-0 md:border-r border-outline-variant/60 overflow-x-auto">
          {SETTINGS_SECTIONS.map((s) => (
            <button key={s} type="button" onClick={() => setSection(s)} aria-current={section === s}
              className={cn("h-9 px-3 rounded-lg text-sm text-left whitespace-nowrap transition-colors",
                section === s ? "bg-primary-container/10 text-primary font-semibold" : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface")}>{s}</button>
          ))}
        </nav>
        <div className="p-6">
          <h2 className="font-display font-semibold mb-5">{section === "General" ? "General Settings" : section}</h2>
          {body}
        </div>
      </Card>
      <Toast message={toast?.message} tone={toast?.tone} />
    </div>
  );
}
