import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { ADMIN_NAV, ADMIN_ACCOUNT_NAV } from "./adminNav";

function Item({ item, onNavigate }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "relative flex items-center gap-3 h-9 px-3 rounded-lg text-sm transition-colors",
          isActive
            ? "bg-primary-container/[0.1] text-primary font-semibold"
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

function Content({ onNavigate }) {
  return (
    <>
      <nav className="flex flex-col gap-0.5 px-3 pt-4" aria-label="Admin">
        {ADMIN_NAV.map((i) => <Item key={i.label} item={i} onNavigate={onNavigate} />)}
      </nav>
      <div className="mt-auto p-3 flex flex-col gap-0.5 border-t border-outline-variant/60 mx-0">
        {ADMIN_ACCOUNT_NAV.map((i) => <Item key={i.label} item={i} onNavigate={onNavigate} />)}
      </div>
    </>
  );
}

export default function AdminSidebar({ open = false, onClose = () => {} }) {
  const { pathname } = useLocation();
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
        <Content />
      </aside>
      <AnimatePresence>
        {open && (
          <div className="lg:hidden fixed inset-0 z-[70]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-on-surface/40 backdrop-blur-[2px]" onClick={onClose} />
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
              className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] flex flex-col bg-surface-container-lowest shadow-xl overflow-y-auto">
              <div className="flex items-center justify-between h-16 px-4 border-b border-outline-variant/60">
                <span className="font-display font-semibold text-lg">Devsphere <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-container/10 text-primary align-middle">Admin</span></span>
                <button type="button" onClick={onClose} aria-label="Close menu" className="p-2 -mr-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Content onNavigate={onClose} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
