import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, MessagesSquare, Plus, X } from "lucide-react";
import QuestionsHero from "../../components/pages/questions/QuestionsHero";
import QuestionFilters from "../../components/pages/questions/QuestionFilters";
import QuestionCard from "../../components/pages/questions/QuestionCard";
import QuestionsPagination from "../../components/pages/questions/QuestionsPagination";
import AskQuestionModal from "../../components/pages/questions/AskQuestionModal";
import TopContributorsWidget from "../../components/pages/questions/sidebar/TopContributorsWidget";
import PopularTagsWidget from "../../components/pages/questions/sidebar/PopularTagsWidget";
import VerifiedGuaranteeWidget from "../../components/pages/questions/sidebar/VerifiedGuaranteeWidget";
import BountiesWidget from "../../components/pages/questions/sidebar/BountiesWidget";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import Toast from "../../components/ui/toast";
import { api } from "../../lib/api";
import { TAGS, CATEGORIES, BOUNTIES } from "./data/questionsData";

const PAGE_SIZE = 5;

const EMPTY_COPY = {
  bookmarks: { title: "No bookmarks yet", hint: "Tap the bookmark icon on any question to save it here." },
  default: { title: "No questions match those filters", hint: "Try clearing a filter, or be the first to ask." },
};

const listVariants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const hasTag = (q, tag) => (q.tags || []).some((t) => t.toLowerCase() === tag.toLowerCase());

