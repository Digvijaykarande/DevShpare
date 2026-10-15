import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import Toast from "../../components/ui/toast";
import ProblemMeta from "../../components/pages/coding/ProblemMeta";
import ProblemPanel from "../../components/pages/coding/ProblemPanel";
import CodeWorkspace from "../../components/pages/coding/CodeWorkspace";
import ProblemListDrawer from "../../components/pages/coding/ProblemListDrawer";
import LeaderboardPanel from "../../components/pages/coding/LeaderboardPanel";
import { api } from "../../lib/api";

const MIN_LEFT = 28;
const MAX_LEFT = 65;

export default function CodingDetail() {
  const { slug } = useParams();
  const activeSlug = slug || "two-sum";

  const [problem, setProblem] = useState(null);
  const [problemList, setProblemList] = useState([]);
  const [challenge, setChallenge] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | notfound | error
  const [reloadKey, setReloadKey] = useState(0);

  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimer = useRef(null);
  const [listOpen, setListOpen] = useState(false);

  // Draggable split between problem panel and code workspace
  const [leftWidth, setLeftWidth] = useState(42);
  const dragState = useRef(null);
  const containerRef = useRef(null);

  // Backend is the single source of truth: no mock problems are used.
  useEffect(() => {
    let mounted = true;
    setStatus("loading");

    api.get(`/coding/${activeSlug}`)
      .then((data) => {
        if (!mounted) return;
        setProblem(data.problem);
        setStatus("ready");
      })
      .catch((err) => {
        if (!mounted) return;
        setProblem(null);
        setStatus(err?.status === 404 ? "notfound" : "error");
      });

    return () => { mounted = false; };
  }, [activeSlug, reloadKey]);

  // The list is separate so the drawer/shuffle still work if one problem fails to load.
  const loadList = useCallback(() => {
    api.get("/coding")
      .then((data) => setProblemList(data?.problems || []))
      .catch(() => {});
  }, []);
  useEffect(() => { loadList(); }, [loadList]);
  useEffect(() => {
    api.get("/coding/challenge").then((data) => setChallenge(data.challenge)).catch(() => setChallenge(null));
  }, []);

  // Called by the workspace after a submission is saved: refresh solved/attempted state
  // without remounting the editor (so the user's code is not wiped).
  const handleSubmitted = useCallback((result) => {
    setProblem((prev) =>
      prev
        ? {
            ...prev,
            status: result.status === "Accepted" ? "solved" : prev.status === "solved" ? "solved" : "attempted",
            hasAcceptedSolution: prev.hasAcceptedSolution || result.status === "Accepted",
          }
        : prev
    );
    loadList();
  }, [loadList]);

  const notify = (message) => {
    setToastMessage(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), 2600);
  };

  const startDrag = useCallback(
    (e) => {
      dragState.current = { startX: e.clientX, startWidth: leftWidth };
      const onMove = (ev) => {
        if (!dragState.current || !containerRef.current) return;
        const containerWidth = containerRef.current.getBoundingClientRect().width;
        const deltaPx = ev.clientX - dragState.current.startX;
        const deltaPct = (deltaPx / containerWidth) * 100;
        const next = Math.min(MAX_LEFT, Math.max(MIN_LEFT, dragState.current.startWidth + deltaPct));
        setLeftWidth(next);
      };
      const onUp = () => {
        dragState.current = null;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [leftWidth]
  );

  const goToSlug = (nextSlug) => {
    setListOpen(false);
    navigate(`/coding/${nextSlug}`);
  };

  const handleShuffle = (mode) => {
    if (problemList.length <= 1) {
      notify("Only one problem available right now");
      return;
    }
    const currentIndex = problemList.findIndex((p) => p.slug === activeSlug);
    let nextIndex;
    if (mode === "random") {
      do {
        nextIndex = Math.floor(Math.random() * problemList.length);
      } while (nextIndex === currentIndex);
    } else {
      nextIndex = (currentIndex + 1 + problemList.length) % problemList.length;
    }
    const next = problemList[nextIndex];
    notify(mode === "random" ? `Jumping to #${next.number}. ${next.title}` : "Loading next challenge...");
    navigate(`/coding/${next.slug}`);
  };

  if (status === "loading") {
    return <div className="text-center py-2xl text-on-surface-variant text-sm">Loading problem…</div>;
  }

  if (status === "error") {
    return (
      <div className="max-w-[36rem] mx-auto text-center py-2xl">
        <h1 className="font-display text-xl font-semibold text-on-surface">Couldn't load this problem</h1>
        <p className="text-sm text-on-surface-variant mt-2">Check that the backend is running, then try again.</p>
        <button
          type="button"
          onClick={() => setReloadKey((k) => k + 1)}
          className="mt-md px-md py-xs rounded-lg bg-primary text-on-primary text-sm font-semibold"
        >
          Retry
        </button>
      </div>
    );
  }

  if (status === "notfound" || !problem) {
    const first = problemList[0];
    return (
      <div className="max-w-[36rem] mx-auto text-center py-2xl">
        <h1 className="font-display text-xl font-semibold text-on-surface">Problem not found</h1>
        <p className="text-sm text-on-surface-variant mt-2">
          {problemList.length === 0
            ? "There are no coding problems yet. Run node seedProblems.js in the backend to add the starter set."
            : "That coding challenge doesn't exist. Pick one from the list."}
        </p>
        {first && (
          <Link to={`/coding/${first.slug}`} className="inline-block mt-lg">
            <Button variant="primary" size="sm" type="button">
              <ArrowLeft className="w-4 h-4" />
              Back to coding
            </Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-[100rem] mx-auto flex flex-col gap-md">
      <LeaderboardPanel challenge={challenge} />
      <ProblemMeta
        problem={problem}
        onNotify={notify}
        onOpenList={() => setListOpen(true)}
        onShuffle={handleShuffle}
      />

      <div ref={containerRef} className="flex flex-col xl:flex-row gap-md xl:gap-0 items-stretch">
        <div className="w-full xl:shrink-0 xl:w-[var(--left-w)]" style={{ "--left-w": `${leftWidth}%` }}>
          <ProblemPanel problem={problem} />
        </div>

        {/* Drag handle — desktop only */}
        <div
          onMouseDown={startDrag}
          className="hidden xl:flex w-2.5 shrink-0 cursor-col-resize items-center justify-center group"
          title="Drag to resize"
        >
          <div className="w-1 h-16 rounded-full bg-outline-variant/50 group-hover:bg-primary-container transition-colors" />
        </div>

        <div className="w-full xl:flex-1 min-w-0">
          <CodeWorkspace problem={problem} onNotify={notify} onSubmitted={handleSubmitted} />
        </div>
      </div>

      <Toast message={toastMessage} />

      <ProblemListDrawer
        open={listOpen}
        onClose={() => setListOpen(false)}
        problems={problemList}
        activeSlug={activeSlug}
        onSelect={goToSlug}
      />
    </div>
  );
}
