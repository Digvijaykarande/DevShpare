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
  Terminal,
  Cog,
  Server,
  ShieldCheck,
  Brain,
  Sigma,
  LineChart,
  Bot,
  Cloud,
  Container,
  GitBranch,
  Workflow,
  Braces,
  ListOrdered,
  TreePine,
} from "lucide-react";

/**
 * roadmapDetails[slug] = { roadmap, stages, selectedTopic }
 * `roadmap` holds page-header meta, `stages` drives the left track,
 * `selectedTopic` is the full inspector content for the one "active" topic.
 * Every other clickable (non-locked) topic shows the lightweight fallback
 * card in the inspector — that's intentional, not a bug, until it gets its
 * own authored content.
 */
export const roadmapDetails = {
  // ---------------------------------------------------------------- Frontend
  "frontend-architecture": {
    roadmap: {
      version: "2025.1",
      title: "Full-Stack Web Mastery & Architecture Roadmap",
      summary:
        "A structured, production-grade milestone path from foundational web architecture to distributed systems, vetted by staff engineers.",
      reviewedBy: "Staff engineer reviewed",
      breadcrumb: [
        { label: "Roadmaps", href: "/roadmaps" },
        { label: "Full-Stack Modern Web & Systems", href: "/roadmaps/frontend-architecture" },
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
    },
    stages: [
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
    ],
    selectedTopic: {
      id: "state-05",
      title: "State Management & Optimistic UI",
      description:
        "Build resilient interfaces that assume success while handling network packet loss and race condition reconciliations gracefully.",
      level: "Intermediate",
      duration: "3 hours",
      studyMaterial: [
        {
          id: "sm1",
          type: "docs",
          title: "useOptimistic — React Reference",
          source: "react.dev",
          meta: "8 min read",
          href: "https://react.dev/reference/react/useOptimistic",
        },
        {
          id: "sm2",
          type: "docs",
          title: "TanStack Query — Overview & Caching",
          source: "tanstack.com",
          meta: "15 min read",
          href: "https://tanstack.com/query/latest/docs/framework/react/overview",
        },
        {
          id: "sm3",
          type: "article",
          title: "AbortController & the Fetch API",
          source: "developer.mozilla.org",
          meta: "10 min read",
          href: "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
        },
      ],
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
        hotThread: "Zustand vs Jotai in 2025",
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
    },
  },

  // ------------------------------------------------------------------- Java
  "java-backend": {
    roadmap: {
      version: "2025.1",
      title: "Java Backend Engineering Roadmap",
      summary:
        "From JVM fundamentals to production Spring Boot services — concurrency, persistence, and system design for backend engineers.",
      reviewedBy: "Staff engineer reviewed",
      breadcrumb: [
        { label: "Roadmaps", href: "/roadmaps" },
        { label: "Java & Backend Systems", href: "/roadmaps/java-backend" },
        { label: "Interactive path" },
      ],
      progress: {
        percent: 25,
        topicsDone: 6,
        topicsTotal: 24,
        nextMilestone: "Next verification milestone at stage 01 completion.",
        streakDays: 5,
        estimatedCompletion: "~7 weeks",
        peers: ["Karan Verma", "Isha Rao"],
        peerOverflow: 58,
      },
    },
    stages: [
      {
        id: "stage-01",
        index: "01",
        title: "JVM Foundations & Core Java",
        status: "active",
        meta: "Est. 6h remaining",
        completionLabel: "2 of 3 in progress",
        topics: [
          {
            id: "jvm-01",
            code: "JVM-01",
            icon: Cog,
            title: "JVM Internals & Memory Model",
            description: "Heap generations, garbage collectors, class loading",
            status: "mastered",
            statusLabel: "Mastered",
          },
          {
            id: "conc-02",
            code: "CONC-02",
            icon: Cpu,
            title: "Concurrency & the Executor Framework",
            description:
              "Master safe multi-threading by reasoning about visibility, thread pools, and structured concurrency before reaching for locks.",
            status: "active",
            level: "Intermediate",
            progress: 40,
            subtopicsDone: 2,
            subtopicsTotal: 5,
            timeLeft: "1h 20m left to verify",
          },
          {
            id: "streams-03",
            code: "CORE-03",
            icon: Terminal,
            title: "Streams, Generics & Functional Interfaces",
            description: "Lambda composition, bounded wildcards, collectors",
            status: "next",
            statusLabel: "Est. 3 hrs",
          },
        ],
      },
      {
        id: "stage-02",
        index: "02",
        title: "Spring Boot & Persistence",
        status: "locked",
        meta: "Unlocks after stage 01",
        completionLabel: "0 of 3 completed",
        topics: [
          {
            id: "spring-04",
            code: "SPR-04",
            icon: Server,
            title: "Spring Boot & Dependency Injection",
            description: "Bean lifecycle, auto-configuration, profiles",
            status: "locked",
          },
          {
            id: "jpa-05",
            code: "DATA-05",
            icon: Database,
            title: "Spring Data JPA & Transaction Boundaries",
            description: "N+1 queries, isolation levels, optimistic locking",
            status: "locked",
          },
          {
            id: "sec-06",
            code: "SEC-06",
            icon: ShieldCheck,
            title: "Spring Security & OAuth2 Resource Servers",
            description: "JWT validation, method security, CSRF strategy",
            status: "locked",
          },
        ],
      },
    ],
    selectedTopic: {
      id: "conc-02",
      title: "Concurrency & the Executor Framework",
      description:
        "Learn to reason about thread safety with visibility guarantees, immutable state, and pooled executors instead of ad-hoc locking.",
      level: "Intermediate",
      duration: "2.5 hours",
      studyMaterial: [
        {
          id: "sm1",
          type: "docs",
          title: "ExecutorService — Java SE Documentation",
          source: "docs.oracle.com",
          meta: "10 min read",
          href: "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ExecutorService.html",
        },
        {
          id: "sm2",
          type: "article",
          title: "A Guide to the Java ExecutorService",
          source: "baeldung.com",
          meta: "12 min read",
          href: "https://www.baeldung.com/java-executor-service-tutorial",
        },
        {
          id: "sm3",
          type: "docs",
          title: "JEP 428 — Structured Concurrency",
          source: "openjdk.org",
          meta: "15 min read",
          href: "https://openjdk.org/jeps/428",
        },
      ],
      outcomes: [
        { id: "o1", label: "Happens-before relationships & the memory model", done: true },
        { id: "o2", label: "ExecutorService, thread pools & task queues", done: true },
        { id: "o3", label: "CompletableFuture composition & error handling", done: false },
        { id: "o4", label: "Structured concurrency (JEP 428/453) basics", done: false },
        { id: "o5", label: "Diagnosing deadlocks & thread-dump analysis", done: false },
      ],
      challenges: [
        {
          id: "c1",
          title: "Build a bounded worker pool for image resizing",
          description: "Backpressure, rejection policy, graceful shutdown",
          difficulty: "Medium",
        },
        {
          id: "c2",
          title: "Debug a producer-consumer deadlock",
          description: "Thread dumps, lock ordering, reentrant locks",
          difficulty: "Hard",
        },
      ],
      discussion: {
        activeCount: 19,
        hotThread: "Virtual threads vs platform threads",
        href: "/questions?topic=java-concurrency",
      },
      mentorship: {
        slots: 3,
        label: "Backend platform engineers",
        href: "/mentorship?topic=java-concurrency",
      },
      snippet: {
        filename: "BoundedWorkerPool.java",
        code: `ExecutorService pool = new ThreadPoolExecutor(
  4, 8, 30, TimeUnit.SECONDS,
  new ArrayBlockingQueue<>(100),
  new ThreadPoolExecutor.CallerRunsPolicy()
);

/* Submit with backpressure instead of unbounded queuing */
Future<Image> resized = pool.submit(() -> resize(image));`,
      },
    },
  },

  // ----------------------------------------------------------------- Python
  "python-ai-ml": {
    roadmap: {
      version: "2025.1",
      title: "Python & Machine Learning Roadmap",
      summary:
        "From NumPy internals to production RAG pipelines — the applied ML path for engineers moving into AI systems.",
      reviewedBy: "Staff engineer reviewed",
      breadcrumb: [
        { label: "Roadmaps", href: "/roadmaps" },
        { label: "AI & Machine Learning", href: "/roadmaps/python-ai-ml" },
        { label: "Interactive path" },
      ],
      progress: {
        percent: 0,
        topicsDone: 0,
        topicsTotal: 20,
        nextMilestone: "Complete your first topic to unlock stage 02.",
        streakDays: 0,
        estimatedCompletion: "Not started",
        peers: ["Meera Iyer", "Yash Kapoor"],
        peerOverflow: 91,
      },
    },
    stages: [
      {
        id: "stage-01",
        index: "01",
        title: "Python & Numerical Foundations",
        status: "active",
        meta: "Est. 5h remaining",
        completionLabel: "0 of 3 started",
        topics: [
          {
            id: "num-01",
            code: "NUM-01",
            icon: Sigma,
            title: "NumPy Internals & Vectorization",
            description:
              "Get comfortable replacing loops with broadcasted array operations before moving into tensor libraries.",
            status: "active",
            level: "Beginner",
            progress: 0,
            subtopicsDone: 0,
            subtopicsTotal: 4,
            timeLeft: "Not started",
          },
          {
            id: "pandas-02",
            code: "DATA-02",
            icon: LineChart,
            title: "Pandas for Data Wrangling",
            description: "Vectorized transforms, groupby internals, memory layout",
            status: "next",
            statusLabel: "Est. 2 hrs",
          },
          {
            id: "torch-03",
            code: "ML-03",
            icon: Bot,
            title: "PyTorch Tensors & Autograd",
            description: "Computation graphs, gradients, custom loss functions",
            status: "locked",
          },
        ],
      },
      {
        id: "stage-02",
        index: "02",
        title: "Applied ML & RAG Pipelines",
        status: "locked",
        meta: "Unlocks after stage 01",
        completionLabel: "0 of 3 completed",
        topics: [
          {
            id: "vec-04",
            code: "ML-04",
            icon: Layers,
            title: "Vector Databases & Embeddings",
            description: "pgvector, Pinecone, approximate nearest neighbour search",
            status: "locked",
          },
          {
            id: "rag-05",
            code: "ML-05",
            icon: Network,
            title: "Retrieval-Augmented Generation Pipelines",
            description: "Chunking strategies, reranking, hallucination mitigation",
            status: "locked",
          },
          {
            id: "ft-06",
            code: "ML-06",
            icon: Brain,
            title: "Fine-Tuning & LoRA Adapters",
            description: "Parameter-efficient fine-tuning, evaluation harnesses",
            status: "locked",
          },
        ],
      },
    ],
    selectedTopic: {
      id: "num-01",
      title: "NumPy Internals & Vectorization",
      description:
        "Understand how NumPy stores and operates on arrays so you can write vectorized code that's an order of magnitude faster than Python loops.",
      level: "Beginner",
      duration: "2 hours",
      studyMaterial: [
        {
          id: "sm1",
          type: "docs",
          title: "NumPy Broadcasting — User Guide",
          source: "numpy.org",
          meta: "9 min read",
          href: "https://numpy.org/doc/stable/user/basics.broadcasting.html",
        },
        {
          id: "sm2",
          type: "docs",
          title: "The N-Dimensional Array (ndarray)",
          source: "numpy.org",
          meta: "12 min read",
          href: "https://numpy.org/doc/stable/reference/arrays.ndarray.html",
        },
        {
          id: "sm3",
          type: "article",
          title: "NumPy Array Programming",
          source: "realpython.com",
          meta: "20 min read",
          href: "https://realpython.com/numpy-array-programming/",
        },
      ],
      outcomes: [
        { id: "o1", label: "Strides, dtypes & contiguous memory layout", done: false },
        { id: "o2", label: "Broadcasting rules & shape alignment", done: false },
        { id: "o3", label: "Vectorizing loops with ufuncs", done: false },
        { id: "o4", label: "Views vs copies & avoiding silent bugs", done: false },
      ],
      challenges: [
        {
          id: "c1",
          title: "Vectorize a pairwise distance calculation",
          description: "Broadcasting, avoiding intermediate copies",
          difficulty: "Easy",
        },
        {
          id: "c2",
          title: "Debug a silent view/copy mutation bug",
          description: "Memory layout, .copy() vs slicing",
          difficulty: "Medium",
        },
      ],
      discussion: {
        activeCount: 12,
        hotThread: "NumPy 2.0 breaking changes",
        href: "/questions?topic=numpy",
      },
      mentorship: {
        slots: 4,
        label: "ML platform engineers",
        href: "/mentorship?topic=numpy",
      },
      snippet: {
        filename: "vectorized_distance.py",
        code: `import numpy as np

# Pairwise Euclidean distance without Python loops
def pairwise_distance(a, b):
    diff = a[:, None, :] - b[None, :, :]
    return np.sqrt((diff ** 2).sum(axis=-1))`,
      },
    },
  },

  // ---------------------------------------------------------------- DevOps
  "devops-cloud": {
    roadmap: {
      version: "2025.1",
      title: "DevOps & Cloud Infrastructure Roadmap",
      summary:
        "Containers, orchestration, infrastructure as code, and CI/CD pipelines — the operational backbone behind every production system.",
      reviewedBy: "Staff SRE reviewed",
      breadcrumb: [
        { label: "Roadmaps", href: "/roadmaps" },
        { label: "DevOps & Cloud Infrastructure", href: "/roadmaps/devops-cloud" },
        { label: "Interactive path" },
      ],
      progress: {
        percent: 14,
        topicsDone: 3,
        topicsTotal: 22,
        nextMilestone: "Next verification milestone at stage 01 completion.",
        streakDays: 3,
        estimatedCompletion: "~8 weeks",
        peers: ["Nikhil Shah", "Priya Nair"],
        peerOverflow: 47,
      },
    },
    stages: [
      {
        id: "stage-01",
        index: "01",
        title: "Containers & Local Orchestration",
        status: "active",
        meta: "Est. 5h remaining",
        completionLabel: "1 of 3 in progress",
        topics: [
          {
            id: "docker-01",
            code: "OPS-01",
            icon: Container,
            title: "Docker Images & Multi-Stage Builds",
            description: "Layer caching, distroless images, build contexts",
            status: "mastered",
            statusLabel: "Mastered",
          },
          {
            id: "k8s-02",
            code: "OPS-02",
            icon: Workflow,
            title: "Kubernetes Core Objects & Networking",
            description:
              "Get comfortable reasoning about pods, services, and ingress before touching production clusters — this is the foundation everything else builds on.",
            status: "active",
            level: "Intermediate",
            progress: 30,
            subtopicsDone: 1,
            subtopicsTotal: 4,
            timeLeft: "2h left to verify",
          },
          {
            id: "compose-03",
            code: "OPS-03",
            icon: GitBranch,
            title: "CI/CD Pipelines with GitHub Actions",
            description: "Matrix builds, caching strategies, deployment gates",
            status: "next",
            statusLabel: "Est. 3 hrs",
          },
        ],
      },
      {
        id: "stage-02",
        index: "02",
        title: "Infrastructure as Code & Observability",
        status: "locked",
        meta: "Unlocks after stage 01",
        completionLabel: "0 of 3 completed",
        topics: [
          {
            id: "tf-04",
            code: "IAC-04",
            icon: Cloud,
            title: "Terraform Modules & State Management",
            description: "Remote state, workspaces, drift detection",
            status: "locked",
          },
          {
            id: "obs-05",
            code: "OBS-05",
            icon: Activity,
            title: "Prometheus, Grafana & Alerting",
            description: "PromQL, histogram buckets, alert fatigue reduction",
            status: "locked",
          },
          {
            id: "sec-06",
            code: "SEC-06",
            icon: ShieldCheck,
            title: "Cloud IAM & Secrets Management",
            description: "Least-privilege roles, Vault, secret rotation",
            status: "locked",
          },
        ],
      },
    ],
    selectedTopic: {
      id: "k8s-02",
      title: "Kubernetes Core Objects & Networking",
      description:
        "Learn how pods, services, and ingress fit together so a deployment behaves predictably instead of becoming a debugging mystery at 2am.",
      level: "Intermediate",
      duration: "3 hours",
      studyMaterial: [
        {
          id: "sm1",
          type: "docs",
          title: "Pods — Kubernetes Concepts",
          source: "kubernetes.io",
          meta: "8 min read",
          href: "https://kubernetes.io/docs/concepts/workloads/pods/",
        },
        {
          id: "sm2",
          type: "docs",
          title: "Service — Kubernetes Concepts",
          source: "kubernetes.io",
          meta: "12 min read",
          href: "https://kubernetes.io/docs/concepts/services-networking/service/",
        },
        {
          id: "sm3",
          type: "docs",
          title: "Ingress — Kubernetes Concepts",
          source: "kubernetes.io",
          meta: "10 min read",
          href: "https://kubernetes.io/docs/concepts/services-networking/ingress/",
        },
      ],
      outcomes: [
        { id: "o1", label: "Pods, ReplicaSets & Deployments", done: true },
        { id: "o2", label: "ClusterIP, NodePort & LoadBalancer services", done: false },
        { id: "o3", label: "Ingress controllers & path-based routing", done: false },
        { id: "o4", label: "ConfigMaps, Secrets & readiness probes", done: false },
      ],
      challenges: [
        {
          id: "c1",
          title: "Deploy a 3-tier app with rolling updates",
          description: "Readiness probes, resource limits, zero-downtime rollout",
          difficulty: "Medium",
        },
        {
          id: "c2",
          title: "Debug a CrashLoopBackOff in production",
          description: "Log inspection, describe events, resource constraints",
          difficulty: "Hard",
        },
      ],
      discussion: {
        activeCount: 21,
        hotThread: "Helm vs Kustomize in 2025",
        href: "/questions?topic=kubernetes",
      },
      mentorship: {
        slots: 2,
        label: "Site reliability engineers",
        href: "/mentorship?topic=kubernetes",
      },
      snippet: {
        filename: "deployment.yaml",
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 0
  template:
    spec:
      containers:
        - name: api
          readinessProbe:
            httpGet: { path: /healthz, port: 8080 }`,
      },
    },
  },

  // ------------------------------------------------------------------- DSA
  "dsa-interview": {
    roadmap: {
      version: "2025.1",
      title: "Data Structures & Algorithms Roadmap",
      summary:
        "The core patterns behind every technical interview — arrays, trees, graphs, and the trade-offs between them.",
      reviewedBy: "Staff engineer reviewed",
      breadcrumb: [
        { label: "Roadmaps", href: "/roadmaps" },
        { label: "Data Structures & Algorithms", href: "/roadmaps/dsa-interview" },
        { label: "Interactive path" },
      ],
      progress: {
        percent: 37,
        topicsDone: 11,
        topicsTotal: 30,
        nextMilestone: "Next verification milestone at stage 02 completion.",
        streakDays: 9,
        estimatedCompletion: "~5 weeks",
        peers: ["Arjun Nambiar", "Fatima Sheikh", "Rohan Das"],
        peerOverflow: 203,
      },
    },
    stages: [
      {
        id: "stage-01",
        index: "01",
        title: "Arrays, Strings & Complexity",
        status: "complete",
        meta: "3 / 3 topics",
        completionLabel: "100% complete",
        topics: [
          {
            id: "big-o-01",
            code: "DSA-01",
            icon: ListOrdered,
            title: "Big-O Analysis & Two-Pointer Patterns",
            description: "Time/space trade-offs, sliding window, prefix sums",
            status: "mastered",
            statusLabel: "Mastered",
          },
          {
            id: "hash-02",
            code: "DSA-02",
            icon: Braces,
            title: "Hash Maps & Set-Based Techniques",
            description: "Collision handling, frequency counting, dedup patterns",
            status: "mastered",
            statusLabel: "Mastered",
          },
          {
            id: "recur-03",
            code: "DSA-03",
            icon: GitBranch,
            title: "Recursion & Backtracking Fundamentals",
            description: "Base cases, state-space trees, pruning",
            status: "mastered",
            statusLabel: "Mastered",
          },
        ],
      },
      {
        id: "stage-02",
        index: "02",
        title: "Trees, Heaps & Graphs",
        status: "active",
        meta: "Est. 6h remaining",
        completionLabel: "1 of 3 in progress",
        topics: [
          {
            id: "trees-04",
            code: "DSA-04",
            icon: TreePine,
            title: "Binary Trees & BST Traversals",
            description: "In-order/pre-order/post-order, balanced tree invariants",
            status: "completed",
            statusLabel: "Completed",
          },
          {
            id: "graphs-05",
            code: "DSA-05",
            icon: Network,
            title: "Graph Traversal — BFS, DFS & Shortest Paths",
            description:
              "Master the two traversal primitives everything else builds on, then layer in Dijkstra once BFS/DFS feel automatic.",
            status: "active",
            level: "Intermediate",
            progress: 55,
            subtopicsDone: 2,
            subtopicsTotal: 4,
            timeLeft: "1h 10m left to verify",
          },
          {
            id: "heaps-06",
            code: "DSA-06",
            icon: Layers,
            title: "Heaps & Priority Queue Patterns",
            description: "Top-K problems, merge-k-lists, median maintenance",
            status: "next",
            statusLabel: "Est. 2 hrs",
          },
        ],
      },
    ],
    selectedTopic: {
      id: "graphs-05",
      title: "Graph Traversal — BFS, DFS & Shortest Paths",
      description:
        "Build the mental model for exploring graphs level-by-level (BFS) versus depth-first (DFS), then extend into weighted shortest-path problems.",
      level: "Intermediate",
      duration: "2.5 hours",
      studyMaterial: [
        {
          id: "sm1",
          type: "article",
          title: "Breadth First Search or BFS for a Graph",
          source: "geeksforgeeks.org",
          meta: "10 min read",
          href: "https://www.geeksforgeeks.org/dsa/breadth-first-search-or-bfs-for-a-graph/",
        },
        {
          id: "sm2",
          type: "article",
          title: "Depth First Search or DFS for a Graph",
          source: "geeksforgeeks.org",
          meta: "10 min read",
          href: "https://www.geeksforgeeks.org/dsa/depth-first-search-or-dfs-for-a-graph/",
        },
        {
          id: "sm3",
          type: "interactive",
          title: "Single-Source Shortest Path — Visualization",
          source: "visualgo.net",
          meta: "Interactive",
          href: "https://visualgo.net/en/sssp",
        },
      ],
      outcomes: [
        { id: "o1", label: "Adjacency list vs matrix trade-offs", done: true },
        { id: "o2", label: "BFS for shortest unweighted paths", done: true },
        { id: "o3", label: "DFS, cycle detection & topological sort", done: false },
        { id: "o4", label: "Dijkstra's algorithm with a min-heap", done: false },
      ],
      challenges: [
        {
          id: "c1",
          title: "Find the shortest path in a grid with obstacles",
          description: "BFS on an implicit graph, visited-set pruning",
          difficulty: "Medium",
        },
        {
          id: "c2",
          title: "Detect a cycle in a directed dependency graph",
          description: "DFS with recursion stack, topological sort",
          difficulty: "Hard",
        },
      ],
      discussion: {
        activeCount: 27,
        hotThread: "When to reach for Dijkstra vs BFS",
        href: "/questions?topic=graphs",
      },
      mentorship: {
        slots: 3,
        label: "Ex-FAANG interview coaches",
        href: "/mentorship?topic=graphs",
      },
      snippet: {
        filename: "bfs_shortest_path.py",
        code: `from collections import deque

def bfs_shortest_path(graph, start, target):
    queue = deque([(start, 0)])
    visited = {start}

    while queue:
        node, dist = queue.popleft()
        if node == target:
            return dist
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))
    return -1`,
      },
    },
  },
};
