import {
  GraduationCap,
  CodeXml,
  Boxes,
  Award,
  Cloud,
  Bot,
  UserSearch,
  MessageSquare,
  CheckCircle2,
  Code2,
  UserPlus,
  Radio,
} from "lucide-react";

// ---------------------------------------------------------------------------
// All data below is mock/placeholder data mirroring the Stitch design.
// Once the backend is ready, replace these exports with API calls / hooks
// (e.g. React Query) — the components consuming this data don't need to change
// as long as the shape stays the same.
// ---------------------------------------------------------------------------

export const currentUser = {
  name: "Alex Chen",
  tierLabel: "Pro Tier Active",
  streakDays: 14,
  tagline: "Keep learning. Keep building. Keep growing.",
};

export const quickActions = [
  { id: "ask-question", label: "Ask Question", icon: "contact_support", variant: "outline" },
  { id: "find-projects", label: "Find Projects", icon: "group_add", variant: "outline" },
  { id: "resume-practice", label: "Resume Practice", icon: "terminal", variant: "primary" },
];

export const kpis = [
  {
    id: "learning-progress",
    label: "Learning Progress",
    icon: GraduationCap,
    iconBg: "bg-indigo-50 border-indigo-100",
    iconColor: "text-indigo-600",
    value: "68%",
    trend: { label: "+4.2%", direction: "up" },
    subtitle: "React & Distributed Track",
    type: "progress",
    progress: { percent: 68, barColor: "bg-indigo-600" },
  },
  {
    id: "problems-solved",
    label: "Problems Solved",
    icon: CodeXml,
    iconBg: "bg-sky-50 border-sky-100",
    iconColor: "text-sky-600",
    value: "142",
    valueSuffix: "/ 200 target",
    subtitle: "Top 8% this month",
    subtitleColor: "text-sky-700",
    subtitleDot: "bg-sky-500",
    type: "progress",
    progress: { percent: 71, barColor: "bg-sky-500" },
  },
  {
    id: "active-projects",
    label: "Active Projects",
    icon: Boxes,
    iconBg: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-600",
    value: "3",
    valueSuffix: "In Progress",
    subtitle: "1 Leading • 2 Contributing",
    type: "badge",
    badge: { text: "2 PRs Pending" },
    badgeNote: "All builds passing",
  },
  {
    id: "reputation-score",
    label: "Reputation & Score",
    icon: Award,
    iconBg: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-600",
    value: "2,850",
    valueSuffix: "pts",
    subtitle: "Rank #42 Global • Level 5",
    type: "stat",
    statLeft: { text: "+185 this week", direction: "up" },
    statRight: "Next: 3k pts",
  },
];

export const activeRoadmap = {
  badgeText: "Official Roadmap",
  trackText: "Track 04",
  title: "Full Stack Web Mastery (Node.js & Next.js 15)",
  progressNote: "26 of 36 topics completed • 72% done",
  percent: 72,
  next: {
    label: "Next up",
    title: "Server Actions & Optimistic UI Updates",
    tag: "Next.js 15",
    level: "Intermediate",
    duration: "Est. 45 mins",
  },
};

export const projects = [
  {
    id: "opendev-microservices",
    icon: Cloud,
    iconBg: "bg-sky-50 border-sky-100",
    iconColor: "text-sky-600",
    title: "OpenDev Microservices Platform",
    roleLabel: "Role:",
    roleValue: "Backend Contributor",
    stackTag: { text: "Go / gRPC", tone: "emerald" },
    statusBadge: { text: "Milestone 2: Auth & Gateway", tone: "neutral" },
    members: [{ name: "Priya Sharma" }, { name: "Marcus Lee" }, { name: "Jordan Kim" }],
    membersExtra: "+1",
    membersLabel: "4 members",
    footerTag: { text: "2 open roles (DevOps)", icon: UserSearch },
  },
  {
    id: "ai-code-review-bot",
    icon: Bot,
    iconBg: "bg-indigo-50 border-indigo-100",
    iconColor: "text-indigo-600",
    title: "AI Code Review Bot",
    titleBadge: { text: "Creator / Lead" },
    roleLabel: "Repo:",
    roleValue: "devsphere/reviewer-ai",
    roleValueMono: true,
    stackTag: { text: "TypeScript", tone: "sky" },
    statusBadge: { text: "Sprint 3 Active", tone: "emerald", dot: true },
    members: [{ name: "Chen Wu" }, { name: "Ava Torres" }],
    membersLabel: "2 core devs",
    footerText: "7 of 11 Tasks closed",
  },
];

