import { useEffect, useState } from "react";
import { Flame, Medal, Trophy } from "lucide-react";
import { Card } from "../../ui/card";
import { api } from "../../../lib/api";

const periods = ["daily", "weekly", "all-time"];
export default function LeaderboardPanel({ challenge }) {
  const [period, setPeriod] = useState("daily");
  const [data, setData] = useState({ leaderboard: [], streak: 0 });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    api.get(`/coding/leaderboard?period=${period}`).then((result) => mounted && setData(result)).catch(() => mounted && setData({ leaderboard: [], streak: 0 })).finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [period]);
  return <Card className="p-lg"><div className="flex flex-col md:flex-row md:items-center justify-between gap-md"><div><div className="flex items-center gap-2"><Trophy className="w-5 h-5 text-warning" /><h2 className="font-display text-lg font-semibold">Challenge leaderboard</h2></div><p className="text-xs text-on-surface-variant mt-1">{challenge ? `Earn ${challenge.points || 100} points for solving ${challenge.title}.` : "Solve problems to earn points and build your streak."}</p></div><div className="flex items-center gap-2 text-xs font-semibold text-warning"><Flame className="w-4 h-4" /> {data.streak || 0} day streak</div></div><div className="flex gap-1 mt-md border-b border-outline-variant/60 pb-2">{periods.map((item) => <button key={item} onClick={() => setPeriod(item)} className={`px-3 py-1.5 rounded-full capitalize text-xs font-semibold ${period === item ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>{item}</button>)}</div>{loading ? <p className="py-md text-center text-xs text-on-surface-variant">Loading rankings…</p> : data.leaderboard.length === 0 ? <p className="py-md text-center text-xs text-on-surface-variant">No accepted submissions in this period yet. Be the first on the board.</p> : <div className="mt-sm divide-y divide-outline-variant/50">{data.leaderboard.slice(0, 8).map((row) => <div key={row.userId} className="flex items-center gap-sm py-2"><span className="w-6 text-center text-xs font-bold text-on-surface-variant">{row.rank <= 3 ? <Medal className={`w-4 h-4 mx-auto ${row.rank === 1 ? "text-warning" : row.rank === 2 ? "text-outline" : "text-critical"}`} /> : row.rank}</span><div className="flex-1 min-w-0"><p className="text-sm font-semibold truncate">{row.name}</p><p className="text-[11px] text-on-surface-variant">{row.solved} solved</p></div><span className="text-sm font-bold text-primary">{row.points} pts</span></div>)}</div>}</Card>;
}
