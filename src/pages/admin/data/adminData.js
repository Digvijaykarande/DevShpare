// Mock data for the admin panel. Each export maps 1:1 to a future REST endpoint.
// TODO(backend): replace with api.get("/admin/<resource>") and turn the add / edit / delete
// handlers in ManagerPage into POST / PATCH / DELETE calls.

export const DASHBOARD = {
  kpis: [
    { id: "users", label: "Total Users", value: "12,842", trend: "+12.9%", note: "+1,432 this month" },
    { id: "content", label: "Total Content", value: "4,291", trend: "+8.3%", note: "Questions, Projects, Tips" },
    { id: "projects", label: "Active Projects", value: "623", trend: "+15.2%", note: "+87 new this month" },
    { id: "competitions", label: "Competitions", value: "18", trend: "+38.6%", note: "5 ongoing" },
  ],
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  growth: {
    Users: { newSeries: [420, 560, 610, 700, 820, 900, 1050, 1180, 1320, 1432], activeSeries: [300, 380, 450, 520, 640, 720, 840, 930, 1040, 1180] },
    Content: { newSeries: [180, 240, 300, 340, 410, 470, 520, 600, 680, 740], activeSeries: [120, 170, 220, 260, 320, 380, 430, 500, 560, 620] },
    Projects: { newSeries: [30, 42, 55, 61, 70, 78, 82, 90, 96, 87], activeSeries: [20, 31, 40, 48, 55, 62, 70, 78, 84, 80] },
  },
  distribution: [
    { label: "Questions", value: 1284, color: "#4f46e5" },
    { label: "Project Ideas", value: 856, color: "#10b981" },
    { label: "Tips & Tricks", value: 711, color: "#f59e0b" },
    { label: "Tech News", value: 642, color: "#06b6d4" },
    { label: "Roadmaps", value: 513, color: "#ef4444" },
    { label: "Others", value: 286, color: "#94a3b8" },
  ],
};

export const ROADMAPS = [
  { id: 1, title: "Full Stack Web Development", category: "Web Dev", level: "Beginner", status: "Published", views: "12.4K" },
  { id: 2, title: "Data Structures & Algorithms", category: "CS", level: "Intermediate", status: "Published", views: "10.8K" },
  { id: 3, title: "Python for AI/ML", category: "AI/ML", level: "Beginner", status: "Published", views: "9.1K" },
  { id: 4, title: "DevOps Roadmap", category: "DevOps", level: "Intermediate", status: "Draft", views: "5.2K" },
  { id: 5, title: "Java Backend Development", category: "Backend", level: "Beginner", status: "Published", views: "8.7K" },
  { id: 6, title: "Mobile App Development", category: "Mobile", level: "Intermediate", status: "Published", views: "6.3K" },
];

