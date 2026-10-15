import {
  Globe,
  Cpu,
  Code2,
  LayoutGrid,
  RefreshCw,
  Radio,
  Boxes,
  Database,
  Layers,
  Network,
  Activity,
} from "lucide-react";

/**
 * Single source of truth for the roadmap detail page.
 * Swap this for an API response later — component props already match this shape.
 *
 * Topic status: "mastered" | "completed" | "active" | "next" | "locked"
 */

export const roadmap = {
  slug: "full-stack-modern-web",
  version: "2025.1",
  title: "Full-Stack Web Mastery & Architecture Roadmap",
  summary:
    "A structured, production-grade milestone path from foundational web architecture to distributed systems, vetted by staff engineers.",
  reviewedBy: "Staff engineer reviewed",
  breadcrumb: [
    { label: "Roadmaps", href: "/roadmaps" },
    { label: "Full-Stack Modern Web & Systems", href: "/roadmaps/full-stack-modern-web" },
    { label: "Interactive path" },
  ],
  progress: {
    percent: 68,
    topicsDone: 24,
    topicsTotal: 36,
    nextMilestone: "Next verification milestone at stage 02 completion.",
    streakDays: 14,
    estimatedCompletion: "~3 weeks",
    peers: ["Aarav Mehta", "Sana Kulkarni", "Dev Patel"],
    peerOverflow: 142,
  },
};

export const stages = [
  {
    id: "stage-01",
    index: "01",
    title: "Foundations & Runtime Architecture",
    status: "complete",
    meta: "3 / 3 topics",
    completionLabel: "100% complete",
    topics: [
      {
        id: "arch-01",
        code: "ARCH-01",
        icon: Globe,
        title: "HTTP/3, TLS & Browser Networking",
        description: "QUIC protocol, congestion control, 0-RTT handshakes",
        status: "mastered",
        statusLabel: "Mastered",
      },
      {
        id: "core-02",
        code: "CORE-02",
        icon: Cpu,
        title: "JavaScript Runtime & Event Loop Deep-Dive",
        description: "V8 hidden classes, microtask queuing, memory leaks",
        status: "mastered",
        statusLabel: "Mastered",
      },
      {
        id: "ts-03",
        code: "TS-03",
        icon: Code2,
        title: "TypeScript 5.4 Advanced Types & Generics",
        description: "Conditional types, infer keyword, mapped template literals",
        status: "mastered",
        statusLabel: "Mastered",
      },
    ],
  },
  {
    id: "stage-02",
    index: "02",
    title: "Modern Frontend Architecture",
    status: "active",
    meta: "Est. 8h remaining",
    completionLabel: "2 of 4 in progress",
    topics: [
      {
        id: "react-04",
        code: "REACT-04",
        icon: LayoutGrid,
        title: "React 19 Server Components & Actions",
        description: "Async transitions, directive compiler, server actions",
        status: "completed",
        statusLabel: "Completed",
      },
      {
        id: "state-05",
        code: "STATE-05",
        icon: RefreshCw,
        title: "State Management & Optimistic UI",
        description:
          "Master zero-latency micro-interactions by anticipating server mutations with rollback primitives, transient caches, and hydration synchronization.",
        status: "active",
        level: "Intermediate",
        progress: 75,
        subtopicsDone: 3,
        subtopicsTotal: 4,
        timeLeft: "45 mins left to verify",
      },
      {
        id: "edge-06",
        code: "EDGE-06",
        icon: Radio,
        title: "Edge Rendering & Streaming SSR",
        description: "V8 isolates, Cloudflare Workers runtime, progressive HTML chunks",
        status: "next",
        statusLabel: "Est. 2 hrs",
      },
      {
        id: "mfe-07",
        code: "MFE-07",
        icon: Boxes,
        title: "WebGL & Micro-frontends",
        description: "Module federation, shader pipelines, isolated runtime sandboxes",
        status: "locked",
      },
    ],
  },
  {
    id: "stage-03",
    index: "03",
    title: "Backend, Data & Distributed Systems",
    status: "locked",
    meta: "Unlocks after stage 02",
    completionLabel: "0 of 4 completed",
    topics: [
      {
        id: "pg-08",
        code: "DATA-08",
        icon: Database,
        title: "PostgreSQL Indexing, EXPLAIN & Connection Pooling",
        description: "B-tree, GiST, WAL internals, PgBouncer transaction pooling",
        status: "locked",
      },
      {
        id: "redis-09",
        code: "DATA-09",
        icon: Layers,
        title: "Distributed Cache & Redis Streams",
        description: "Cache invalidation, read-through patterns, consumer groups",
        status: "locked",
      },
      {
        id: "kafka-10",
        code: "DIST-10",
        icon: Network,
        title: "Event-Driven Microservices with gRPC & Kafka",
        description: "Protobuf schema registries, partitioned topic ordering, idempotency",
        status: "locked",
      },
      {
        id: "ops-11",
        code: "OPS-11",
        icon: Activity,
        title: "Production Deployment & Kubernetes Observability",
        description: "OpenTelemetry tracing, Prometheus histograms, blue-green rollouts",
        status: "locked",
      },
    ],
  },
];

export const selectedTopic = {
  id: "state-05",
  title: "State Management & Optimistic UI",
  description:
    "Build resilient interfaces that assume success while handling network packet loss and race condition reconciliations gracefully.",
  level: "Intermediate",
  duration: "3 hours",
  outcomes: [
    { id: "o1", label: "Unidirectional data flow vs global centralized stores", done: true },
    { id: "o2", label: "Handling rollbacks on network failure with useOptimistic", done: true },
    { id: "o3", label: "Caching strategies with SWR / TanStack Query", done: false },
    { id: "o4", label: "Concurrent mode safety & hydration mismatches", done: false },
  ],
  challenges: [
    {
      id: "c1",
      title: "Implement an optimistic comment reaction bar",
      description: "UI state revert, error boundary trap, debounce",
      difficulty: "Medium",
    },
    {
      id: "c2",
      title: "Solve network race conditions in search typeahead",
      description: "AbortController, sequence ordering, stale-while-revalidate",
      difficulty: "Hard",
    },
  ],
  discussion: {
    activeCount: 34,
    hotThread: 'Zustand vs Jotai in 2025',
    href: "/questions?topic=state-management",
  },
  mentorship: {
    slots: 2,
    label: "Staff React architects",
    href: "/mentorship?topic=state-management",
  },
  snippet: {
    filename: "optimistic-rollback.jsx",
    code: `const [optimisticVotes, setOptimistic] =
  useOptimistic(votes, (state, update) =>
    state + update
  );

/* Server action with deterministic error rollback */
async function submitVote() {
  setOptimistic(1);
  await mutateVoteAPI();
}`,
  },
};
