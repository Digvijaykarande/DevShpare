import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Avatar from "../../ui/Avatar";
import { useProfile } from "../../../lib/userStore";
import { cn } from "../../../utils/cn";
import { SETTINGS_TABS } from "../../../pages/settings/data/settingsData";

// How "finished" the profile is: drives the little progress bar under the name.
function completeness(p) {
  const checks = [p.name, p.username, p.bio, p.location, p.website, p.avatar, p.role];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

/** Left list on desktop, horizontally scrolling tabs on mobile. */
export default function SettingsNav({ active, onChange }) {
  const [profile] = useProfile();
  const pct = completeness(profile);

  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
      <Link to="/profile" className="group hidden overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-xs transition-shadow hover:shadow-md lg:block">
        <div className="h-12 bg-gradient-to-r from-primary-container via-violet-500 to-sky-400" />
        <div className="-mt-6 px-4 pb-4">
          <Avatar name={profile.name} src={profile.avatar} size="lg" className="ring-4 ring-surface-container-lowest" />
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-on-surface">{profile.name}</p>
              <p className="truncate font-code text-[11px] text-outline">@{profile.username}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-outline transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[11px] font-medium text-on-surface-variant"><span>Profile strength</span><span>{pct}%</span></div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-high">
              <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }} className="h-full rounded-full bg-gradient-to-r from-primary-container to-sky-400" />
            </div>
          </div>
        </div>
      </Link>

      <nav aria-label="Settings sections" className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-2 shadow-xs">
        <div role="tablist" aria-orientation="vertical" className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {SETTINGS_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`settings-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`settings-panel-${tab.id}`}
                onClick={() => onChange(tab.id)}
                className={cn(
                  "relative flex h-11 shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-3 text-sm transition-colors",
                  isActive ? "font-semibold text-on-primary" : "font-medium text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                )}
              >
                {isActive && (
                  <motion.span layoutId="settings-nav-pill" transition={{ type: "spring", stiffness: 500, damping: 38 }} className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-container to-violet-500 shadow-md shadow-primary-container/25" />
                )}
                <Icon className="relative h-[18px] w-[18px] shrink-0" strokeWidth={isActive ? 2.1 : 1.75} />
                <span className="relative">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
