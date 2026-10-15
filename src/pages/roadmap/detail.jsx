import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import Toast from "../../components/ui/toast";
import RoadmapHeader from "../../components/pages/roadmap/RoadmapHeader";
import ProgressOverview from "../../components/pages/roadmap/ProgressOverview";
import StageSection from "../../components/pages/roadmap/StageSection";
import StageConnector from "../../components/pages/roadmap/StageConnector";
import TopicInspector from "../../components/pages/roadmap/TopicInspector";
import RelatedRoadmaps from "../../components/pages/roadmap/RelatedRoadmaps";
import { api } from "../../lib/api";
import { resolveIcon } from "./icons";
import { synthesizeTopic } from "./synthesizeTopic";

// Connector caption between stages, keyed by the stage it follows.
function connectorFor(stage, isLast) {
  if (isLast) return null;
  if (stage.status === "complete") return { label: "Stage transition unlocked", unlocked: true };
  return { label: `Prerequisite ${stage.title} incomplete`, unlocked: false };
}

// The API sends icon names and plain data; attach the icon components and the extra
// fields the active-topic card expects.
function decorate(payload) {
  const { roadmap, stages, activeTopicId, featured } = payload;
  return {
    activeTopicId,
    featured,
    roadmap: {
      ...roadmap,
      icon: resolveIcon(roadmap.iconName),
      breadcrumb: [
        { label: "Roadmaps", href: "/roadmaps" },
        { label: roadmap.title, href: `/roadmaps/${roadmap.slug}` },
        { label: "Interactive path" },
      ],
    },
    stages: stages.map((stage) => ({
      ...stage,
      topics: stage.topics.map((topic) => {
        const done = topic.outcomes.filter((o) => o.done).length;
        return {
          ...topic,
          icon: resolveIcon(topic.iconName),
          subtopicsDone: done,
          subtopicsTotal: topic.outcomes.length,
          timeLeft: topic.duration ? `Est. ${topic.duration} total` : "A couple of hours",
        };
      }),
    })),
  };
}

export default function RoadmapDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | notfound | error
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimer = useRef(null);

  const notify = (message) => {
    setToastMessage(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), 2200);
  };

  // Backend is the single source of truth. Progress is the signed-in user's own.
  useEffect(() => {
    let mounted = true;
    setStatus("loading");
    setSelectedTopicId(null);

    api.get(`/roadmaps/${slug}`)
      .then((payload) => {
        if (!mounted) return;
        const decorated = decorate(payload);
        setData(decorated);
        setSelectedTopicId(decorated.activeTopicId ?? decorated.stages[0]?.topics[0]?.id ?? null);
        setStatus("ready");
      })
      .catch((err) => {
        if (!mounted) return;
        setData(null);
        setStatus(err?.status === 404 ? "notfound" : "error");
      });

    return () => { mounted = false; };
  }, [slug, reloadKey]);

  const allTopics = useMemo(() => (data ? data.stages.flatMap((s) => s.topics) : []), [data]);
  const activeTopic = allTopics.find((t) => t.id === data?.activeTopicId) ?? null;
  const selectedTopic = allTopics.find((t) => t.id === selectedTopicId) ?? null;

  // Hand-authored content wins when the ids match; every other topic gets a working
  // detail built from its own title/description. The checklist always comes from the server.
  const detail = useMemo(() => {
    if (!selectedTopic) return null;
    const authored = data?.featured && data.featured.id === selectedTopic.id ? data.featured : null;
    const base = authored ?? synthesizeTopic(selectedTopic);
    return { ...base, id: selectedTopic.id, outcomes: selectedTopic.outcomes };
  }, [selectedTopic, data]);

  const toggleOutcome = async (outcomeId) => {
    if (!selectedTopic) return;
    if (!localStorage.getItem("devsphere_token")) {
      notify("Please sign in to track your progress");
      return;
    }
    const current = selectedTopic.outcomes.find((o) => o.id === outcomeId);
    if (!current) return;

    try {
      const payload = await api.put(`/roadmaps/${slug}/outcomes/${encodeURIComponent(outcomeId)}`, { done: !current.done });
      const decorated = decorate(payload);
      setData(decorated);

      const justFinished = !current.done && decorated.stages.flatMap((s) => s.topics).find((t) => t.id === selectedTopic.id)?.status === "completed";
      if (justFinished) {
        notify(`"${selectedTopic.title}" completed!`);
        if (decorated.activeTopicId) setSelectedTopicId(decorated.activeTopicId);
      }
    } catch (err) {
      notify(err?.data?.error || err?.message || "Couldn't save your progress");
    }
  };

  const resume = () => {
    if (data?.activeTopicId) setSelectedTopicId(data.activeTopicId);
    document.getElementById("topic-inspector")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Real destination, not a placeholder toast: both "launch" actions drop the
  // person into the actual coding workspace so there's always something to do next.
  const openWorkspace = (label) => {
    notify(`Opening the coding workspace for "${label}"`);
    navigate("/coding");
  };

  if (status === "loading") {
    return <div className="text-center py-2xl text-on-surface-variant text-sm">Loading roadmap…</div>;
  }

  if (status === "error") {
    return (
      <div className="max-w-[36rem] mx-auto text-center py-2xl">
        <h1 className="font-display text-xl font-semibold text-on-surface">Couldn't load this roadmap</h1>
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

  if (status === "notfound" || !data) {
    return (
      <div className="max-w-[36rem] mx-auto text-center py-2xl">
        <h1 className="font-display text-xl font-semibold text-on-surface">Roadmap not found</h1>
        <p className="text-sm text-on-surface-variant mt-2">
          That roadmap doesn't exist yet. Head back and pick one from the list.
        </p>
        <Link to="/roadmaps" className="inline-block mt-lg">
          <Button variant="primary" size="sm" type="button">
            <ArrowLeft className="w-4 h-4" />
            Back to roadmaps
          </Button>
        </Link>
      </div>
    );
  }

  const { roadmap, stages } = data;

  return (
    <div className="max-w-[88rem] mx-auto">
      <RoadmapHeader roadmap={roadmap} onResume={resume} onNotify={notify} />
      <ProgressOverview progress={roadmap.progress} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
        <div className="lg:col-span-7 flex flex-col gap-lg">
          {stages.map((stage, i) => {
            const connector = connectorFor(stage, i === stages.length - 1);
            return (
              <div key={stage.id} className="flex flex-col gap-lg">
                <StageSection
                  stage={stage}
                  selectedTopicId={selectedTopicId}
                  liveProgress={activeTopic?.progress ?? 0}
                  onSelectTopic={(topic) => setSelectedTopicId(topic.id)}
                  onContinue={() => activeTopic && setSelectedTopicId(activeTopic.id)}
                />
                {connector && <StageConnector {...connector} />}
              </div>
            );
          })}
        </div>

        <div id="topic-inspector" className="lg:col-span-5 w-full scroll-mt-20">
          {detail && (
            <TopicInspector
              topic={detail}
              onToggleOutcome={toggleOutcome}
              onLaunch={() => openWorkspace(detail.title)}
              onOpenChallenge={() => openWorkspace(detail.title)}
            />
          )}
        </div>
      </div>

      <RelatedRoadmaps currentSlug={slug} />

      <Toast message={toastMessage} />
    </div>
  );
}