import { LayoutGrid, Coffee, Brain, Cloud, Braces } from "lucide-react";

/**
 * One entry per roadmap shown on the /roadmaps listing page.
 * `slug` must match a key in data/details.js so the card links to real content.
 */
export const roadmapCatalog = [
  {
    slug: "frontend-architecture",
    title: "Full-Stack Web Mastery & Architecture",
    tagline: "React 19 server components, streaming SSR, optimistic UI, and micro-frontends.",
    icon: LayoutGrid,
    accent: "primary",
    level: "Intermediate",
    topicsDone: 24,
    topicsTotal: 36,
    percent: 68,
    estimate: "~3 weeks left",
  },
  {
    slug: "java-backend",
    title: "Java Backend Engineering",
    tagline: "JVM internals, Spring Boot, concurrency primitives, and service design at scale.",
    icon: Coffee,
    accent: "secondary",
    level: "Beginner to advanced",
    topicsDone: 6,
    topicsTotal: 24,
    percent: 25,
    estimate: "~7 weeks left",
  },
  {
    slug: "python-ai-ml",
    title: "Python & Machine Learning",
    tagline: "NumPy internals, PyTorch fundamentals, vector databases, and RAG pipelines.",
    icon: Brain,
    accent: "tertiary",
    level: "Specialization",
    topicsDone: 0,
    topicsTotal: 20,
    percent: 0,
    estimate: "Not started",
  },
  {
    slug: "devops-cloud",
    title: "DevOps & Cloud Infrastructure",
    tagline: "Docker, Kubernetes, Terraform, and CI/CD pipelines that ship safely at 2am.",
    icon: Cloud,
    accent: "secondary",
    level: "Intermediate",
    topicsDone: 3,
    topicsTotal: 22,
    percent: 14,
    estimate: "~8 weeks left",
  },
  {
    slug: "dsa-interview",
    title: "Data Structures & Algorithms",
    tagline: "Arrays to graphs — the core patterns behind every technical interview.",
    icon: Braces,
    accent: "primary",
    level: "Beginner to advanced",
    topicsDone: 11,
    topicsTotal: 30,
    percent: 37,
    estimate: "~5 weeks left",
  },
];
