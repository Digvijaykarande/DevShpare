import { useEffect, useState } from "react";
import { Hand, TrendingUp, Trophy, Users, FileText, Rocket, Activity, CalendarDays } from "lucide-react";
import { Card } from "../../components/ui/card";
import { FilterTabs, StatCard, StatGrid } from "../../components/admin/AdminUI";
import { GrowthChart, Donut } from "../../components/admin/Charts";
import { DASHBOARD } from "./data/adminData";
import { api } from "../../lib/api";

const ICONS = { users: Users, content: FileText, projects: Rocket, competitions: Trophy };
const TONES = { users: "primary", content: "info", projects: "success", competitions: "warning" };

export default function AdminDashboardPage() {
  const [series, setSeries] = useState("Users");
  const [live, setLive] = useState(null);
  useEffect(() => { api.get("/admin/dashboard").then(setLive).catch(() => {}); }, []);
  const g = DASHBOARD.growth[series];
  const total = DASHBOARD.distribution.reduce((a, d) => a + d.value, 0);
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight flex items-center gap-2">Welcome back, Admin <Hand className="w-6 h-6 text-warning" /></h1>
          <p className="mt-1 text-sm text-on-surface-variant">Manage, monitor and grow the Devsphere community.</p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-primary"><CalendarDays className="w-3.5 h-3.5" />{today}</p>
        </div>
        <Card className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 rounded-full grid place-items-center bg-success-container text-success"><Activity className="w-4 h-4" /></div>
          <div>
            <p className="text-sm font-semibold">Platform Status</p>
            <p className="text-xs text-success flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-success" />All systems operational</p>
          </div>
        </Card>
      </div>

      <StatGrid>
        {(live?.kpis || DASHBOARD.kpis).map((k) => (
          <div key={k.id} className="relative">
            <StatCard icon={ICONS[k.id]} tone={TONES[k.id]} label={k.label} value={k.value} note={k.note} />
            <span className="absolute top-3 right-3 inline-flex items-center gap-0.5 text-[11px] font-semibold text-success">
              <TrendingUp className="w-3 h-3" />{k.trend}
            </span>
          </div>
        ))}
      </StatGrid>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <Card className="xl:col-span-3 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="font-display font-semibold flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" />User Growth</h2>
            <FilterTabs tabs={Object.keys(DASHBOARD.growth)} value={series} onChange={setSeries} />
          </div>
          <div className="flex items-center gap-4 mb-2 text-xs text-on-surface-variant">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]" />New {series}</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#a78bfa]" />Active {series}</span>
          </div>
          <GrowthChart labels={DASHBOARD.months} newSeries={g.newSeries} activeSeries={g.activeSeries} />
        </Card>

        <Card className="xl:col-span-2 p-5">
          <h2 className="font-display font-semibold mb-4">Content Distribution</h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Donut data={DASHBOARD.distribution} centerLabel="Total Content" />
            <ul className="flex flex-col gap-2.5 text-sm min-w-40">
              {DASHBOARD.distribution.map((d) => (
                <li key={d.label} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="flex-1 text-on-surface-variant">{d.label}</span>
                  <span className="tabular-nums font-medium">{d.value.toLocaleString()}</span>
                  <span className="tabular-nums text-xs text-outline w-9 text-right">{Math.round((d.value / total) * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
