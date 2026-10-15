import { useEffect, useMemo, useState } from "react";
import { Card } from "../ui/card";
import Toast from "../ui/toast";
import Avatar from "../ui/Avatar";
import { api } from "../../lib/api";
import {
  AddButton, ConfirmModal, DataTable, FilterTabs, FormModal, Modal, PageHeader, RowActions,
  SearchBox, SelectBox, StatGrid, StatCard, StatusBadge, useToast,
} from "./AdminUI";

/** Shared cell renderers so every page's table looks the same. */
// eslint-disable-next-line react-refresh/only-export-components
export const cell = {
  index: { key: "#", label: "#", render: (_r, i) => <span className="text-outline tabular-nums">{i + 1}</span>, className: "w-10" },
  title: (key = "title", label = "Title") => ({ key, label, render: (r) => <span className="font-medium">{r[key]}</span> }),
  status: { key: "status", label: "Status", render: (r) => <StatusBadge value={r.status} /> },
  pill: (key, label) => ({ key, label, render: (r) => <span className="inline-flex px-2 py-0.5 rounded-md bg-surface-container text-[11px] font-medium text-on-surface-variant">{r[key]}</span> }),
  muted: (key, label) => ({ key, label, render: (r) => <span className="text-on-surface-variant">{r[key]}</span> }),
  person: (key, label) => ({ key, label, render: (r) => <span className="flex items-center gap-2"><Avatar name={r[key]} size="sm" /><span>{r[key]}</span></span> }),
  status_badge: (key, label) => ({ key, label, render: (r) => <StatusBadge value={r[key]} /> }),
};

/**
 * Config-driven admin list page: header, stats, tabs, search, filters, table, add / edit / view / delete.
 * Every page in /admin that is "a table of things" is just a config for this component.
 *
 * view = { id, label, columns, fields, rows, addLabel, searchKeys, statusTabs, tabMatch, selects }
 */
