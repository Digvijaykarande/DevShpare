import { BookOpen, FileText, Layers, PlayCircle, Wrench } from "lucide-react";
import ManagerPage, { cell } from "../../components/admin/ManagerPage";
import { RESOURCES } from "./data/adminData";

const TAB_TYPE = { Articles: ["Article"], Videos: ["Video"], Tools: ["Tool"], Collections: ["Collection", "PDF"] };
const view = {
  id: "resources", label: "Resources", rows: RESOURCES, addLabel: "Add Resource", addNoun: "Resource",
  searchPlaceholder: "Search resources...", searchKeys: ["title", "category"],
  statusTabs: ["All", "Articles", "Videos", "Tools", "Collections"],
  tabMatch: (r, tab) => TAB_TYPE[tab]?.includes(r.type),
  columns: [cell.index, cell.title(), cell.pill("type", "Type"), cell.muted("category", "Category"), cell.muted("views", "Views"), cell.status],
  fields: [
    { name: "title", label: "Title", placeholder: "e.g. Docker Handbook" },
    { name: "type", label: "Type", type: "select", options: ["Article", "Video", "Website", "PDF", "Tool", "Collection"] },
    { name: "category", label: "Category", type: "select", options: ["guides", "courses", "practice", "community", "reading"] },
    { name: "provider", label: "Provider / author", placeholder: "e.g. MongoDB University" },
    { name: "summary", label: "Short summary", type: "textarea", rows: 3, full: true, placeholder: "What will the learner find here?" },
    { name: "details", label: "Full details", type: "textarea", rows: 5, full: true, required: false, placeholder: "Longer description, prerequisites, outcomes..." },
    { name: "url", label: "Resource URL", placeholder: "https://..." },
    { name: "tags", label: "Tags", placeholder: "react, frontend, hooks", required: false },
    { name: "iconName", label: "Lucide icon", placeholder: "BookOpen", required: false },
    { name: "accent", label: "Accent", type: "select", options: ["primary", "secondary", "tertiary"] },
    { name: "free", label: "Access", type: "select", options: ["true", "false"] },
  ],
};

export default function ResourcesPage() {
  return (
    <ManagerPage
      title="Resources" subtitle="Manage useful learning resources, tools and links." noun="resource"
      stats={[
        { icon: Layers, label: "Total Resources", value: "186" },
        { icon: FileText, label: "Articles", value: "72", tone: "success" },
        { icon: PlayCircle, label: "Videos", value: "54", tone: "info" },
        { icon: Wrench, label: "Tools", value: "38", tone: "primary" },
        { icon: BookOpen, label: "Collections", value: "22", tone: "warning" },
      ] }
      views={[view]}
    />
  );
}
