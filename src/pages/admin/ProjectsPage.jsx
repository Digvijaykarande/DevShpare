import { Clock, Eye, Rocket, Star } from "lucide-react";
import ManagerPage, { cell } from "../../components/admin/ManagerPage";
import { PROJECTS } from "./data/adminData";

const view = {
  id: "projects", label: "Projects", rows: PROJECTS, addNoun: "Project",
  searchPlaceholder: "Search projects...", searchKeys: ["title", "author", "tech"],
  statusTabs: ["All Projects", "Pending", "Reported"],
  columns: [cell.index, cell.title(), cell.person("author", "Author"), cell.muted("tech", "Tech Stack"), cell.muted("views", "Views"), cell.status],
  fields: [
    { name: "title", label: "Project title" },
    { name: "description", label: "Description", type: "textarea", rows: 5, full: true, placeholder: "What is this project building?" },
    { name: "tech", label: "Tech stack", placeholder: "React, Node.js" },
    { name: "difficulty", label: "Difficulty", type: "select", options: ["Beginner Friendly", "Intermediate", "Advanced"] },
    { name: "status", label: "Lifecycle stage", type: "select", options: ["Ideation", "MVP in Progress", "Alpha Testing", "Production"] },
    { name: "openPositions", label: "Open positions (JSON)", type: "textarea", rows: 4, full: true, required: false, placeholder: "[{\"role\":\"Frontend Developer\",\"slots\":\"2 slots\"}]" },
    { name: "progress", label: "Progress percent", type: "number", required: false },
    { name: "version", label: "Version", required: false, placeholder: "v1.0" },
  ],
};

export default function ProjectsPage() {
  return (
    <ManagerPage
      title="Projects" subtitle="Manage user projects and project ideas." noun="project" views={[view]}
      stats={[
        { icon: Rocket, label: "Total Projects", value: "623" },
        { icon: Star, label: "Featured", value: "42", tone: "success" },
        { icon: Clock, label: "Pending Review", value: "28", tone: "warning" },
        { icon: Eye, label: "Total Views", value: "18.4K", tone: "info" },
      ]}
    />
  );
}
