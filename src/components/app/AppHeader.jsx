import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell, ChevronDown, Code2, CornerDownLeft, Flame, HelpCircle, LayoutGrid, Library,
  LogOut, Menu, Newspaper, Route, Search, Settings, Terminal, UserCircle, Users, X,
} from "lucide-react";
import Avatar from "../ui/Avatar";
import { useProfile, resetUserData } from "../../lib/userStore";
import { api } from "../../lib/api";
import { cn } from "../../utils/cn";

const isMac = typeof navigator !== "undefined" && /mac|iphone|ipad/i.test(navigator.platform);

// Where a typed query can be searched. Each page reads `?q=` from the URL.
// TODO(backend): swap for a single GET /search?q= that returns grouped results.
const SEARCH_SCOPES = [
  { label: "Questions", to: "/questions" },
  { label: "Roadmaps", to: "/roadmaps" },
  { label: "Projects", to: "/projects" },
  { label: "Mentors", to: "/mentorship" },
];

// Pages that exist today. Add new ones here when you build them.
const PAGES = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutGrid },
  { label: "Roadmaps", to: "/roadmaps", icon: Route },
  { label: "Coding", to: "/coding", icon: Terminal },
  { label: "Resources", to: "/resources", icon: Library },
  { label: "Questions", to: "/questions", icon: HelpCircle },
  { label: "Mentorship", to: "/mentorship", icon: Users },
  { label: "News", to: "/news", icon: Newspaper },
  { label: "Projects", to: "/projects", icon: Code2 },
  { label: "Profile", to: "/profile", icon: UserCircle },
  { label: "Settings", to: "/settings", icon: Settings },
];

