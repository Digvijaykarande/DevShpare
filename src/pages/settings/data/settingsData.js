import { User, ShieldCheck, Bell, Palette, Lock, Link2 } from "lucide-react";

export const SETTINGS_TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Account & Security", icon: ShieldCheck },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "privacy", label: "Privacy", icon: Lock },
  { id: "connections", label: "Connected Accounts", icon: Link2 },
];

export const BIO_MAX = 250;
export const PHOTO_MAX_BYTES = 5 * 1024 * 1024;

// Notification rows. Each one has an email switch and an in-app switch.
export const NOTIFICATION_GROUPS = [
  {
    title: "Community",
    items: [
      { id: "answers", label: "Answers to my questions", hint: "When someone answers or accepts an answer." },
      { id: "mentions", label: "Mentions and replies", hint: "When someone tags you or replies to your comment." },
      { id: "projectInvites", label: "Project invites", hint: "When a team invites you or accepts your request." },
    ],
  },
  {
    title: "Learning",
    items: [
      { id: "streak", label: "Streak reminders", hint: "A nudge before your daily streak runs out." },
      { id: "digest", label: "Weekly progress digest", hint: "Your roadmap and coding progress, once a week." },
    ],
  },
  {
    title: "Mentorship",
    items: [
      { id: "sessions", label: "Session reminders", hint: "Before a booked mentor session starts." },
      { id: "product", label: "Product updates", hint: "New Devsphere features and announcements." },
    ],
  },
];

export const VISIBILITY_OPTIONS = [
  { id: "public", label: "Public", hint: "Anyone can view your profile." },
  { id: "members", label: "Members only", hint: "Only signed-in Devsphere members." },
  { id: "private", label: "Private", hint: "Only you can view your profile." },
];

export const PRIVACY_TOGGLES = [
  { id: "showEmail", label: "Show email on profile", hint: "Your email is hidden from everyone by default." },
  { id: "showActivity", label: "Show recent activity", hint: "Lets people see your answers, questions and projects." },
  { id: "searchable", label: "Appear in search", hint: "Let members find you by name or username." },
  { id: "mentorRequests", label: "Accept mentor requests", hint: "Members can send you mentorship requests." },
];

export const THEME_OPTIONS = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
];

export const CONNECTIONS = [
  { id: "github", name: "GitHub", initial: "G", hint: "Import repositories and show contributions." },
  { id: "google", name: "Google", initial: "G", hint: "Sign in with your Google account." },
  { id: "linkedin", name: "LinkedIn", initial: "in", hint: "Show your work history on your profile." },
  { id: "x", name: "X (Twitter)", initial: "X", hint: "Share your progress with one click." },
];

export const INITIAL_SESSIONS = [
  { id: "s1", device: "Chrome on Windows", place: "Pune, India", when: "Active now", current: true },
  { id: "s2", device: "Safari on iPhone", place: "Pune, India", when: "2 days ago", current: false },
  { id: "s3", device: "Firefox on Ubuntu", place: "Mumbai, India", when: "9 days ago", current: false },
];

export const DEFAULT_SETTINGS = {
  notifications: {
    answers: { email: true, inApp: true },
    mentions: { email: true, inApp: true },
    projectInvites: { email: true, inApp: true },
    streak: { email: false, inApp: true },
    digest: { email: true, inApp: false },
    sessions: { email: true, inApp: true },
    product: { email: false, inApp: false },
  },
  appearance: { theme: "light", reduceMotion: false },
  privacy: {
    visibility: "public",
    showEmail: false,
    showActivity: true,
    searchable: true,
    mentorRequests: true,
  },
  security: { twoFactor: false },
  connections: { github: true, google: false, linkedin: false, x: false },
};
