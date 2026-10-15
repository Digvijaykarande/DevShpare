import { CheckCircle2, Eye, FileEdit, Newspaper } from "lucide-react";
import ManagerPage, { cell } from "../../components/admin/ManagerPage";
import { NEWS } from "./data/adminData";

const TAB_TYPE = { Announcements: "Announcement", "Industry Updates": "Industry" };
const view = {
  id: "news", label: "News", rows: NEWS, addNoun: "Article",
  searchPlaceholder: "Search news...", searchKeys: ["title", "category"],
  statusTabs: ["All News", "Announcements", "Industry Updates"],
  tabMatch: (r, tab) => r.type === TAB_TYPE[tab],
  columns: [cell.index, cell.title(), cell.pill("category", "Category"), cell.muted("date", "Date"), cell.muted("views", "Views"), cell.status],
};

export default function NewsPage() {
  return (
    <ManagerPage
      title="Tech News" subtitle="Manage latest tech news and announcements." noun="article"
      stats={[
        { icon: Newspaper, label: "Total News", value: "128" },
        { icon: CheckCircle2, label: "Published", value: "116", tone: "success" },
        { icon: FileEdit, label: "Drafts", value: "8", tone: "warning" },
        { icon: Eye, label: "Total Views", value: "24.6K", tone: "info" },
      ]}
      views={[view]}
    />
  );
}