export const PROBLEMS = [
  { id: 1, title: "Two Sum", difficulty: "Easy", tags: "Arrays, HashMap", submissions: "12.4K", status: "Published" },
  { id: 2, title: "Valid Parentheses", difficulty: "Easy", tags: "Stack, String", submissions: "9.1K", status: "Published" },
  { id: 3, title: "Merge Two Sorted Lists", difficulty: "Medium", tags: "LinkedList, Recursion", submissions: "6.8K", status: "Published" },
  { id: 4, title: "Binary Tree Inorder Traversal", difficulty: "Medium", tags: "Tree, Stack", submissions: "5.2K", status: "Published" },
  { id: 5, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", tags: "String, Sliding Window", submissions: "7.4K", status: "Draft" },
  { id: 6, title: "Trapping Rain Water", difficulty: "Hard", tags: "Arrays, Two Pointers", submissions: "4.1K", status: "Published" },
];
export const COMPETITIONS = [
  { id: 1, title: "Weekly Contest #142", date: "Oct 11, 2026", participants: "1.8K", prize: "₹10,000", status: "Pending" },
  { id: 2, title: "Devsphere Hackathon 2026", date: "Oct 18, 2026", participants: "940", prize: "₹50,000", status: "Active" },
  { id: 3, title: "Algorithm Sprint", date: "Sep 27, 2026", participants: "2.1K", prize: "₹5,000", status: "Archived" },
];
export const TRACKS = [
  { id: 1, title: "Arrays & Hashing", problems: 42, learners: "6.2K", status: "Published" },
  { id: 2, title: "Dynamic Programming", problems: 58, learners: "3.9K", status: "Published" },
  { id: 3, title: "Graphs", problems: 36, learners: "2.4K", status: "Draft" },
];

export const RESOURCES = [
  { id: 1, title: "React Official Documentation", type: "Website", category: "Web Dev", views: "12.4K", status: "Published" },
  { id: 2, title: "Spring Boot Tutorial", type: "Video", category: "Backend", views: "8.7K", status: "Published" },
  { id: 3, title: "VS Code Extensions", type: "Article", category: "Tools", views: "6.2K", status: "Published" },
  { id: 4, title: "MongoDB Crash Course", type: "Video", category: "Database", views: "5.1K", status: "Draft" },
  { id: 5, title: "System Design Notes", type: "PDF", category: "System Design", views: "4.8K", status: "Published" },
  { id: 6, title: "Tailwind CSS Guide", type: "Article", category: "Web Dev", views: "7.3K", status: "Published" },
];

export const QUESTIONS = [
  { id: 1, title: "How to fix npm not recognized?", askedBy: "Alex Chen", category: "Web Dev", votes: 12, answers: 4, status: "Published" },
  { id: 2, title: "Difference between useEffect and useLayoutEffect", askedBy: "Priya Sharma", category: "React", votes: 8, answers: 3, status: "Published" },
  { id: 3, title: "MongoDB connection error", askedBy: "Rahul Verma", category: "Database", votes: 15, answers: 6, status: "Published" },
  { id: 4, title: "Best Java DSA resources?", askedBy: "Sneha Patil", category: "DSA", votes: 10, answers: 5, status: "Pending" },
  { id: 5, title: "Tailwind responsive design issues", askedBy: "Aditya Kumar", category: "CSS", votes: 6, answers: 2, status: "Published" },
  { id: 6, title: "How to deploy React app?", askedBy: "Neha Singh", category: "Deployment", votes: 9, answers: 4, status: "Reported" },
];

export const MENTORS = [
  { id: 1, name: "Alex Chen", specialization: "Full Stack Development", sessions: 56, rating: 4.8, status: "Active" },
  { id: 2, name: "Priya Sharma", specialization: "AI/ML, Python", sessions: 48, rating: 4.7, status: "Active" },
  { id: 3, name: "Rahul Verma", specialization: "DevOps, Cloud", sessions: 32, rating: 4.6, status: "Active" },
  { id: 4, name: "Sneha Patil", specialization: "Data Structures, DSA", sessions: 41, rating: 4.8, status: "Inactive" },
  { id: 5, name: "Aditya Kumar", specialization: "System Design", sessions: 28, rating: 4.5, status: "Active" },
];
export const SESSION_REQUESTS = [
  { id: 1, student: "Neha Singh", mentor: "Alex Chen", topic: "React career guidance", date: "Oct 8, 2026", status: "Pending" },
  { id: 2, student: "Karan Mehta", mentor: "Priya Sharma", topic: "ML project review", date: "Oct 9, 2026", status: "Pending" },
  { id: 3, student: "Isha Rao", mentor: "Rahul Verma", topic: "Docker basics", date: "Oct 7, 2026", status: "Approved" },
];
export const ACTIVE_SESSIONS = [
  { id: 1, student: "Dev Joshi", mentor: "Alex Chen", topic: "System design mock", started: "Today, 4:00 PM", status: "Active" },
  { id: 2, student: "Riya Kulkarni", mentor: "Aditya Kumar", topic: "DSA doubt solving", started: "Today, 5:30 PM", status: "Active" },
];

export const NEWS = [
  { id: 1, title: "React 19 Released – New Features", category: "Web Dev", type: "Announcement", date: "Oct 5, 2026", views: "12.4K", status: "Published" },
  { id: 2, title: "Google I/O 2026 Highlights", category: "Industry", type: "Industry", date: "Oct 4, 2026", views: "8.7K", status: "Published" },
  { id: 3, title: "Microsoft Azure Updates", category: "Cloud", type: "Industry", date: "Oct 4, 2026", views: "6.2K", status: "Published" },
  { id: 4, title: "Node.js 22 LTS Announced", category: "Backend", type: "Announcement", date: "Oct 3, 2026", views: "5.1K", status: "Draft" },
  { id: 5, title: "Top 10 Developer Tools 2026", category: "Tools", type: "News", date: "Oct 3, 2026", views: "7.3K", status: "Published" },
];

export const PROJECTS = [
  { id: 1, title: "DevHub – GitHub Clone", author: "Alex Chen", tech: "React, Spring Boot", views: "12.4K", status: "Published" },
  { id: 2, title: "AI Excel Analytics", author: "Priya Sharma", tech: "React, Node.js", views: "8.7K", status: "Published" },
  { id: 3, title: "CivicOne – Society Management", author: "Sneha Patil", tech: "MERN Stack", views: "6.2K", status: "Pending" },
  { id: 4, title: "Maharashtra Nexus", author: "Rahul Verma", tech: "Next.js, MongoDB", views: "5.1K", status: "Published" },
  { id: 5, title: "DevSphere – Community", author: "Aditya Kumar", tech: "React, Tailwind", views: "7.3K", status: "Published" },
];

export const USERS = [
  { id: 1, name: "Alex Chen", role: "Student", joined: "Oct 5, 2026", status: "Active" },
  { id: 2, name: "Priya Sharma", role: "Mentor", joined: "Oct 5, 2026", status: "Active" },
  { id: 3, name: "Rahul Verma", role: "Student", joined: "Oct 4, 2026", status: "Active" },
  { id: 4, name: "Sneha Patil", role: "Mentor", joined: "Oct 4, 2026", status: "Active" },
  { id: 5, name: "Aditya Kumar", role: "Student", joined: "Oct 3, 2026", status: "Inactive" },
  { id: 6, name: "Neha Singh", role: "Student", joined: "Oct 3, 2026", status: "Active" },
];

export const SETTINGS_SECTIONS = [
  "General", "Appearance", "Notifications", "User Management",
  "Content Moderation", "Security", "Integrations", "Backup & Data", "Logs",
];

export const DEFAULT_PLATFORM = {
  name: "Devsphere",
  url: "https://devsphere.com",
  email: "support@devsphere.com",
  timezone: "(GMT+5:30) Asia/Kolkata",
};
export const TIMEZONES = ["(GMT+5:30) Asia/Kolkata", "(GMT+0:00) UTC", "(GMT-5:00) America/New_York", "(GMT+1:00) Europe/London"];

// On/off switches for the settings sections that are just toggles
export const TOGGLE_SECTIONS = {
  Notifications: [
    { id: "n1", label: "New user sign-ups", hint: "Email me when a new user registers", on: true },
    { id: "n2", label: "Reported content", hint: "Alert me when something is reported", on: true },
    { id: "n3", label: "Weekly platform digest", hint: "Summary of growth and activity", on: false },
  ],
  "User Management": [
    { id: "u1", label: "Open registration", hint: "Allow anyone to create an account", on: true },
    { id: "u2", label: "Require email verification", hint: "Users must verify email before posting", on: true },
    { id: "u3", label: "Mentor applications", hint: "Let students apply to become mentors", on: true },
  ],
  "Content Moderation": [
    { id: "c1", label: "Auto-flag spam", hint: "Hold suspicious posts for review", on: true },
    { id: "c2", label: "Review new projects", hint: "Projects need approval before publishing", on: true },
    { id: "c3", label: "Profanity filter", hint: "Mask offensive words in questions and answers", on: false },
  ],
  Security: [
    { id: "s1", label: "Two-factor for admins", hint: "Require 2FA on every admin account", on: true },
    { id: "s2", label: "Session timeout", hint: "Sign admins out after 30 minutes of inactivity", on: false },
    { id: "s3", label: "Login alerts", hint: "Email on sign-in from a new device", on: true },
  ],
};

export const INTEGRATIONS = [
  { id: "gh", name: "GitHub", hint: "Repo previews and OAuth sign-in", connected: true },
  { id: "sl", name: "Slack", hint: "Post moderation alerts to a channel", connected: false },
  { id: "sg", name: "SendGrid", hint: "Transactional email delivery", connected: true },
];

export const LOGS = [
  { id: 1, text: "Admin published roadmap “Python for AI/ML”", time: "2 min ago" },
  { id: 2, text: "Question #4821 reported by 2 users", time: "18 min ago" },
  { id: 3, text: "User Neha Singh role changed to Student", time: "1 hr ago" },
  { id: 4, text: "Backup completed (1.2 GB)", time: "Today, 02:00" },
];
