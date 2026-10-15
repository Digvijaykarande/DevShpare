import {
  LayoutGrid, Users, FolderKanban, Route, Terminal, Library, HelpCircle,
  Code2, GraduationCap, Newspaper, UserCircle, Settings,
} from "lucide-react";

// Sidebar for the admin panel. `end: true` makes the link active only on an exact match.
export const ADMIN_NAV = [
  { label: "Dashboard", to: "/admin", icon: LayoutGrid, end: true },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Content", to: "/admin/content", icon: FolderKanban },
  { label: "Roadmaps", to: "/admin/roadmaps", icon: Route },
  { label: "Coding", to: "/admin/coding", icon: Terminal },
  { label: "Resources", to: "/admin/resources", icon: Library },
  { label: "Questions", to: "/admin/questions", icon: HelpCircle },
  { label: "Projects", to: "/admin/projects", icon: Code2 },
  { label: "Mentorship", to: "/admin/mentorship", icon: GraduationCap },
  { label: "News", to: "/admin/news", icon: Newspaper },
];

export const ADMIN_ACCOUNT_NAV = [
  { label: "Profile", to: "/profile", icon: UserCircle },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];