function HeaderSearch({ autoFocus = false, onDone, className }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const rootRef = useRef(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return PAGES.map((p) => ({ key: p.to, label: p.label, hint: "Go to page", icon: p.icon, to: p.to }));
    const pages = PAGES.filter((p) => p.label.toLowerCase().includes(q.toLowerCase()))
      .map((p) => ({ key: p.to, label: p.label, hint: "Go to page", icon: p.icon, to: p.to }));
    const scoped = SEARCH_SCOPES.map((s) => ({
      key: `${s.to}?q`, label: `Search ${s.label.toLowerCase()} for “${q}”`, hint: s.label, icon: Search,
      to: `${s.to}?q=${encodeURIComponent(q)}`,
    }));
    return [...scoped, ...pages];
  }, [query]);

  useEffect(() => { if (autoFocus) inputRef.current?.focus(); }, [autoFocus]);

  // Global shortcuts: Cmd/Ctrl+K, or "/" when not typing somewhere else
  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea|select/i.test(e.target.tagName) || e.target.isContentEditable;
      if (((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") || (e.key === "/" && !typing)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => !rootRef.current?.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const go = (item) => {
    if (!item) return;
    navigate(item.to);
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
    onDone?.();
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((i) => (i + 1) % results.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => (i - 1 + results.length) % results.length); }
    else if (e.key === "Enter") { e.preventDefault(); go(results[active]); }
    else if (e.key === "Escape") {
      if (query) setQuery(""); else { setOpen(false); inputRef.current?.blur(); onDone?.(); }
    }
  };

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-outline pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open ? `${listId}-${active}` : undefined}
          aria-label="Search Devsphere"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActive(0); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search Devsphere"
          className={cn(
            "w-full h-10 pl-10 pr-16 rounded-lg text-sm text-on-surface placeholder:text-outline outline-none",
            "bg-surface-container-low border border-outline-variant/70 hover:border-outline-variant",
            "focus:bg-surface-container-lowest focus:border-primary-container focus:ring-4 focus:ring-primary-container/15",
            "transition-[background-color,border-color,box-shadow]"
          )}
        />
        <div className="absolute right-2 flex items-center">
          {query ? (
            <button type="button" aria-label="Clear search" onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className="w-6 h-6 grid place-items-center rounded-md text-outline hover:text-on-surface hover:bg-surface-container">
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:block whitespace-nowrap px-1.5 h-5 leading-[18px] bg-surface-container-lowest border border-outline-variant rounded text-[11px] font-code text-on-surface-variant pointer-events-none">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          )}
        </div>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 z-[60] rounded-xl bg-surface-container-lowest border border-outline-variant/70 shadow-lg overflow-hidden">
          <p className="px-3.5 pt-3 pb-1.5 text-xs font-medium text-outline">{query ? "Results" : "Jump to"}</p>
          <ul id={listId} role="listbox" className="max-h-[22rem] overflow-y-auto p-1.5 pt-0">
            {results.map((r, i) => {
              const Icon = r.icon;
              return (
                <li key={r.key} id={`${listId}-${i}`} role="option" aria-selected={i === active}
                  onMouseEnter={() => setActive(i)} onMouseDown={(e) => e.preventDefault()} onClick={() => go(r)}
                  className={cn("flex items-center gap-3 px-2.5 h-10 rounded-lg text-sm cursor-pointer",
                    i === active ? "bg-primary-container/[0.08] text-primary" : "text-on-surface")}>
                  <Icon className="w-4 h-4 shrink-0 text-outline" strokeWidth={1.75} />
                  <span className="flex-1 truncate">{r.label}</span>
                  <span className="text-xs text-outline shrink-0">{r.hint}</span>
                  {i === active && <CornerDownLeft className="w-3.5 h-3.5 shrink-0 text-primary/70" />}
                </li>
              );
            })}
            {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-outline">No matches</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

// TODO(backend): streakDays should come from the API too; the user comes from lib/userStore for now.
export default function AppHeader({ streakDays = 14, onMenuClick }) {
  const navigate = useNavigate();
  const [profile] = useProfile();
  const user = { name: profile.name, handle: profile.username, avatar: profile.avatar, role: profile.role };
  const isAdmin = String(user.role || "").toLowerCase() === "admin";
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  // close user menu on outside click / Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => !menuRef.current?.contains(e.target) && setMenuOpen(false);
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  const logout = async () => {
    try {
      if (localStorage.getItem("devsphere_token")) {
        await api.post("/me/logout");
      }
    } catch {
      // ignore network errors on logout
    }
    resetUserData();
    navigate("/login");
  };

  const itemCls = "flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors";

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-[4.25rem] bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/70 flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-gutter">
      <div className="flex items-center gap-3 lg:w-60 shrink-0">
        <button type="button" onClick={onMenuClick} aria-label="Open menu" className="lg:hidden w-10 h-10 grid place-items-center -ml-2 rounded-xl text-on-surface-variant hover:bg-surface-container-low">
          <Menu className="w-5 h-5" />
        </button>
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-container to-primary flex items-center justify-center shadow-sm ring-1 ring-inset ring-white/20">
            <span className="font-code text-[13px] font-semibold text-on-primary leading-none">{"</>"}</span>
          </div>
          <span className="font-display font-semibold text-[17px] tracking-tight text-on-surface hidden sm:inline">Devsphere</span>
        </Link>
      </div>

      <div className="flex-1 hidden md:flex justify-center px-4">
        <HeaderSearch className="w-full max-w-[38rem]" />
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2.5 justify-end shrink-0">
        <button type="button" onClick={() => setMobileSearch(true)} aria-label="Search" className="md:hidden w-9 h-9 grid place-items-center rounded-lg text-on-surface-variant hover:bg-surface-container-low">
          <Search className="w-[18px] h-[18px]" />
        </button>
        <div className="flex items-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-full bg-warning-container text-warning" title={`${streakDays} day streak`}>
          <Flame className="w-4 h-4" />
          <span className="text-xs font-semibold tabular-nums">{streakDays}</span>
          <span className="text-xs hidden sm:inline">day streak</span>
        </div>

        <button type="button" aria-label="Notifications" className="relative w-10 h-10 grid place-items-center rounded-xl text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-critical ring-2 ring-surface-container-lowest" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="flex items-center gap-2 pl-1 pr-2 h-10 rounded-full hover:bg-surface-container-low transition-colors"
          >
            <Avatar name={user.name} src={user.avatar} size="sm" ring />
            <ChevronDown className="w-3.5 h-3.5 text-outline hidden sm:block" />
          </button>

          {menuOpen && (
            <div role="menu" className="absolute right-0 mt-3 w-64 rounded-2xl bg-surface-container-lowest border border-outline-variant/70 shadow-xl p-2">
              <div className="px-3 py-3 mb-1 border-b border-outline-variant/60">
                <p className="text-sm font-semibold text-on-surface">{user.name}</p>
                <p className="text-xs text-outline">@{user.handle || "member"}</p>
                {user.role && <span className="inline-flex mt-2 px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary text-[10px] font-semibold">{user.role}</span>}
              </div>
              <Link role="menuitem" to="/profile" className={itemCls} onClick={() => setMenuOpen(false)}><UserCircle className="w-4 h-4" />View profile</Link>
              {isAdmin && <Link role="menuitem" to="/admin" className={cn(itemCls, "text-primary font-semibold bg-primary-container/[0.08] hover:bg-primary-container/[0.14]")} onClick={() => setMenuOpen(false)}><LayoutGrid className="w-4 h-4" />Admin Panel<span className="ml-auto text-[10px] font-medium text-primary/70">Manage</span></Link>}
              <Link role="menuitem" to="/settings" className={itemCls} onClick={() => setMenuOpen(false)}><Settings className="w-4 h-4" />Settings</Link>
              <button role="menuitem" type="button" onClick={logout} className={`${itemCls} hover:!text-error`}><LogOut className="w-4 h-4" />Log out</button>
            </div>
          )}
        </div>
      </div>

      {mobileSearch && (
        <div className="md:hidden absolute inset-0 z-10 flex items-center gap-2 px-4 bg-surface-container-lowest">
          <HeaderSearch autoFocus onDone={() => setMobileSearch(false)} />
          <button type="button" onClick={() => setMobileSearch(false)} className="text-sm font-medium text-on-surface-variant px-1">Cancel</button>
        </div>
      )}
    </header>
  );
}
