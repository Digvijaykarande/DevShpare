// Technical & Developer News Data Service for Devsphere
export const NEWS_CATEGORIES = [
  "All News",
  "AI & ML",
  "Web & Software",
  "Cloud & DevOps",
  "Cybersecurity",
  "Tech Industry",
  "Open Source",
  "Mobile Dev",
];

export const PERSONALIZATION_TOPICS = [
  "AI & LLMs",
  "React & Frontend",
  "Node.js & Backend",
  "Python & Data",
  "Cloud & DevOps",
  "Cybersecurity",
  "Open Source",
  "Mobile Development",
  "Dev Tools & IDEs",
  "System Architecture",
];

const API_KEY = "pub_a27a9fac810d44688694f9933869e639";
// Technology news query in English
const API_URL = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=en&category=technology`;

const TONE_PALETTE = [
  "from-violet-950 via-indigo-900 to-slate-900",
  "from-blue-900 via-indigo-950 to-slate-900",
  "from-emerald-950 via-teal-900 to-slate-900",
  "from-purple-950 via-violet-900 to-slate-900",
  "from-cyan-950 via-blue-900 to-slate-900",
  "from-slate-900 via-slate-950 to-black",
];

const CATEGORY_IMAGES = {
  "AI & ML": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
  "Web & Software": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80",
  "Cloud & DevOps": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
  "Cybersecurity": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
  "Open Source": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80",
  "Mobile Dev": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
  "Tech Industry": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
};

export function getCategoryFallbackImage(category) {
  return CATEGORY_IMAGES[category] || CATEGORY_IMAGES["Tech Industry"];
}

function toneForIndex(index) {
  return TONE_PALETTE[index % TONE_PALETTE.length];
}

function brandFromSource(sourceId) {
  if (!sourceId) return "DEV NEWS";
  const cleaned = sourceId.replace(/[-_]/g, " ").toUpperCase();
  if (cleaned.includes("TECH")) return "TECHCRUNCH";
  if (cleaned.includes("VERGE")) return "THE VERGE";
  if (cleaned.includes("GITHUB")) return "GITHUB BLOG";
  if (cleaned.includes("HACKER")) return "HACKER NEWS";
  if (cleaned.includes("ARSTECHNICA") || cleaned.includes("ARS")) return "ARS TECHNICA";
  if (cleaned.includes("WIRED")) return "WIRED";
  if (cleaned.includes("ZDNET")) return "ZDNET";
  return cleaned.slice(0, 14);
}

function calculateReadTime(text) {
  if (!text) return "2 min read";
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 160);
  return `${Math.max(1, minutes)} min read`;
}

// Map article content to developer tech categories
function inferTechCategory(title = "", description = "", rawCategory = "") {
  const text = `${title} ${description} ${rawCategory}`.toLowerCase();

  if (/ai|llm|gpt|openai|claude|deepseek|gemini|machine learning|neural|anthropic|copilot|model|agent/.test(text)) {
    return "AI & ML";
  }
  if (/web|react|javascript|typescript|next\.js|frontend|backend|css|node|api|vue|angular|html|framework|compiler|browser/.test(text)) {
    return "Web & Software";
  }
  if (/cloud|aws|azure|gcp|docker|kubernetes|devops|serverless|infrastructure|terraform|microservice|cluster/.test(text)) {
    return "Cloud & DevOps";
  }
  if (/security|vulnerability|cyber|malware|hack|breach|exploit|patch|firewall|zero-day|cve|ransomware|encryption/.test(text)) {
    return "Cybersecurity";
  }
  if (/open source|github|git|linux|kernel|rust|community|mit license|apache|package|repository/.test(text)) {
    return "Open Source";
  }
  if (/mobile|ios|android|flutter|react native|swift|kotlin|app store|play store/.test(text)) {
    return "Mobile Dev";
  }
  return "Tech Industry";
}

// Check for non-technical news noise to exclude
function isNonTech(title = "", description = "") {
  const text = `${title} ${description}`.toLowerCase();
  const nonTechKeywords = [
    "killed", "murder", "accident", "garbage", "naga council", "police", "arrested",
    "crime", "theft", "sports score", "gold medal", "cricket match", "footwear",
    "highway crash", "political rally", "minister resigned", "garbage dumping", "deadly collision", "election"
  ];
  return nonTechKeywords.some((word) => text.includes(word));
}

function formatDate(pubDate) {
  if (!pubDate) return "Today";
  const parsed = new Date(pubDate);
  if (Number.isNaN(parsed.getTime())) return "Today";

  const now = new Date();
  const diffHours = Math.floor((now - parsed) / (1000 * 60 * 60));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffHours < 48) return "Yesterday";

  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function mapArticle(raw, index) {
  const rawCat = Array.isArray(raw.category) ? raw.category[0] : raw.category;
  const category = inferTechCategory(raw.title, raw.description, rawCat);
  const tone = toneForIndex(index);

  const hasUsableContent = raw.content && raw.content !== "ONLY AVAILABLE IN PAID PLANS" && raw.content.length > 80;
  const fullBody = hasUsableContent ? raw.content : (raw.description || "Full article is available on the original news source link.");
  const image = raw.image_url || getCategoryFallbackImage(category);

  return {
    id: raw.article_id || raw.link || `tech-art-${index}-${Date.now()}`,
    title: raw.title || "Latest Technical Update",
    summary: raw.description || "Read latest updates and technical details from the developer ecosystem.",
    body: fullBody,
    category,
    date: formatDate(raw.pubDate),
    brand: brandFromSource(raw.source_id),
    tone: `bg-gradient-to-br ${tone}`,
    brandTone: `bg-gradient-to-r ${tone}`,
    source: raw.source_id ? raw.source_id.toUpperCase() : "Tech Dispatch",
    link: raw.link || "#",
    image,
    readTime: calculateReadTime(fullBody),
  };
}

// Curated high-quality developer tech articles for fallback & instant high quality feed
const FALLBACK_TECH_ARTICLES = [
  {
    id: "fb-1",
    title: "OpenAI Unveils Advanced Reasoning Models with Multimodal Code Analysis",
    summary: "The latest model updates bring real-time code debugging, automated refactoring suggestions, and deep stack trace breakdown to developer workflows.",
    body: "OpenAI has announced a major breakthrough in reasoning capabilities for developer environments. The newly released model excels at analyzing complex multi-file codebases, spotting memory leaks, and generating verified patch diffs with high precision.\n\nDevelopers can integrate these capabilities directly into their IDEs, enabling seamless pair programming, automated test generation, and intelligent architecture reviews across JavaScript, Python, Go, and Rust projects.",
    category: "AI & ML",
    date: "2 hours ago",
    brand: "OPENAI BLOG",
    tone: "bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900",
    brandTone: "bg-gradient-to-r from-indigo-600 to-purple-600",
    source: "OPENAI ENGINEERING",
    link: "https://openai.com/index/developers",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "fb-2",
    title: "React 19 Release Candidate Brings Server Actions & Async Asset Preloading",
    summary: "The React team details production guidelines for Server Components, optimistic UI state updates, and automatic form status hooks.",
    body: "React 19 official release candidate is now available on npm. Key features include first-class support for async actions, useActionState, useFormStatus, and simplified metadata handling in `<head>` elements without external packages.\n\nThe update dramatically reduces boilerplate code for data fetching and mutations while improving server-rendered application performance and web vitals.",
    category: "Web & Software",
    date: "4 hours ago",
    brand: "REACT DEV",
    tone: "bg-gradient-to-br from-blue-900 via-cyan-900 to-slate-900",
    brandTone: "bg-gradient-to-r from-blue-600 to-cyan-600",
    source: "REACT CORE TEAM",
    link: "https://react.dev/blog",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "fb-3",
    title: "Linux Kernel 6.12 Officially Merges Extended Rust Drivers & Real-time Scheduling",
    summary: "Linus Torvalds approves major kernel updates including PREEMPT_RT real-time patches and enhanced memory safety abstractions built in Rust.",
    body: "Linux 6.12 has officially landed with full integration of PREEMPT_RT, turning mainline Linux into a deterministic real-time operating system. Additionally, new Rust bindings for PCI devices and memory allocators mark a significant milestone for low-level system safety.",
    category: "Open Source",
    date: "6 hours ago",
    brand: "KERNEL ORG",
    tone: "bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900",
    brandTone: "bg-gradient-to-r from-emerald-600 to-teal-600",
    source: "LINUX KERNEL ARCHIVES",
    link: "https://kernel.org",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "fb-4",
    title: "Critical Vulnerability Discovered in Popular Node.js Package Dependencies",
    summary: "Cybersecurity researchers publish proof-of-concept for supply chain vulnerability affecting automated CI/CD build pipelines.",
    body: "A high-severity zero-day vulnerability (CVE-2026-4412) was identified in transitive dependencies used across npm and yarn workflows. Security experts advise dev teams to upgrade lockfiles immediately and audit third-party build scripts.",
    category: "Cybersecurity",
    date: "8 hours ago",
    brand: "SECURITY WEEK",
    tone: "bg-gradient-to-br from-rose-950 via-pink-900 to-slate-900",
    brandTone: "bg-gradient-to-r from-rose-600 to-pink-600",
    source: "CYBERSECURITY INSIDER",
    link: "https://thehackernews.com",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "fb-5",
    title: "AWS Announces Next-Gen Serverless Scaling with Zero Cold Start Overhead",
    summary: "New microVM architecture cuts container startup times under 15ms with automatic memory footprint compression.",
    body: "Amazon Web Services has introduced Firecracker 2.0 container runtimes for ECS and Lambda. Developers can deploy microservices with instantaneous scaling capabilities without paying for idle server instances.",
    category: "Cloud & DevOps",
    date: "12 hours ago",
    brand: "AWS DEVS",
    tone: "bg-gradient-to-br from-amber-950 via-orange-900 to-slate-900",
    brandTone: "bg-gradient-to-r from-amber-600 to-orange-600",
    source: "AWS ARCHITECTURE BLOG",
    link: "https://aws.amazon.com/blogs/aws",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "fb-6",
    title: "TypeScript 5.6 Introduces Strict Disallowed Expressions & Async Iterator Helpers",
    summary: "The TypeScript compiler adds checks for truthiness violations in conditional checks and native helper methods for AsyncIterators.",
    body: "TypeScript 5.6 is now released. It prevents common logic bugs where regular expressions or functions are accidentally evaluated as always-truthy in `if` statements, while improving compilation performance across large monorepo codebases.",
    category: "Web & Software",
    date: "1 day ago",
    brand: "TS DEV BLOG",
    tone: "bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-900",
    brandTone: "bg-gradient-to-r from-blue-600 to-indigo-600",
    source: "TYPESCRIPT ENGINEERING",
    link: "https://devblogs.microsoft.com/typescript",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1516116211223-4c71424a1804?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "fb-7",
    title: "Flutter 3.24 Enhances Web Assembly (Wasm) Engine & Impeller Renderer",
    summary: "Google delivers Wasm GC compilation for Flutter Web with up to 3x higher frame rates and zero-jank graphics rendering.",
    body: "Flutter 3.24 unlocks full Wasm GC compilation for web applications. Combined with the Impeller rendering engine enabled by default on iOS and Android, cross-platform apps now achieve smooth 120 FPS animations effortlessly.",
    category: "Mobile Dev",
    date: "1 day ago",
    brand: "FLUTTER DEV",
    tone: "bg-gradient-to-br from-cyan-950 via-teal-900 to-slate-900",
    brandTone: "bg-gradient-to-r from-cyan-500 to-blue-600",
    source: "FLUTTER ENGINEERING",
    link: "https://medium.com/flutter",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
  },
];

export async function fetchLiveNews() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    const rawResults = data.results || [];

    // Filter to ensure strictly developer & tech content only
    const techArticles = rawResults
      .filter((raw) => !isNonTech(raw.title, raw.description))
      .map(mapArticle);

    // Combine live results with curated fallbacks for maximum depth
    const combinedArticles = techArticles.length >= 3
      ? [...techArticles, ...FALLBACK_TECH_ARTICLES]
      : FALLBACK_TECH_ARTICLES;

    // Deduplicate by title
    const seen = new Set();
    const articles = combinedArticles.filter((art) => {
      const key = art.title.toLowerCase().trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return {
      categories: NEWS_CATEGORIES,
      featured: articles[0] || FALLBACK_TECH_ARTICLES[0],
      topStories: articles.slice(1, 4),
      latestNews: articles.slice(4),
      allNews: articles,
    };
  } catch (error) {
    console.warn("Using high-quality fallback technical news stream:", error);
    return {
      categories: NEWS_CATEGORIES,
      featured: FALLBACK_TECH_ARTICLES[0],
      topStories: FALLBACK_TECH_ARTICLES.slice(1, 4),
      latestNews: FALLBACK_TECH_ARTICLES.slice(4),
      allNews: FALLBACK_TECH_ARTICLES,
    };
  }
}