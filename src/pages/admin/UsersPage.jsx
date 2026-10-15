import { Download } from "lucide-react";
import ManagerPage, { cell } from "../../components/admin/ManagerPage";
import { AddButton } from "../../components/admin/AdminUI";
import { USERS } from "./data/adminData";

// Roles get their own tint instead of a status colour.
const roleColumn = { key: "role", label: "Role", render: (r) => (
  <span className={`inline-flex px-2 py-0.5 rounded-md text-[11px] font-medium ${r.role === "Mentor" ? "bg-primary-container/10 text-primary" : r.role === "Admin" ? "bg-critical-container text-critical" : "bg-secondary-fixed text-secondary"}`}>{r.role}</span>
) };

const view = {
  id: "users", label: "Users", rows: USERS, addNoun: "User",
  searchPlaceholder: "Search users...", searchKeys: ["name", "role"],
  selects: [{ key: "role", label: "Role", options: ["All Roles", "Student", "Mentor", "Admin"] }],
  columns: [cell.index, cell.person("name", "User"), roleColumn, cell.muted("joined", "Joined"), cell.status],
  fields: [
    { name: "name", label: "Full name" },
    { name: "role", label: "Role", type: "select", options: ["Student", "Mentor", "Admin"] },
    { name: "status", label: "Status", type: "select", options: ["Active", "Inactive", "Banned"] },
  ],
};


function exportCsv() {
  // TODO(backend): GET /admin/users/export
  const csv = ["Name,Role,Joined,Status", ...USERS.map((u) => [u.name, u.role, u.joined, u.status].join(","))].join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = "devsphere-users.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function UsersPage() {
  return (
    <ManagerPage
      title="User Profiles" subtitle="View and manage user profiles." noun="user" views={[view]}
      headerAction={<AddButton icon={Download} onClick={exportCsv}>Export Users</AddButton>}
    />
  );
}
