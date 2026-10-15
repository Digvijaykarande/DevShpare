import {
  LayoutGrid, Compass, HelpCircle, Route, Users, Code2, Terminal, Trophy,
  Briefcase, Library, UserCircle, Settings, Newspaper, MessageCircle,
} from "lucide-react";

// `ready: false` marks pages that are not built yet. They render as disabled
// "Soon" items instead of silently bouncing the user to the home page.
// Flip to `true` (or delete the flag) when you build the page and add its route in App.jsx.
export const NAV_GROUPS = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", to: "/dashboard", icon: LayoutGrid, ready: true },
      { label: "Explore", to: "/explore", icon: Compass, ready: false },
    ],
  },
  {
    title: "Learn",
    items: [
      { label: "Roadmaps", to: "/roadmaps", icon: Route, ready: true },
      { label: "Coding", to: "/coding", icon: Terminal, ready: true },
      { label: "Resources", to: "/resources", icon: Library, ready: false },
    ],
  },
  {
    title: "Community",
    items: [
      { label: "Questions", to: "/questions", icon: HelpCircle, ready: false },
      { label: "Discussions", to: "/discussions", icon: MessageCircle, ready: true },
      { label: "Mentorship", to: "/mentorship", icon: Users, ready: true },
      { label: "News", to: "/news", icon: Newspaper, ready: true },
    ],
  },
  {
    title: "Build & grow",
    items: [
      { label: "Projects", to: "/projects", icon: Code2, ready: true },
      { label: "Competitions", to: "/competitions", icon: Trophy, ready: false },
      { label: "Opportunities", to: "/opportunities", icon: Briefcase, ready: false },
    ],
  },
];

export const ACCOUNT_NAV = [
  { label: "Profile", to: "/profile", icon: UserCircle, ready: true },
  { label: "Settings", to: "/settings", icon: Settings, ready: true },
];