export default function QuestionsPage() {
  const [params, setParams] = useSearchParams();
  const topicParam = params.get("topic");

  const [questions, setQuestions] = useState([]);
  const [votes, setVotes] = useState({}); // { [questionId]: "up" | "down" }
  const [bookmarks, setBookmarks] = useState(() => new Set());
  const [contributors, setContributors] = useState([]);
  const [popularTags, setPopularTags] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [reloadKey, setReloadKey] = useState(0);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("latest");
  const [category, setCategory] = useState("All");
  const [tag, setTag] = useState(topicParam && TAGS.includes(topicParam) ? topicParam : "");
  const [page, setPage] = useState(1);
  const [askOpen, setAskOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimer = useRef(null);
  const [mountedAt] = useState(() => Date.now()); // stable "now" for trending score

  const notify = (message) => {
    setToastMessage(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), 2200);
  };

  const isLoggedIn = () => !!localStorage.getItem("devsphere_token");

  // Backend is the single source of truth: no mock questions are mixed in.
  useEffect(() => {
    let mounted = true;

    api.get("/questions?pageSize=200")
      .then((data) => {
        if (!mounted) return;
        const list = data?.questions || [];
        setQuestions(list.map((q) => ({ ...q, id: q.id || q._id, tags: q.tags || [] })));

        const vMap = {};
        const bSet = new Set();
        list.forEach((q) => {
          const id = q.id || q._id;
          if (q.userVote) vMap[id] = q.userVote;
          if (q.bookmarked) bSet.add(id);
        });
        setVotes(vMap);
        setBookmarks(bSet);
        setStatus("ready");
      })
      .catch(() => mounted && setStatus("error"));

    // Sidebar widgets are optional extras: if they fail, the feed still works.
    api.get("/questions/top-contributors")
      .then((data) => mounted && setContributors(data?.contributors || []))
      .catch(() => {});
    api.get("/questions/tags/popular")
      .then((data) => mounted && setPopularTags(data?.tags || []))
      .catch(() => {});

    return () => { mounted = false; };
  }, [reloadKey]);

  const reload = () => {
    setStatus("loading");
    setReloadKey((k) => k + 1);
  };

  // every filter change sends the reader back to page 1
  const withReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const handleTagChange = (value) => {
    setTag(value);
    setPage(1);
    if (topicParam) {
      params.delete("topic");
      setParams(params, { replace: true });
    }
  };

  const filteredQuestions = useMemo(() => {
    const term = search.trim().toLowerCase();
    const catTags = CATEGORIES[category] ?? [];

    const list = questions.filter((q) => {
      if (tab === "unanswered" && q.answered) return false;
      if (tab === "solved" && !q.answered) return false;
      const qId = q.id || q._id;
      if (tab === "bookmarks" && !bookmarks.has(qId)) return false;
      if (catTags.length && !catTags.some((t) => hasTag(q, t))) return false;
      if (tag && !hasTag(q, tag)) return false;
      if (!term) return true;
      const authorName = typeof q.author === "object" ? q.author?.name : q.author || "";
      const tagsStr = (q.tags || []).join(" ");
      return `${q.title} ${q.body} ${authorName} ${tagsStr}`.toLowerCase().includes(term);
    });

    const ageHours = (q) => (mountedAt - new Date(q.createdAt || Date.now())) / 3.6e6;
    const trendScore = (q) => ((q.votes || 0) * 2 + (q.views || 0) / 50) / Math.sqrt(ageHours(q) + 2);

    return [...list].sort((a, b) =>
      tab === "trending" ? trendScore(b) - trendScore(a) : new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
  }, [questions, search, tab, category, tag, bookmarks, mountedAt]);

  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleQuestions = filteredQuestions.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Server-authoritative: the UI only changes after the backend confirms the vote.
  const handleVote = async (id, direction) => {
    if (!isLoggedIn()) {
      notify("Please sign in to vote");
      return;
    }
    try {
      const res = await api.post(`/questions/${id}/vote`, { direction });
      setVotes((prev) => ({ ...prev, [id]: res.userVote }));
      setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, votes: res.votes } : q)));
    } catch (err) {
      notify(err?.data?.error || err?.message || "Couldn't save your vote");
    }
  };

  const handleBookmark = async (id) => {
    if (!isLoggedIn()) {
      notify("Please sign in to bookmark questions");
      return;
    }
    try {
      const res = await api.post(`/questions/${id}/bookmark`);
      setBookmarks((prev) => {
        const next = new Set(prev);
        res.bookmarked ? next.add(id) : next.delete(id);
        return next;
      });
      notify(res.message || (res.bookmarked ? "Saved to My Bookmarks" : "Removed from bookmarks"));
    } catch (err) {
      notify(err?.data?.error || err?.message || "Couldn't update bookmark");
    }
  };

  const handleAskSubmit = async ({ title, body, tags }) => {
    if (!isLoggedIn()) {
      notify("Please sign in to ask a question");
      return;
    }
    try {
      await api.post("/questions", { title, body, tags });
      setAskOpen(false);
      setSearch("");
      setTag("");
      setCategory("All");
      setTab("latest");
      setPage(1);
      reload(); // re-fetch so the new question and sidebar stats come from the DB
      notify("Your question is live — the community will jump in soon");
    } catch (err) {
      notify(err?.data?.error || err?.message || "Failed to ask question");
    }
  };

  const changePage = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const empty =
    questions.length === 0 && tab !== "bookmarks"
      ? { title: "No questions yet", hint: "Be the first to ask, or run node seedQuestions.js in the backend for the starter set." }
      : EMPTY_COPY[tab] ?? EMPTY_COPY.default;
  const listKey = `${tab}-${category}-${tag}-${search}-${currentPage}`;

  return (
    <div className="flex flex-col gap-xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col gap-xl"
      >
        <QuestionsHero onAsk={() => setAskOpen(true)} onCustomFeed={() => notify("Custom feeds are coming soon")} />
        <QuestionFilters
          search={search}
          onSearchChange={withReset(setSearch)}
          tab={tab}
          onTabChange={withReset(setTab)}
          category={category}
          onCategoryChange={withReset(setCategory)}
        />
      </motion.div>

      {tag && (
        <div className="flex items-center gap-2 bg-primary/10 text-primary text-sm rounded-lg px-md py-sm -mt-md">
          <MessagesSquare className="w-4 h-4 shrink-0" />
          <span className="flex-1">
            Showing threads tagged <Badge variant="code">{tag}</Badge>
          </span>
          <button
            type="button"
            onClick={() => handleTagChange("")}
            className="hover:opacity-70 transition-opacity"
            aria-label="Clear tag filter"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-xl items-start">
        {/* Main feed */}
        <div className="xl:col-span-8 flex flex-col gap-lg min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            {status === "loading" ? (
              <div key="loading" className="text-center py-2xl text-on-surface-variant text-sm">Loading questions…</div>
            ) : status === "error" ? (
              <div key="error" className="text-center py-2xl">
                <p className="text-on-surface font-display text-lg font-semibold">Couldn't load questions</p>
                <p className="text-on-surface-variant text-sm mt-1">Check that the backend is running, then try again.</p>
                <button type="button" onClick={reload} className="mt-md px-md py-xs rounded-lg bg-primary text-on-primary text-sm font-semibold">Retry</button>
              </div>
            ) : visibleQuestions.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-2xl flex flex-col items-center gap-md"
              >
                <div className="w-14 h-14 rounded-full bg-primary-container/15 text-primary flex items-center justify-center">
                  {tab === "bookmarks" ? <Bookmark className="w-7 h-7" /> : <MessagesSquare className="w-7 h-7" />}
                </div>
                <div>
                  <p className="text-on-surface font-display text-lg font-semibold">{empty.title}</p>
                  <p className="text-on-surface-variant text-sm mt-1">{empty.hint}</p>
                </div>
                <Button variant="primary" size="sm" type="button" onClick={() => setAskOpen(true)}>
                  <Plus className="w-4 h-4" />
                  Ask a question
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={listKey}
                variants={listVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                className="flex flex-col gap-lg"
              >
                {visibleQuestions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    userVote={votes[question.id] ?? null}
                    bookmarked={bookmarks.has(question.id)}
                    onVote={handleVote}
                    onBookmark={handleBookmark}
                    onTagClick={handleTagChange}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <QuestionsPagination page={currentPage} totalPages={totalPages} onChange={changePage} />
        </div>

        {/* Sidebar widgets */}
        <motion.aside
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="xl:col-span-4 flex flex-col gap-lg xl:sticky xl:top-24"
        >
          {[
            <TopContributorsWidget key="c" contributors={contributors} />,
            <PopularTagsWidget
              key="t"
              tags={popularTags}
              activeTag={tag}
              onSelect={handleTagChange}
              onViewAll={() => notify("Full tag directory is coming soon")}
            />,
            <VerifiedGuaranteeWidget key="v" onReadMore={() => notify("Engineering RFC Standard is coming soon")} />,
            <BountiesWidget
              key="b"
              bounties={BOUNTIES}
              onOpen={(b) => notify(`Bounty: +${b.reward} rep`)}
              onBrowseAll={() => notify("Bounty board is coming soon")}
            />,
          ].map((widget) => (
            <motion.div
              key={widget.key}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
            >
              {widget}
            </motion.div>
          ))}
        </motion.aside>
      </div>

      <AskQuestionModal open={askOpen} onClose={() => setAskOpen(false)} onSubmit={handleAskSubmit} />
      <Toast message={toastMessage} />
    </div>
  );
}