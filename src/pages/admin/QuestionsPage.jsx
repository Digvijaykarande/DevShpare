import { FileText } from "lucide-react";
import ManagerPage, { cell } from "../../components/admin/ManagerPage";
import { AddButton } from "../../components/admin/AdminUI";
import { QUESTIONS } from "./data/adminData";

const view = {
  id: "questions", label: "Questions", rows: QUESTIONS, addNoun: "Question",
  searchPlaceholder: "Search questions...", searchKeys: ["title", "askedBy", "category"],
  statusTabs: ["All Questions", "Pending", "Reported", "Resolved"],
  columns: [
    cell.index, cell.title(), cell.person("askedBy", "Asked By"), cell.pill("category", "Category"),
    cell.muted("votes", "Votes"), cell.muted("answers", "Answers"), cell.status,
  ],
  // Moderation page: admins edit status only, they don't write questions for users.
  fields: [
    { name: "title", label: "Title" },
    { name: "category", label: "Category" },
    { name: "status", label: "Status", type: "select", options: ["Published", "Pending", "Reported", "Resolved"] },
  ],
};

export default function QuestionsPage() {
  return (
    <ManagerPage
      title="Questions" subtitle="Moderate and manage community questions." noun="question" views={[view]}
      headerAction={<AddButton icon={FileText} onClick={() => window.alert("TODO(backend): GET /admin/reports")}>View Report</AddButton>}
    />
  );
}
