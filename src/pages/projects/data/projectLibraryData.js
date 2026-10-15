// Data for the "Project Library" section on the Projects page — a
// downloadable, multi-language showcase that sits alongside (not instead
// of) the existing team-collaboration board above it.

/** GitHub-style per-language color dot + display order. */
export const LANGUAGE_META = {
  JavaScript: { color: "#f1e05a" },
  TypeScript: { color: "#3178c6" },
  Python: { color: "#3572A5" },
  Java: { color: "#b07219" },
  "C++": { color: "#f34b7d" },
  Go: { color: "#00ADD8" },
  Rust: { color: "#dea584" },
  PHP: { color: "#4F5D95" },
  Kotlin: { color: "#A97BFF" },
  Swift: { color: "#F05138" },
  Other: { color: "#8b93a7" },
};

export const LIBRARY_LANGUAGES = Object.keys(LANGUAGE_META).filter((l) => l !== "Other");