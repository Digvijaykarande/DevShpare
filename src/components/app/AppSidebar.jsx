import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { X, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { NAV_GROUPS, ACCOUNT_NAV } from "./navConfig";

function NavItem({ item, onNavigate }) {
  const Icon = item.icon;

  if (item.ready === false) {
    return (
      <div
        aria-disabled="true"
        title="Coming soon"
        className="flex items-center gap-3 h-10 px-3 rounded-xl text-sm text-outline/80 cursor-not-allowed select-none"
      >
        <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.75} />
        <span className="flex-1">{item.label}</span>
        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-surface-container text-outline">Soon</span>
      </div>
    );
  }

  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "group relative flex items-center gap-3 h-10 px-3 rounded-xl text-sm transition-colors",
          isActive
            ? "bg-primary-container/[0.08] text-primary font-semibold"
            : "text-on-surface-variant font-medium hover:bg-surface-container-low hover:text-on-surface"
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && <span className="absolute -left-2 top-2 bottom-2 w-[3px] rounded-r-full bg-primary-container" />}
          <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={isActive ? 2.1 : 1.75} />
          <span>{item.label}</span>
        </>
      )}
    </NavLink>
  );
}

function NavContent({ onNavigate }) {
  return (
    <>
      <nav className="flex flex-col gap-6 px-4 pt-6" aria-label="Main">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="flex flex-col gap-1">
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-outline">{group.title}</p>
            {group.items.map((item) => (
              <NavItem key={item.label} item={item} onNavigate={onNavigate} />
            ))}
          </div>
        ))}
      </nav>

      <div className="mt-auto p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1 pt-4 border-t border-outline-variant/60">
          {ACCOUNT_NAV.map((item) => (
            <NavItem key={item.label} item={item} onNavigate={onNavigate} />
          ))}
        </div>
        <div className="rounded-xl border border-outline-variant/70 bg-surface-container-low p-3.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-on-surface">
            <Sparkles className="w-4 h-4 text-primary-container" />
            Ship something this week
          </div>
          <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
            Pick a project from the library and post your progress.
          </p>
        </div>
      </div>
    </>
  );
}

/** Desktop: fixed rail. Mobile: slide-in drawer controlled by AppLayout (open / onClose). */
export default function AppSidebar({ open = false, onClose = () => {} }) {
  const { pathname } = useLocation();

  // Close the drawer after any navigation and on Escape.
  useEffect(() => { onClose(); }, [pathname, onClose]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <aside className="fixed left-0 top-16 bottom-0 w-60 z-40 hidden lg:flex flex-col bg-surface-container-lowest border-r border-outline-variant/70 overflow-y-auto">
        <NavContent />
      </aside>

      <AnimatePresence>
        {open && (
          <div className="lg:hidden fixed inset-0 z-[70]">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-on-surface/40 backdrop-blur-[2px]"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
              className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] flex flex-col bg-surface-container-lowest shadow-xl overflow-y-auto"
              aria-label="Navigation"
            >
              <div className="flex items-center justify-between h-[4.25rem] px-5 border-b border-outline-variant/60">
                <span className="font-display font-semibold text-lg tracking-tight">Devsphere</span>
                <button type="button" onClick={onClose} aria-label="Close menu" className="p-2 -mr-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <NavContent onNavigate={onClose} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
