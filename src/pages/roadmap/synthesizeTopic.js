// data/details.js hand-authors one full topic per roadmap (the "current focus" one).
// Every other topic node still needs to open to *something real* when clicked, so this
// builds a working detail object from the topic's own title/description — real search
// links (not dead "#" hrefs), a sensible checklist, and a practice challenge.

function searchLink(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export function synthesizeTopic(topic) {
  const mastered = topic.status === "mastered" || topic.status === "completed";
  const difficulty = topic.level === "Advanced" ? "Hard" : topic.level === "Beginner" ? "Easy" : "Medium";

  return {
    id: topic.id,
    title: topic.title,
    description: topic.description,
    level: topic.level ?? "Core topic",
    duration: topic.duration ?? "1–2 hours",
    studyMaterial: [
      {
        id: `${topic.id}-docs`,
        type: "docs",
        title: `${topic.title} — reference & docs`,
        source: "Web search",
        meta: "Opens a fresh search",
        href: searchLink(`${topic.title} documentation`),
      },
      {
        id: `${topic.id}-article`,
        type: "article",
        title: `${topic.title}, explained with examples`,
        source: "Web search",
        meta: "~10 min read",
        href: searchLink(`${topic.title} tutorial with examples`),
      },
    ],
    outcomes: [
      { id: `${topic.id}-o1`, label: `Explain the core idea behind ${topic.title}`, done: mastered },
      { id: `${topic.id}-o2`, label: topic.description, done: mastered },
      { id: `${topic.id}-o3`, label: "Solve a practice problem using it", done: false },
    ],
    challenges: [
      {
        id: `${topic.id}-c1`,
        title: `Practice challenge: ${topic.title}`,
        description: topic.description,
        difficulty,
      },
    ],
    discussion: {
      activeCount: 8,
      hotThread: `Best way to approach ${topic.title}?`,
      href: `/questions?topic=${topic.id}`,
    },
    mentorship: {
      slots: 2,
      label: "Mentors can review this topic",
      href: `/mentorship?topic=${topic.id}`,
    },
    snippet: {
      filename: "notes.md",
      code: `# ${topic.title}

${topic.description}

Add your own notes here as you work through this topic.`,
    },
  };
}
