import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../../utils/cn";

/* ---------- Page title row ---------- */
export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-on-surface">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-on-surface-variant">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function AddButton({ children, onClick, icon: Icon = Plus }) {
  return (
    <Button onClick={onClick} className="h-10 px-4">
      <Icon className="w-4 h-4" /> {children}
    </Button>
  );
}

/* ---------- KPI card ---------- */
const TONES = {
  primary: "bg-primary-container/10 text-primary",
  success: "bg-success-container text-success",
  warning: "bg-warning-container text-warning",
  info: "bg-secondary-fixed text-secondary",
  critical: "bg-critical-container text-critical",
};

export function StatCard({ icon: Icon, label, value, tone = "primary", note, noteTone }) {
  return (
    <Card className="p-4 flex items-center gap-3.5">
      <div className={cn("w-11 h-11 rounded-xl grid place-items-center shrink-0", TONES[tone])}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-on-surface-variant truncate">{label}</p>
        <p className="text-2xl font-bold tabular-nums leading-tight text-on-surface">{value}</p>
        {note && <p className={cn("text-[11px] mt-0.5 truncate", noteTone === "up" ? "text-success" : "text-outline")}>{note}</p>}
      </div>
    </Card>
  );
}

const GRID = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5" };
export function StatGrid({ children, cols = 4 }) {
  return <div className={cn("grid gap-4 grid-cols-2", GRID[cols] ?? GRID[4])}>{children}</div>;
}

/* ---------- Status / category pills ---------- */
const STATUS_VARIANT = {
  Published: "success", Active: "success", Resolved: "success", Approved: "success", Featured: "success",
  Draft: "warning", Pending: "warning", Inactive: "muted", Archived: "muted",
  Reported: "critical", Rejected: "critical", Banned: "critical",
  Easy: "success", Medium: "warning", Hard: "critical",
};

export function StatusBadge({ value }) {
  return <Badge variant={STATUS_VARIANT[value] ?? "neutral"}>{value}</Badge>;
}

/* ---------- Search box ---------- */
export function SearchBox({ value, onChange, placeholder = "Search...", className }) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline pointer-events-none" />
      <input
        value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} aria-label={placeholder}
        className="w-full h-9 pl-9 pr-3 rounded-lg text-sm bg-surface-container-lowest border border-outline-variant outline-none placeholder:text-outline hover:border-outline focus:border-primary-container focus:ring-4 focus:ring-primary-container/15"
      />
    </div>
  );
}

/* ---------- Pill tabs (All / Published / Draft ...) ---------- */
export function FilterTabs({ tabs, value, onChange }) {
  return (
    <div role="tablist" className="inline-flex items-center gap-1 p-1 rounded-lg bg-surface-container-low border border-outline-variant/50 overflow-x-auto max-w-full">
      {tabs.map((t) => (
        <button key={t} type="button" role="tab" aria-selected={value === t} onClick={() => onChange(t)}
          className={cn("px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors",
            value === t ? "bg-primary-container text-on-primary shadow-xs" : "text-on-surface-variant hover:text-on-surface")}>
          {t}
        </button>
      ))}
    </div>
  );
}

export function SelectBox({ value, onChange, options, label }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}
      className="h-9 px-3 rounded-lg text-sm bg-surface-container-lowest text-on-surface border border-outline-variant outline-none hover:border-outline focus:border-primary-container focus:ring-4 focus:ring-primary-container/15">
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

/* ---------- Row action icons ---------- */
export function RowActions({ onView, onEdit, onDelete }) {
  const base = "w-8 h-8 grid place-items-center rounded-md transition-colors";
  return (
    <div className="flex items-center justify-end gap-0.5">
      {onView && <button type="button" aria-label="View" onClick={onView} className={cn(base, "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface")}><Eye className="w-4 h-4" /></button>}
      {onEdit && <button type="button" aria-label="Edit" onClick={onEdit} className={cn(base, "text-primary hover:bg-primary-container/10")}><Pencil className="w-4 h-4" /></button>}
      {onDelete && <button type="button" aria-label="Delete" onClick={onDelete} className={cn(base, "text-critical hover:bg-critical-container")}><Trash2 className="w-4 h-4" /></button>}
    </div>
  );
}

/* ---------- Data table ----------
   columns: [{ key, label, render?(row, index), align?, className? }] */
