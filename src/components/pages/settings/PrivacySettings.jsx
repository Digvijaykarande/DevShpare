import { motion } from "framer-motion";
import { Download, Lock } from "lucide-react";
import { api } from "../../../lib/api";
import { Button } from "../../ui/button";
import { Switch } from "../../ui/switch";
import { SectionHeader, SettingRow, SubSection } from "./SettingsSection";
import { saveSettings, useProfile, useSettings } from "../../../lib/userStore";
import { cn } from "../../../utils/cn";
import { PRIVACY_TOGGLES, VISIBILITY_OPTIONS } from "../../../pages/settings/data/settingsData";

export default function PrivacySettings({ notify }) {
  const [settings] = useSettings();
  const [profile] = useProfile();
  const { privacy } = settings;

  const setPrivacy = async (patch) => {
    const ok = await saveSettings({ privacy: { ...privacy, ...patch } });
    ok ? notify("Preferences saved") : notify("Couldn't save. Check your connection.", "error");
  };

  const downloadData = async () => {
    // Signed in: the server export includes questions, projects, submissions, bookings.
    // Signed out: fall back to the profile + settings kept on this device.
    let payload;
    try {
      if (!localStorage.getItem("devsphere_token")) throw new Error("offline");
      payload = await api.get("/me/export");
    } catch {
      payload = { profile: { ...profile, avatar: profile.avatar ? "(uploaded photo)" : null }, settings, exportedAt: new Date().toISOString() };
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `devsphere-${profile.username}-data.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify("Your data was downloaded");
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader icon={Lock} title="Privacy" description="Control who can see your profile and activity." />

      <div role="radiogroup" aria-label="Profile visibility" className="flex flex-col gap-2">
        {VISIBILITY_OPTIONS.map((opt) => {
          const selected = privacy.visibility === opt.id;
          return (
            <motion.button
              key={opt.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.99 }}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setPrivacy({ visibility: opt.id })}
              className={cn(
                "flex items-start gap-3 rounded-xl border px-4 py-3 text-left transition-[border-color,box-shadow]",
                selected ? "border-primary-container bg-primary-container/[0.04] ring-4 ring-primary-container/10" : "border-outline-variant hover:border-outline"
              )}
            >
              <span className={cn("mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border", selected ? "border-primary-container" : "border-outline")}>
                {selected && <motion.span layoutId="privacy-radio-dot" transition={{ type: "spring", stiffness: 600, damping: 32 }} className="h-2 w-2 rounded-full bg-primary-container" />}
              </span>
              <span>
                <span className="block text-sm font-medium text-on-surface">{opt.label}</span>
                <span className="block text-xs text-on-surface-variant">{opt.hint}</span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <SubSection title="What others can see">
        <div className="divide-y divide-outline-variant/40">
          {PRIVACY_TOGGLES.map((t) => (
            <SettingRow key={t.id} label={t.label} hint={t.hint} htmlFor={`switch-${t.id}`}>
              <Switch id={`switch-${t.id}`} checked={privacy[t.id]} onCheckedChange={(v) => setPrivacy({ [t.id]: v })} />
            </SettingRow>
          ))}
        </div>
      </SubSection>

      <SubSection title="Your data">
        <SettingRow label="Download a copy of your data" hint="Get your profile and preferences as a JSON file.">
          <Button type="button" variant="surface" size="sm" onClick={downloadData}><Download className="h-4 w-4" />Download</Button>
        </SettingRow>
      </SubSection>
    </div>
  );
}
