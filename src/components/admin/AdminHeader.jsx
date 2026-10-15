import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, LayoutGrid, LogOut, Menu, Moon, Search, Settings, Sun, UserCircle, Flame } from "lucide-react";
import Avatar from "../ui/Avatar";
import { useProfile, useSettings, resetUserData } from "../../lib/userStore";
import { api } from "../../lib/api";

export default function AdminHeader({ onMenuClick, onSearch }) {
  const navigate = useNavigate();
  const [profile] = useProfile();
  const [{ appearance }, updateSettings] = useSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const dark = appearance.theme === "dark";

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => !menuRef.current?.contains(e.target) && setMenuOpen(false);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [menuOpen]);

  const toggleTheme = () => updateSettings((s) => ({ appearance: { ...s.appearance, theme: dark ? "light" : "dark" } }));

  const logout = async () => {
    try { if (localStorage.getItem("devsphere_token")) await api.post("/me/logout"); } catch { /* ignore */ }
    resetUserData();
    navigate("/login");
  };

  const iconBtn = "relative w-9 h-9 grid place-items-center rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors";
  const itemCls = "flex w-full items-center gap-2.5 px-3 py-2 rounded-md text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface";

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 bg-surface-container-lowest/85 backdrop-blur-md border-b border-outline-variant/70 flex items-center justify-between gap-3 px-4 lg:px-6">
      <div className="flex items-center gap-2 lg:w-60 shrink-0">
        <button type="button" onClick={onMenuClick} aria-label="Open menu" className="lg:hidden p-2 -ml-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low">
          <Menu className="w-5 h-5" />
        </button>
        <Link to="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-container to-primary flex items-center justify-center shadow-sm ring-1 ring-inset ring-white/20">
            <span className="font-code text-[13px] font-semibold text-on-primary leading-none">{"</>"}</span>
          </div>
          <span className="font-display font-semibold text-[17px] tracking-tight hidden sm:inline">Devsphere</span>
          <span className="hidden sm:inline text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary-container/10 text-primary">Admin</span>
        </Link>
      </div>

      <div className="flex-1 hidden md:flex justify-center">
        <div className="relative w-full max-w-[36rem]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none" />
          <input
            type="text" aria-label="Search admin" placeholder="Search users, content, projects, questions..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full h-10 pl-10 pr-3 rounded-lg text-sm text-on-surface placeholder:text-outline outline-none bg-surface-container-low border border-outline-variant/70 hover:border-outline-variant focus:bg-surface-container-lowest focus:border-primary-container focus:ring-4 focus:ring-primary-container/15 transition-[background-color,border-color,box-shadow]"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-1.5 justify-end">
        <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className={iconBtn}>
          {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>
        <button type="button" aria-label="Notifications" className={iconBtn}>
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-critical ring-2 ring-surface-container-lowest" />
        </button>
        <button type="button" aria-label="Alerts" className={iconBtn}>
          <Flame className="w-[18px] h-[18px]" />
          <span className="absolute -top-0.5 right-1 min-w-4 h-4 px-1 grid place-items-center rounded-full bg-critical text-[10px] font-semibold text-white">3</span>
        </button>

        <div className="relative" ref={menuRef}>
          <button type="button" onClick={() => setMenuOpen((o) => !o)} aria-haspopup="menu" aria-expanded={menuOpen}
            className="flex items-center gap-2 pl-1 pr-2 h-9 rounded-full hover:bg-surface-container-low transition-colors">
            <Avatar name={profile.name} src={profile.avatar} size="sm" ring />
            <span className="text-sm font-medium hidden sm:block">Admin</span>
            <ChevronDown className="w-3.5 h-3.5 text-outline hidden sm:block" />
          </button>
          {menuOpen && (
            <div role="menu" className="absolute right-0 mt-2 w-56 rounded-xl bg-surface-container-lowest border border-outline-variant/70 shadow-lg p-1.5">
              <div className="px-3 py-2.5 mb-1 border-b border-outline-variant/60">
                <p className="text-sm font-semibold">{profile.name}</p>
                <p className="text-xs text-outline">Administrator</p>
              </div>
              <Link role="menuitem" to="/profile" className={itemCls} onClick={() => setMenuOpen(false)}><UserCircle className="w-4 h-4" />View profile</Link>
              <Link role="menuitem" to="/admin/settings" className={itemCls} onClick={() => setMenuOpen(false)}><Settings className="w-4 h-4" />Settings</Link>
              <Link role="menuitem" to="/dashboard" className={itemCls} onClick={() => setMenuOpen(false)}><LayoutGrid className="w-4 h-4" />Back to app</Link>
              <button role="menuitem" type="button" onClick={logout} className={`${itemCls} hover:!text-error`}><LogOut className="w-4 h-4" />Log out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
