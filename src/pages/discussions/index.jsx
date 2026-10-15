import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, MessageCircle, Plus, Search, ThumbsUp, X } from "lucide-react";
import { api } from "../../lib/api";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import Avatar from "../../components/ui/Avatar";
import Toast from "../../components/ui/toast";

const tabs = ["latest", "active", "top", "unanswered", "solved"];
const emptyForm = { title: "", body: "", tags: "" };
const authorName = (author) => typeof author === "object" ? author?.name || "Developer" : author || "Developer";

export default function DiscussionsPage() {
  const [discussions, setDiscussions] = useState([]);
  const [tab, setTab] = useState("latest");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [answer, setAnswer] = useState("");
  const [composeOpen, setComposeOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const signedIn = Boolean(localStorage.getItem("devsphere_token"));
  const notify = (message) => setToast(message);
  const load = useCallback(async () => {
    setLoading(true);
    try { const data = await api.get(`/discussions?tab=${tab}&search=${encodeURIComponent(search)}`); setDiscussions(data.discussions || []); }
    catch (error) { notify(error.message || "Couldn't load discussions"); }
    finally { setLoading(false); }
  }, [search, tab]);
  // The effect subscribes the selected feed tab to the remote API; the state updates happen in its async callbacks.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);
  const stats = useMemo(() => ({ total: discussions.length, solved: discussions.filter((d) => d.solved).length, unanswered: discussions.filter((d) => !d.answerCount).length }), [discussions]);
  const submit = async (event) => {
    event.preventDefault();
    if (!signedIn) return notify("Please sign in to start a discussion");
    try { const data = await api.post("/discussions", { ...form, tags: form.tags.split(",") }); setDiscussions((items) => [data.discussion, ...items]); setForm(emptyForm); setComposeOpen(false); notify("Discussion published"); }
    catch (error) { notify(error.data?.error || error.message || "Couldn't publish discussion"); }
  };
  const open = async (item) => { setSelected(item); try { const data = await api.get(`/discussions/${item.id || item._id}`); setSelected(data.discussion); } catch { notify("Couldn't open this discussion"); } };
  const postAnswer = async (event) => {
    event.preventDefault();
    if (!selected || !answer.trim()) return;
    if (!signedIn) return notify("Please sign in to reply");
    try { const data = await api.post(`/discussions/${selected.id || selected._id}/answers`, { body: answer }); setSelected(data.discussion); setDiscussions((items) => items.map((item) => item.id === selected.id ? data.discussion : item)); setAnswer(""); notify("Reply added"); }
    catch (error) { notify(error.data?.error || error.message || "Couldn't add reply"); }
  };
  const vote = async (item) => { if (!signedIn) return notify("Please sign in to vote"); try { const data = await api.post(`/discussions/${item.id || item._id}/vote`, { direction: "up" }); setDiscussions((items) => items.map((row) => row.id === item.id ? { ...row, votes: data.votes } : row)); } catch { notify("Couldn't save vote"); } };
  const accept = async (item, reply) => { try { await api.post(`/discussions/${item.id || item._id}/answers/${reply._id}/accept`); const data = await api.get(`/discussions/${item.id || item._id}`); setSelected(data.discussion); notify("Answer marked as accepted"); } catch (error) { notify(error.data?.error || "Only the discussion author can accept an answer"); } };
  return <div className="max-w-[88rem] mx-auto flex flex-col gap-xl">
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-lg"><div><span className="text-xs font-code font-semibold text-primary">Community help desk</span><h1 className="font-display text-3xl font-semibold tracking-tight mt-1">Discussions that unblock you</h1><p className="text-sm text-on-surface-variant mt-2 max-w-2xl">Post the bug, error, or learning question you are stuck on. Get practical answers from developers who have solved it before.</p></div><Button variant="primary" onClick={() => setComposeOpen(true)}><Plus className="w-4 h-4" /> Start discussion</Button></header>
    <div className="grid grid-cols-3 gap-sm max-w-xl"><Metric label="Threads" value={stats.total} /><Metric label="Solved" value={stats.solved} /><Metric label="Need answers" value={stats.unanswered} /></div>
    <div className="flex flex-col lg:flex-row gap-lg items-start"><main className="flex-1 min-w-0 flex flex-col gap-md w-full"><div className="flex flex-col sm:flex-row gap-sm"><div className="relative flex-1"><Search className="absolute left-3 top-2.5 w-4 h-4 text-outline" /><input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && load()} placeholder="Search errors, concepts, or tags" className="w-full h-10 pl-10 pr-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-sm outline-none focus:border-primary" /></div><Button variant="surface" onClick={load}>Search</Button></div><div className="flex flex-wrap gap-1 border-b border-outline-variant/60 pb-2">{tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${tab === item ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>{item}</button>)}</div>{loading ? <p className="py-16 text-center text-sm text-on-surface-variant">Loading discussions…</p> : discussions.length === 0 ? <Card className="p-xl text-center"><MessageCircle className="mx-auto w-8 h-8 text-primary" /><h2 className="font-display font-semibold mt-3">No discussions yet</h2><p className="text-sm text-on-surface-variant mt-1">Be the first person to document a problem and help the next learner.</p></Card> : discussions.map((item) => <DiscussionCard key={item.id || item._id} item={item} onOpen={() => open(item)} onVote={() => vote(item)} />)}</main><aside className="w-full lg:w-72 flex flex-col gap-md"><Card className="p-lg"><h2 className="font-display font-semibold">How to get useful answers</h2><ol className="mt-md space-y-3 text-sm text-on-surface-variant list-decimal list-inside"><li>Show the smallest reproducible example.</li><li>Share what you expected and what happened.</li><li>Include the error message and environment.</li></ol></Card><Card className="p-lg"><h2 className="font-display font-semibold">Need focused guidance?</h2><p className="text-sm text-on-surface-variant mt-2">Browse mentors for a private 1:1 session when a thread needs more context.</p><a href="/mentorship" className="inline-block text-sm font-semibold text-primary mt-md">Find a mentor →</a></Card></aside></div>
    {composeOpen && <Modal title="Start a discussion" onClose={() => setComposeOpen(false)}><form onSubmit={submit} className="space-y-md"><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="What are you stuck on?" className="field" /><textarea required rows={7} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Explain the problem, include code or errors…" className="field resize-none" /><input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Tags, separated by commas" className="field" /><Button type="submit" variant="primary">Publish discussion</Button></form></Modal>}
    {selected && <Modal title={selected.title} onClose={() => setSelected(null)}><div className="space-y-lg"><div className="flex gap-sm items-center"><Avatar name={authorName(selected.author)} size="sm" /><span className="text-xs text-on-surface-variant">Asked by {authorName(selected.author)} · {selected.views} views</span>{selected.solved && <Badge variant="success">Solved</Badge>}</div><p className="text-sm whitespace-pre-wrap leading-relaxed">{selected.body}</p><div className="flex flex-wrap gap-1">{(selected.tags || []).map((tag) => <Badge key={tag} variant="code">{tag}</Badge>)}</div><div className="border-t border-outline-variant/60 pt-md space-y-md"><h3 className="font-display font-semibold">{selected.answers?.length || 0} replies</h3>{(selected.answers || []).map((reply) => <div key={reply._id} className={`p-md rounded-xl border ${reply.accepted ? "border-success/50 bg-success/5" : "border-outline-variant/60"}`}><div className="flex items-center gap-sm text-xs"><Avatar name={authorName(reply.author)} size="xs" /><span className="font-semibold">{authorName(reply.author)}</span>{reply.accepted && <span className="text-success flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Accepted</span>}</div><p className="text-sm whitespace-pre-wrap mt-2">{reply.body}</p>{!selected.solved && <button onClick={() => accept(selected, reply)} className="text-xs text-primary font-semibold mt-2">Accept this answer</button>}</div>)}<form onSubmit={postAnswer} className="flex gap-sm"><textarea required rows={3} value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Share a helpful answer…" className="field flex-1 resize-none" /><Button type="submit" variant="primary">Reply</Button></form></div></div></Modal>}
    <Toast message={toast} />
  </div>;
}
function Metric({ label, value }) { return <Card className="px-md py-sm"><div className="font-display font-bold text-xl">{value}</div><div className="text-xs text-on-surface-variant">{label}</div></Card>; }
function DiscussionCard({ item, onOpen, onVote }) { return <Card className="p-lg hover:shadow-md transition-shadow"><div className="flex gap-md"><button onClick={onVote} className="flex flex-col items-center gap-1 text-xs text-on-surface-variant hover:text-primary"><ThumbsUp className="w-4 h-4" /><span>{item.votes || 0}</span></button><div className="min-w-0 flex-1"><button onClick={onOpen} className="text-left font-display text-base font-semibold hover:text-primary">{item.title}</button><p className="text-sm text-on-surface-variant mt-1 line-clamp-2">{item.body}</p><div className="flex flex-wrap gap-1 mt-md">{(item.tags || []).map((tag) => <Badge key={tag} variant="code">{tag}</Badge>)}</div><div className="flex flex-wrap gap-sm items-center text-xs text-on-surface-variant mt-md"><span>{authorName(item.author)}</span><span>·</span><span>{item.answerCount || 0} replies</span><span>·</span><span>{item.views || 0} views</span>{item.solved && <Badge variant="success">Solved</Badge>}</div></div></div></Card>; }
function Modal({ title, onClose, children }) { return <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-4"><div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-lg"><div className="flex items-start justify-between gap-md mb-lg"><h2 className="font-display text-xl font-semibold">{title}</h2><button onClick={onClose} aria-label="Close"><X className="w-5 h-5" /></button></div>{children}</div></div>; }