export function DataTable({ columns, rows, rowKey = "id", empty = "Nothing here yet." }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-outline-variant/70 text-left">
            {columns.map((c) => (
              <th key={c.key} className={cn("px-4 py-3 text-xs font-semibold text-on-surface-variant whitespace-nowrap", c.align === "right" && "text-right")}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row[rowKey]} className="border-b border-outline-variant/40 last:border-0 hover:bg-surface-container-low/60 transition-colors">
              {columns.map((c) => (
                <td key={c.key} className={cn("px-4 py-3 align-middle text-on-surface", c.align === "right" && "text-right", c.className)}>
                  {c.render ? c.render(row, i) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-outline">{empty}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Modal shell ---------- */
export function Modal({ open, title, onClose, children, footer, width = "max-w-lg" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div role="dialog" aria-modal="true" aria-label={title}
            initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn("relative z-10 w-full max-h-[90vh] flex flex-col rounded-2xl bg-surface-container-lowest border border-outline-variant/50 shadow-xl", width)}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/60">
              <h2 className="font-display text-lg font-semibold">{title}</h2>
              <button type="button" onClick={onClose} aria-label="Close" className="p-1.5 -mr-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 overflow-y-auto">{children}</div>
            {footer && <div className="flex justify-end gap-2 px-5 py-4 border-t border-outline-variant/60">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Add / edit form ----------
   fields: [{ name, label, type?: "text"|"number"|"select", options?, placeholder? }] */
export function FormModal({ open, title, fields, initial, onSubmit, onClose, submitLabel = "Save" }) {
  const [values, setValues] = useState({});
  useEffect(() => {
    if (!open) return;
    const base = {};
    fields.forEach((f) => {
      const raw = initial?.[f.name];
      if (raw !== undefined && raw !== null) {
        base[f.name] = f.name === "progress" && typeof raw === "object" ? raw.percent : Array.isArray(raw) ? (f.name === "openPositions" ? JSON.stringify(raw, null, 2) : raw.join(", ")) : typeof raw === "object" ? JSON.stringify(raw, null, 2) : raw;
      } else base[f.name] = f.type === "select" ? f.options[0] : "";
    });
    // Form state must reset when a different record is opened.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues(base);
  }, [open, initial, fields]);

  const set = (name, v) => setValues((s) => ({ ...s, [name]: v }));
  const valid = fields.filter((f) => f.required !== false).every((f) => String(values[f.name] ?? "").trim() !== "");

  return (
    <Modal open={open} title={title} onClose={onClose}
      footer={<>
        <Button variant="surface" onClick={onClose}>Cancel</Button>
        <Button disabled={!valid} onClick={() => onSubmit(values)}>{submitLabel}</Button>
      </>}>
      <form onSubmit={(e) => { e.preventDefault(); valid && onSubmit(values); }} className="grid gap-4 md:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={cn("grid gap-1.5", f.full && "md:col-span-2")}>
            <Label htmlFor={`f-${f.name}`}>{f.label}</Label>
            {f.type === "select" ? (
              <select id={`f-${f.name}`} value={values[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)}
                className="w-full h-11 px-3 rounded-lg text-sm bg-surface-container-lowest text-on-surface border border-outline-variant outline-none hover:border-outline focus:border-primary-container focus:ring-4 focus:ring-primary-container/15">
                {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : f.type === "textarea" ? (
              <textarea id={`f-${f.name}`} rows={f.rows ?? 4} placeholder={f.placeholder} value={values[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm bg-surface-container-lowest text-on-surface border border-outline-variant outline-none resize-y hover:border-outline focus:border-primary-container focus:ring-4 focus:ring-primary-container/15" />
            ) : (
              <Input id={`f-${f.name}`} type={f.type ?? "text"} placeholder={f.placeholder} value={values[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} />
            )}
          </div>
        ))}
        <button type="submit" className="hidden" />
      </form>
    </Modal>
  );
}

export function ConfirmModal({ open, title = "Delete item?", message, onConfirm, onClose }) {
  return (
    <Modal open={open} title={title} onClose={onClose} width="max-w-md"
      footer={<>
        <Button variant="surface" onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} className="bg-critical hover:bg-critical/90">Delete</Button>
      </>}>
      <p className="text-sm text-on-surface-variant">{message ?? "This action cannot be undone."}</p>
    </Modal>
  );
}

/* ---------- Tiny toast hook ---------- */
// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const [toast, setToast] = useState(null);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);
  return [toast, (message, tone = "success") => setToast({ message, tone })];
}
