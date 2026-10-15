// Static lookups for the community discussions board. Questions, top contributors and
// popular tags now come from the backend.

export const TAGS = [
  "React",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "CSS",
  "Python",
  "Arrays",
  "System Design",
  "Git",
  "SQL",
  "Career",
  "Docker",
  "Rust",
  "Go",
  "Distributed Systems",
];

export const SORT_OPTIONS = ["Active", "Newest", "Unanswered", "Most votes", "Most viewed"];

// ---------- Feed tabs + category pills ----------
export const FEED_TABS = [
  { value: "latest", label: "Latest" },
  { value: "trending", label: "Trending" },
  { value: "unanswered", label: "Unanswered" },
  { value: "solved", label: "Solved" },
  { value: "bookmarks", label: "My Bookmarks" },
];

// Category pill -> tags that belong to it (lowercase, matched case-insensitively)
export const CATEGORIES = {
  All: [],
  Architecture: ["system design", "architecture", "docker"],
  "Distributed Systems": ["distributed systems", "cockroachdb", "system design", "networking"],
  Frontend: ["react", "react19", "nextjs", "javascript", "typescript", "css"],
  Backend: ["node.js", "nodejs", "python", "prisma", "sql", "concurrency"],
  "Rust & Go": ["rust", "go", "async-io"],
  Database: ["sql", "cockroachdb", "prisma", "database-migration"],
};

// ---------- Sidebar widgets ----------
// Sidebar bounties have no backend yet, so this stays static for now.
export const BOUNTIES = [
  { id: "b1", reward: 500, expiresIn: "2d", title: "Optimize SIMD vectorization in AVX-512 parser crate" },
  { id: "b2", reward: 250, expiresIn: "4d", title: "Reproduce WebRTC renegotiation bug in Safari 18 TP" },
];