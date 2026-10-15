import { Clock, GraduationCap, UserCheck, CalendarDays, Star } from "lucide-react";
import ManagerPage, { cell } from "../../components/admin/ManagerPage";
import { MENTORS, SESSION_REQUESTS, ACTIVE_SESSIONS } from "./data/adminData";

const rating = { key: "rating", label: "Rating", render: (r) => <span className="inline-flex items-center gap-1 tabular-nums"><Star className="w-3.5 h-3.5 fill-warning text-warning" />{r.rating}</span> };

const views = [
  {
    id: "mentors", label: "All Mentors", rows: MENTORS, addLabel: "Add Mentor", addNoun: "Mentor",
    searchPlaceholder: "Search mentors...", searchKeys: ["name", "specialization"],
    columns: [cell.index, cell.person("name", "Mentor"), cell.muted("specialization", "Specialization"), cell.muted("sessions", "Sessions"), rating, cell.status],
    fields: [
      { name: "name", label: "Mentor name" },
      { name: "title", label: "Professional title", placeholder: "Senior Frontend Engineer" },
      { name: "company", label: "Company" },
      { name: "specialization", label: "Specialization", type: "select", options: ["Frontend Engineering", "Backend & Systems", "DevOps & Cloud", "Data & ML", "Career Coaching", "Interview Prep"] },
      { name: "tags", label: "Skills / tags", placeholder: "React, TypeScript, testing", required: false },
      { name: "price", label: "Session price", placeholder: "Free or ₹800/session", required: false },
      { name: "availability", label: "Availability", type: "select", options: ["Available now", "Opens this week", "Currently away"] },
      { name: "bio", label: "Bio", type: "textarea", rows: 5, full: true },
      { name: "responseTimeHours", label: "Response time (hours)", type: "number", required: false },
      { name: "status", label: "Admin status", type: "select", options: ["Active", "Inactive"] },
    ],
  },
  {
    id: "requests", label: "Session Requests", rows: SESSION_REQUESTS, addNoun: "Request",
    searchPlaceholder: "Search requests...", searchKeys: ["student", "mentor", "topic"],
    columns: [cell.index, cell.person("student", "Student"), cell.muted("mentor", "Mentor"), cell.title("topic", "Topic"), cell.muted("date", "Date"), cell.status],
    fields: [
      { name: "topic", label: "Topic" },
      { name: "status", label: "Status", type: "select", options: ["Pending", "Approved", "Rejected"] },
    ],
  },
  {
    id: "sessions", label: "Active Sessions", rows: ACTIVE_SESSIONS, addNoun: "Session",
    searchPlaceholder: "Search sessions...", searchKeys: ["student", "mentor", "topic"],
    columns: [cell.index, cell.person("student", "Student"), cell.muted("mentor", "Mentor"), cell.title("topic", "Topic"), cell.muted("started", "Started"), cell.status],
  },
];

export default function MentorshipPage() {
  return (
    <ManagerPage
      title="Mentorship" subtitle="Manage mentors, sessions and mentorship requests."
      noun="entry" viewTabs views={views}
      stats={[
        { icon: GraduationCap, label: "Total Mentors", value: "42" },
        { icon: UserCheck, label: "Active Mentors", value: "36", tone: "success" },
        { icon: CalendarDays, label: "Total Sessions", value: "284", tone: "info" },
        { icon: Clock, label: "Pending Requests", value: "18", tone: "warning" },
      ]}
    />
  );
}
