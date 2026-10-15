import {
  BookOpen,
  Code2,
  GitBranch,
  GraduationCap,
  Headphones,
  Layers,
  Library,
  MessagesSquare,
  Terminal,
  Wrench,
} from "lucide-react";

// Every filter pill maps to one of these — "All" is injected by the page itself.
export const CATEGORIES = [
  { id: "guides", label: "Guides & Docs", icon: BookOpen },
  { id: "courses", label: "Interactive Courses", icon: GraduationCap },
  { id: "practice", label: "Practice & Tools", icon: Terminal },
  { id: "community", label: "Communities", icon: MessagesSquare },
  { id: "reading", label: "Books & Podcasts", icon: Headphones },
];

const ACCENTS = ["primary", "secondary", "tertiary"];

// Backend stores icons as strings (Resource.iconName); map them back to components.
export const ICON_MAP = { BookOpen, Code2, GitBranch, GraduationCap, Headphones, Layers, Library, MessagesSquare, Terminal, Wrench };
export const resolveIcon = (name) => ICON_MAP[name] || BookOpen;

// url is only set where the destination is a well-established, stable domain —
// left blank for anything the card shouldn't claim to link out to.
export const resources = [
  {
    id: "mdn",
    title: "MDN Web Docs",
    category: "guides",
    type: "Reference",
    provider: "Mozilla",
    icon: BookOpen,
    accent: "primary",
    free: true,
    tags: ["HTML", "CSS", "JavaScript"],
    summary: "The reference every web developer keeps a tab open to — precise, vendor-neutral, and kept current.",
    details:
      "Covers HTML, CSS, JavaScript and the Web APIs from first principles to edge cases, with browser-compatibility tables on nearly every page. Best used as a lookup while you build rather than read cover to cover.",
    url: "https://developer.mozilla.org",
  },
  {
    id: "roadmap-sh",
    title: "roadmap.sh",
    category: "guides",
    type: "Guide",
    provider: "Community",
    icon: Layers,
    accent: "secondary",
    free: true,
    tags: ["Career paths", "Visual guides"],
    summary: "Visual, community-maintained roadmaps for almost every engineering discipline.",
    details:
      "Useful for sanity-checking your own learning order against what the wider community converged on, and for scoping a new discipline before you commit weeks to it.",
    url: "https://roadmap.sh",
  },
  {
    id: "system-design-primer",
    title: "System Design Primer",
    category: "guides",
    type: "Guide",
    provider: "GitHub · donnemartin",
    icon: GitBranch,
    accent: "tertiary",
    free: true,
    tags: ["System Design", "Interviews"],
    summary: "An open-source crash course on designing large-scale systems, with worked examples.",
    details:
      "Walks through scalability fundamentals — caching, load balancing, sharding, consistency trade-offs — then applies them to realistic interview-style prompts with reference solutions.",
    url: "https://github.com/donnemartin/system-design-primer",
  },
  {
    id: "kubernetes-docs",
    title: "Kubernetes Docs",
    category: "guides",
    type: "Reference",
    provider: "CNCF",
    icon: BookOpen,
    accent: "primary",
    free: true,
    tags: ["DevOps", "Containers"],
    summary: "The canonical source for how Kubernetes objects and controllers actually behave.",
    details:
      "Denser than most tutorials, but it's the only place guaranteed to match your cluster's real behavior. The Concepts and Tasks sections are the most useful entry points for day-to-day work.",
    url: "https://kubernetes.io/docs/home/",
  },
  {
    id: "freecodecamp",
    title: "freeCodeCamp",
    category: "courses",
    type: "Course",
    provider: "freeCodeCamp.org",
    icon: GraduationCap,
    accent: "secondary",
    free: true,
    tags: ["Full-Stack", "Certifications"],
    summary: "Project-based curriculum that takes you from fundamentals to shipped full-stack apps.",
    details:
      "Structured into certifications you build toward — each one ends in real projects rather than multiple-choice quizzes, which makes the progress easy to point to later.",
    url: "https://www.freecodecamp.org",
  },
  {
    id: "odin-project",
    title: "The Odin Project",
    category: "courses",
    type: "Course",
    provider: "Community",
    icon: GraduationCap,
    accent: "tertiary",
    free: true,
    tags: ["Full-Stack", "Ruby & JS paths"],
    summary: "A full-stack curriculum built entirely from other free resources, stitched into a coherent path.",
    details:
      "Doesn't reinvent content — it curates and sequences the best existing free material, then adds its own projects to force you to actually apply it before moving on.",
    url: "https://www.theodinproject.com",
  },
  {
    id: "cs50",
    title: "CS50: Intro to Computer Science",
    category: "courses",
    type: "Course",
    provider: "Harvard University",
    icon: GraduationCap,
    accent: "primary",
    free: true,
    tags: ["CS Fundamentals", "Algorithms"],
    summary: "Harvard's famous intro course — a genuinely rigorous foundation, free and self-paced online.",
    details:
      "Starts from C and works up through arrays, algorithms, memory, data structures and web development. Heavier than most bootcamp-style courses, but it pays off in how little you have to relearn later.",
    url: "https://cs50.harvard.edu/x/",
  },
  {
    id: "aws-skill-builder",
    title: "AWS Skill Builder",
    category: "courses",
    type: "Course",
    provider: "Amazon Web Services",
    icon: GraduationCap,
    accent: "secondary",
    free: true,
    tags: ["Cloud", "Certifications"],
    summary: "Official, free training paths that map directly onto AWS certification exams.",
    details:
      "Good for structured cloud learning specifically because the content and the exam are written by the same team — there's no guessing which parts matter.",
    url: "https://skillbuilder.aws",
  },
  {
    id: "leetcode",
    title: "LeetCode",
    category: "practice",
    type: "Practice",
    provider: "LeetCode",
    icon: Terminal,
    accent: "tertiary",
    free: true,
    tags: ["DSA", "Mock Interviews"],
    summary: "The default place to drill data structures and algorithms under a timer.",
    details:
      "Thousands of problems tagged by pattern and company, plus timed mock-interview mode. Most useful once you already know the underlying concepts and just need reps.",
    url: "https://leetcode.com",
  },
  {
    id: "exercism",
    title: "Exercism",
    category: "practice",
    type: "Practice",
    provider: "Exercism.org",
    icon: Code2,
    accent: "primary",
    free: true,
    tags: ["Language mastery", "Mentored review"],
    summary: "Language-specific exercises with real humans reviewing your solutions for free.",
    details:
      "Less about interview drills, more about actually getting fluent in a language's idioms — the mentor feedback on style and edge cases is the real value here.",
    url: "https://exercism.org",
  },
  {
    id: "regex101",
    title: "Regex101",
    category: "practice",
    type: "Tool",
    provider: "regex101.com",
    icon: Wrench,
    accent: "secondary",
    free: true,
    tags: ["Regex", "Debugging"],
    summary: "Build and debug regular expressions with a live, explained match breakdown.",
    details:
      "Explains every token of your pattern in plain language as you type, which makes it far faster than trial-and-error for anything beyond a trivial regex.",
    url: "https://regex101.com",
  },
  {
    id: "stackoverflow",
    title: "Stack Overflow",
    category: "community",
    type: "Community",
    provider: "Stack Exchange",
    icon: MessagesSquare,
    accent: "tertiary",
    free: true,
    tags: ["Q&A", "Troubleshooting"],
    summary: "The largest archive of already-answered programming questions on the internet.",
    details:
      "Search before you post — odds are good your exact error has already been solved. Answers are voted and edited over time, so older accepted answers can occasionally be stale.",
    url: "https://stackoverflow.com",
  },
  {
    id: "devto",
    title: "DEV Community",
    category: "community",
    type: "Community",
    provider: "dev.to",
    icon: MessagesSquare,
    accent: "primary",
    free: true,
    tags: ["Blogging", "Discussion"],
    summary: "A friendlier, more conversational corner of the internet for developer writing.",
    details:
      "Good for reading how other engineers actually think through problems, and a low-pressure place to publish your own write-ups once you're ready to start sharing.",
    url: "https://dev.to",
  },
  {
    id: "syntax-fm",
    title: "Syntax.fm",
    category: "reading",
    type: "Podcast",
    provider: "Wes Bos & Scott Tolinski",
    icon: Headphones,
    accent: "secondary",
    free: true,
    tags: ["Web Dev", "Weekly"],
    summary: "A weekly podcast on web development — practical, opinionated, and easy to binge on a commute.",
    details:
      "Two working developers talking through real tools and decisions rather than abstract theory. A good way to keep pace with the ecosystem without doom-scrolling changelogs.",
    url: "https://syntax.fm",
  },
  {
    id: "ddia",
    title: "Designing Data-Intensive Applications",
    category: "reading",
    type: "Book",
    provider: "Martin Kleppmann",
    icon: Library,
    accent: "tertiary",
    free: false,
    tags: ["Systems", "Databases"],
    summary: "The book engineers reach for once tutorials stop being enough for real backend systems.",
    details:
      "Covers replication, partitioning, transactions and consistency models with enough rigor to actually reason about trade-offs in a design review, not just recall buzzwords.",
    url: "",
  },
];

export const resourceStats = [
  { label: "Curated resources", value: `${resources.length}` },
  { label: "Free to start", value: `${resources.filter((r) => r.free).length}` },
  { label: "Categories", value: `${CATEGORIES.length}` },
];

export function accentFor(index) {
  return ACCENTS[index % ACCENTS.length];
}