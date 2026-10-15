import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CornerDownLeft, Search, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { NAV_GROUPS } from "./navConfig";

const isMac = typeof navigator !== "undefined" && /mac|iphone|ipad/i.test(navigator.platform);

// Where a typed query can be searched. Each page reads `?q=` from the URL.
// TODO(backend): swap for a single GET /search?q= that returns grouped results.
const SEARCH_SCOPES = [
  { label: "Questions", to: "/questions" },
  { label: "Roadmaps", to: "/roadmaps" },
  { label: "Projects", to: "/projects" },
  { label: "Mentors", to: "/mentorship" },
];

const PAGES = NAV_GROUPS.flatMap((g) => g.items).filter((i) => i.ready);

export default function HeaderSearch({ autoFocus = false, onDone, className }) {
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
            <kbd className="hidden sm:block px-1.5 h-5 leading-[18px] bg-surface-container-lowest border border-outline-variant rounded text-[11px] font-code text-on-surface-variant pointer-events-none">
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
