import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import { Switch } from "../../ui/switch";
import { SectionHeader } from "./SettingsSection";
import { saveSettings, useSettings } from "../../../lib/userStore";
import { NOTIFICATION_GROUPS } from "../../../pages/settings/data/settingsData";

export default function NotificationSettings({ notify }) {
  const [settings] = useSettings();

  const toggle = async (id, channel, value) => {
    const ok = await saveSettings({ notifications: { ...settings.notifications, [id]: { ...settings.notifications[id], [channel]: value } } });
    ok ? notify("Preferences saved") : notify("Couldn't save. Check your connection.", "error");
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader icon={Bell} title="Notifications" description="Choose what you hear about, and where." />

      {NOTIFICATION_GROUPS.map((group, gi) => (
        <motion.section key={group.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * gi }} className="flex flex-col rounded-2xl border border-outline-variant/50 px-4 pb-1 pt-3">
          <div className="grid grid-cols-[1fr_3.5rem_3.5rem] items-end gap-2 border-b border-outline-variant/60 pb-2">
            <h3 className="text-sm font-semibold text-on-surface">{group.title}</h3>
            <span className="text-center text-xs font-medium text-on-surface-variant">Email</span>
            <span className="text-center text-xs font-medium text-on-surface-variant">In-app</span>
          </div>
          <ul className="divide-y divide-outline-variant/40">
            {group.items.map((item) => (
              <li key={item.id} className="grid grid-cols-[1fr_3.5rem_3.5rem] items-center gap-2 py-3">
                <div className="min-w-0 pr-2">
                  <p className="text-sm font-medium text-on-surface">{item.label}</p>
                  <p className="mt-0.5 text-xs text-on-surface-variant">{item.hint}</p>
                </div>
                {["email", "inApp"].map((channel) => (
                  <div key={channel} className="flex justify-center">
                    <Switch
                      checked={settings.notifications[item.id][channel]}
                      onCheckedChange={(v) => toggle(item.id, channel, v)}
                      aria-label={`${item.label}: ${channel === "email" ? "email" : "in-app"}`}
                    />
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </motion.section>
      ))}
    </div>
  );
}
