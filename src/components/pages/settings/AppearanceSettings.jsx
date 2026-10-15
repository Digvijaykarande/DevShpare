import { motion } from "framer-motion";
import { Check, Palette } from "lucide-react";
import { Switch } from "../../ui/switch";
import { SectionHeader, SettingRow, SubSection } from "./SettingsSection";
import { saveSettings, useSettings } from "../../../lib/userStore";
import { cn } from "../../../utils/cn";
import { THEME_OPTIONS } from "../../../pages/settings/data/settingsData";

// Tiny fake window that previews each theme. Colors are fixed on purpose so the
// preview looks right no matter which theme is currently active.
const PREVIEW = {
  light: { bg: "#f7f8fa", bar: "#ffffff", line: "#d3d8e2", accent: "#4f46e5" },
  dark: { bg: "#0e1016", bar: "#151821", line: "#2c3140", accent: "#7c74ff" },
};

function ThemePreview({ id }) {
  const half = (c) => (
    <div className="flex h-full flex-1 flex-col gap-1.5 p-2" style={{ background: c.bg }}>
      <div className="h-2 w-full rounded-sm" style={{ background: c.bar, border: `1px solid ${c.line}` }} />
      <div className="h-2 w-2/3 rounded-sm" style={{ background: c.line }} />
      <div className="mt-auto h-2.5 w-1/2 rounded-sm" style={{ background: c.accent }} />
    </div>
  );
  return (
    <div className="flex h-16 w-full overflow-hidden rounded-md border border-outline-variant/70">
      {id === "system" ? <>{half(PREVIEW.light)}{half(PREVIEW.dark)}</> : half(PREVIEW[id])}
    </div>
  );
}

export default function AppearanceSettings({ notify }) {
  const [settings] = useSettings();
  const { theme, reduceMotion } = settings.appearance;

  const setAppearance = async (patch) => {
    const ok = await saveSettings({ appearance: { ...settings.appearance, ...patch } });
    ok ? notify("Preferences saved") : notify("Couldn't save. Check your connection.", "error");
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader icon={Palette} title="Appearance" description="Pick how Devsphere looks on this device." />

      <div role="radiogroup" aria-label="Theme" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {THEME_OPTIONS.map((opt) => {
          const selected = theme === opt.id;
          return (
            <motion.button
              key={opt.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setAppearance({ theme: opt.id })}
              className={cn(
                "flex flex-col gap-2.5 rounded-2xl border p-3 text-left transition-[border-color,box-shadow]",
                selected ? "border-primary-container ring-4 ring-primary-container/15" : "border-outline-variant hover:border-outline"
              )}
            >
              <ThemePreview id={opt.id} />
              <span className={cn("flex items-center justify-between text-sm font-medium", selected ? "text-primary" : "text-on-surface")}>
                {opt.label}
                {selected && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 18 }} className="grid h-5 w-5 place-items-center rounded-full bg-primary-container text-on-primary">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </motion.span>
                )}
              </span>
            </motion.button>
          );
        })}
      </div>

      <SubSection title="Motion">
        <SettingRow label="Reduce motion" hint="Turns off page transitions and animated effects." htmlFor="switch-motion">
          <Switch id="switch-motion" checked={reduceMotion} onCheckedChange={(v) => setAppearance({ reduceMotion: v })} />
        </SettingRow>
      </SubSection>
    </div>
  );
}