export default function ManagerPage({ title, subtitle, stats, views, headerAction, tableTitle, noun = "item", viewTabs = false }) {
  const [activeView, setActiveView] = useState(views[0].id);
  const [data, setData] = useState(() => Object.fromEntries(views.map((v) => [v.id, v.rows ?? []])));
  const [loading, setLoading] = useState(true);
  const view = views.find((v) => v.id === activeView);

  const [tab, setTab] = useState(null);
  const [query, setQuery] = useState("");
  const [selectVals, setSelectVals] = useState({});
  const [form, setForm] = useState(null);      // { mode: "add" | "edit", row? }
  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [toast, notify] = useToast();

  useEffect(() => {
    let alive = true;
    Promise.all(views.map(async (v) => {
      try { const result = await api.get(`/admin/${v.resource ?? v.id}`); return [v.id, result.rows ?? []]; }
      catch { return [v.id, v.rows ?? []]; }
    })).then((entries) => { if (alive) setData(Object.fromEntries(entries)); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  // The view configuration is static for each admin page and intentionally does not change.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = view.statusTabs;
  const currentTab = tabs ? (tab && tabs.includes(tab) ? tab : tabs[0]) : null;
  const rows = data[view.id];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (currentTab && currentTab !== tabs[0]) {
        const ok = view.tabMatch ? view.tabMatch(r, currentTab) : r.status === currentTab;
        if (!ok) return false;
      }
      for (const s of view.selects ?? []) {
        const v = selectVals[s.key] ?? s.options[0];
        if (v !== s.options[0] && r[s.key] !== v) return false;
      }
      if (q && !(view.searchKeys ?? ["title"]).some((k) => String(r[k] ?? "").toLowerCase().includes(q))) return false;
      return true;
    });
  }, [rows, currentTab, tabs, query, selectVals, view]);

  const switchView = (id) => { setActiveView(id); setTab(null); setQuery(""); setSelectVals({}); };

  const save = async (values) => {
    try {
      const resource = view.resource ?? view.id;
      if (form.mode === "edit") {
        const result = await api.patch(`/admin/${resource}/${form.row.id}`, values);
        setData((d) => ({ ...d, [view.id]: d[view.id].map((r) => (r.id === form.row.id ? result.row : r)) }));
        notify("Changes saved");
      } else {
        const result = await api.post(`/admin/${resource}`, values);
        setData((d) => ({ ...d, [view.id]: [result.row, ...d[view.id]] }));
        notify(`${view.addNoun ?? noun} added`);
      }
      setForm(null);
    } catch (error) { notify(error.message || "Could not save changes", "error"); }
  };

  const remove = async () => {
    try {
      await api.delete(`/admin/${view.resource ?? view.id}/${deleting.id}`);
      setData((d) => ({ ...d, [view.id]: d[view.id].filter((r) => r.id !== deleting.id) }));
      setDeleting(null);
      notify(`${view.addNoun ?? noun} permanently deleted`);
    } catch (error) { notify(error.message || "Could not delete", "error"); }
  };

  const columns = [
    ...view.columns,
    { key: "actions", label: "Actions", align: "right", render: (r) => (
      <RowActions onView={() => setViewing(r)} onEdit={view.fields ? () => setForm({ mode: "edit", row: r }) : undefined} onDelete={() => setDeleting(r)} />
    ) },
  ];

  const action = headerAction ?? (view.addLabel && view.fields
    ? <AddButton onClick={() => setForm({ mode: "add" })}>{view.addLabel}</AddButton>
    : null);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={title} subtitle={subtitle} action={action} />

      {views.length > 1 && viewTabs && (
        <FilterTabs tabs={views.map((v) => v.label)} value={view.label} onChange={(l) => switchView(views.find((v) => v.label === l).id)} />
      )}

      {stats && (
        <StatGrid cols={stats.length}>
          {stats.map((s) => <StatCard key={s.label} {...s} />)}
        </StatGrid>
      )}

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-outline-variant/60">
          {tableTitle && !tabs ? <h2 className="font-display font-semibold">{tableTitle}</h2> : null}
          {tabs && <FilterTabs tabs={tabs} value={currentTab} onChange={setTab} />}
          <div className="flex flex-wrap items-center gap-2 ml-auto">
            {(view.selects ?? []).map((s) => (
              <SelectBox key={s.key} label={s.label} options={s.options} value={selectVals[s.key] ?? s.options[0]} onChange={(v) => setSelectVals((p) => ({ ...p, [s.key]: v }))} />
            ))}
            <SearchBox value={query} onChange={setQuery} placeholder={view.searchPlaceholder ?? "Search..."} className="w-52 sm:w-64" />
          </div>
        </div>
        {loading ? <div className="p-10 text-center text-sm text-on-surface-variant">Loading live records…</div> : <DataTable columns={columns} rows={filtered} empty={`No ${noun}s match your filters.`} />}
        <div className="px-4 py-3 border-t border-outline-variant/60 text-xs text-outline">
          Showing {filtered.length} of {rows.length} {noun}s
        </div>
      </Card>

      {view.fields && (
        <FormModal
          open={!!form} title={form?.mode === "edit" ? `Edit ${view.addNoun ?? noun}` : view.addLabel}
          fields={view.fields} initial={form?.row} onSubmit={save} onClose={() => setForm(null)}
          submitLabel={form?.mode === "edit" ? "Save changes" : "Create"}
        />
      )}

      <Modal open={!!viewing} title={viewing?.title ?? viewing?.name ?? "Details"} onClose={() => setViewing(null)}>
        <dl className="grid grid-cols-[8rem_1fr] gap-x-4 gap-y-3 text-sm">
          {viewing && Object.entries(viewing).filter(([k]) => k !== "id").map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-on-surface-variant capitalize">{k.replace(/([A-Z])/g, " $1")}</dt>
              <dd className="text-on-surface">{k === "status" ? <StatusBadge value={v} /> : String(v)}</dd>
            </div>
          ))}
        </dl>
      </Modal>

      <ConfirmModal open={!!deleting} onClose={() => setDeleting(null)} onConfirm={remove}
        message={`“${deleting?.title ?? deleting?.name ?? "This item"}” will be removed permanently.`} />

      <Toast message={toast?.message} tone={toast?.tone} />
    </div>
  );
}