export const recommendations = [
  {
    id: "reverse-nodes",
    tag: { text: "Hard", tone: "rose" },
    meta: "48% Accept",
    icon: Code2,
    title: "Reverse Nodes in k-Group",
    description: "Linked Lists, Recursion, Memory pointer management.",
    ctaText: "Solve Challenge",
  },
  {
    id: "optimistic-cache",
    tag: { text: "+25 Bounty", tone: "emerald" },
    meta: "React Query",
    title: "Optimistic cache invalidation",
    description: "How to properly rollback on network failures with mutation state?",
    ctaText: "Answer Question",
  },
  {
    id: "mentorship-sarah",
    tag: { text: "1:1 Mentorship", tone: "indigo" },
    meta: "Available",
    metaColor: "text-emerald-600",
    title: "Sarah Lin",
    description: "Staff Engineer @ Cloudflare • Distributed edge caching & career guidance.",
    ctaText: "Book Tomorrow",
  },
];

export const weeklyGoal = {
  solved: 7,
  target: 10,
  percent: 70,
  resetLabel: "Resets in 2d",
  days: [
    { label: "Mon", status: "done" },
    { label: "Tue", status: "done" },
    { label: "Wed", status: "done" },
    { label: "Thu", status: "done" },
    { label: "Fri", status: "done" },
    { label: "Sat", status: "today", value: 6 },
    { label: "Sun", status: "upcoming" },
  ],
};

export const activityItems = [
  {
    id: 1,
    icon: MessageSquare,
    iconBg: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-600",
    prefix: "Answered question: ",
    highlight: "Postgres Connection Pooling",
    highlightColor: "text-indigo-600 font-semibold",
    metaPositive: "+15 rep",
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: CheckCircle2,
    iconBg: "bg-indigo-50 border-indigo-100",
    iconColor: "text-indigo-600",
    prefix: "Completed roadmap topic: ",
    highlight: "React Server Components",
    highlightColor: "text-slate-900 font-medium",
    time: "5 hours ago",
  },
  {
    id: 3,
    icon: Code2,
    iconBg: "bg-sky-50 border-sky-100",
    iconColor: "text-sky-600",
    prefix: "Solved coding problem: ",
    highlight: "LRU Cache in Python",
    highlightColor: "text-sky-700 font-semibold",
    metaPositive: "+30 pts",
    time: "Yesterday",
  },
  {
    id: 4,
    icon: UserPlus,
    iconBg: "bg-violet-50 border-violet-100",
    iconColor: "text-violet-600",
    prefix: "Joined project team: ",
    highlight: "OpenDev Microservices",
    highlightColor: "text-slate-900 font-medium",
    time: "2 days ago",
  },
];

export const newBadge = {
  eyebrow: "New Badge Unlocked",
  name: "🎯 Precision Coder",
  description: "10 consecutive clean solutions",
};

export const upcomingEventsMeta = { registeredLabel: "2 Registered" };

export const events = [
  {
    id: "hackathon",
    variant: "featured",
    badgeText: "$10,000 Prize Pool",
    title: "Devsphere Spring Hackathon 2025",
    subtitle: "Theme: Autonomous Dev Tools & Agents",
    countdownValue: "3",
    countdownLabel: "Days",
    registeredText: "1,240 registered",
    ctaText: "View Details",
  },
  {
    id: "ama",
    variant: "plain",
    badgeText: "Live AMA Session",
    title: "System Design for 10M+ Users",
    subtitle: "With Principal Architect @ Stripe",
    icon: Radio,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    dateText: "Tomorrow, 6:00 PM UTC",
    ctaText: "Set Reminder",
  },
];