import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Settings as SettingsIcon } from "lucide-react";
import Toast from "../../components/ui/toast";
import SettingsNav from "../../components/pages/settings/SettingsNav";
import ProfileSettings from "../../components/pages/settings/ProfileSettings";
import SecuritySettings from "../../components/pages/settings/SecuritySettings";
import NotificationSettings from "../../components/pages/settings/NotificationSettings";
import AppearanceSettings from "../../components/pages/settings/AppearanceSettings";
import PrivacySettings from "../../components/pages/settings/PrivacySettings";
import ConnectedAccountsSettings from "../../components/pages/settings/ConnectedAccountsSettings";
import { SETTINGS_TABS } from "./data/settingsData";

const PANELS = {
  profile: ProfileSettings,
  security: SecuritySettings,
  notifications: NotificationSettings,
  appearance: AppearanceSettings,
  privacy: PrivacySettings,
  connections: ConnectedAccountsSettings,
};

export default function SettingsPage() {
  // The open section lives in the URL (/settings?tab=privacy) so it can be linked to and survives refresh.
  const [params, setParams] = useSearchParams();
  const requested = params.get("tab");
  const active = SETTINGS_TABS.some((t) => t.id === requested) ? requested : "profile";
  const Panel = PANELS[active];

  const [toast, setToast] = useState(null); // { message, tone }
  const toastTimer = useRef(null);
  // notify("Saved") or notify("Something failed", "error")
  const notify = useCallback((message, tone = "success") => {
    setToast({ message, tone });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), tone === "error" ? 3200 : 2200);
  }, []);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const changeTab = (id) => setParams(id === "profile" ? {} : { tab: id }, { replace: true });

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 pb-16">
      {/* ---------- Banner ---------- */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl px-6 py-7 text-white shadow-lg sm:px-9 sm:py-9"
        style={{ background: "linear-gradient(115deg,#2b22a8 0%,#4f46e5 45%,#7c5cff 75%,#38bdf8 100%)" }}
      >
        <motion.div aria-hidden className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-fuchsia-400/40 blur-3xl" animate={{ x: [0, -50, 0], y: [0, 30, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div aria-hidden className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl" animate={{ x: [0, 60, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }} />
        <div aria-hidden className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.6) 1px, transparent 1px)", backgroundSize: "22px 22px", maskImage: "linear-gradient(to right, transparent, black)" }} />
        <motion.span aria-hidden className="absolute right-8 top-1/2 hidden -translate-y-1/2 text-white/15 sm:block" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
          <SettingsIcon className="h-32 w-32" strokeWidth={1.2} />
        </motion.span>
        <div className="relative">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Settings</h1>
          <p className="mt-1.5 max-w-md text-sm text-white/80">Make Devsphere yours. Manage your profile, security, notifications and privacy in one place.</p>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[17rem_1fr]">
        <SettingsNav active={active} onChange={changeTab} />

        <div
          role="tabpanel"
          id={`settings-panel-${active}`}
          aria-labelledby={`settings-tab-${active}`}
          className="min-w-0 overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-5 shadow-sm sm:p-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {/* key resets each panel's form state when switching sections */}
              <Panel key={active} notify={notify} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Toast message={toast?.message} tone={toast?.tone} />
    </div>
  );
}
