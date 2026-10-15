import { CheckCircle2, FileEdit, FileCode2, Send } from "lucide-react";
import ManagerPage, { cell } from "../../components/admin/ManagerPage";
import { PROBLEMS, COMPETITIONS, TRACKS } from "./data/adminData";

const views = [
  {
    id: "problems", label: "Problems", rows: PROBLEMS, addLabel: "Add Problem", addNoun: "Problem",
    searchPlaceholder: "Search problems...", searchKeys: ["title", "tags"],
    selects: [{ key: "difficulty", label: "Difficulty", options: ["All Difficulties", "Easy", "Medium", "Hard"] }],
    columns: [cell.index, cell.title(), cell.status_badge("difficulty", "Difficulty"), cell.muted("tags", "Tags"), cell.muted("submissions", "Submissions"), cell.status],
    fields: [
      { name: "title", label: "Problem title", placeholder: "e.g. Climbing Stairs" },
      { name: "slug", label: "URL slug", placeholder: "climbing-stairs", required: false },
      { name: "number", label: "Problem number", type: "number", placeholder: "101", required: false },
      { name: "difficulty", label: "Difficulty", type: "select", options: ["Easy", "Medium", "Hard"] },
      { name: "tags", label: "Tags", placeholder: "Arrays, DP" },
      { name: "points", label: "Leaderboard points", type: "number", placeholder: "100", required: false },
      { name: "challengeDate", label: "Daily challenge date", type: "date", required: false },
      { name: "statement", label: "Problem statement", type: "textarea", rows: 6, full: true, placeholder: "Describe the task and expected output..." },
      { name: "examples", label: "Examples (JSON or text)", type: "textarea", rows: 4, full: true, required: false, placeholder: "[{\"input\":\"...\",\"output\":\"...\"}]" },
      { name: "constraints", label: "Constraints", type: "textarea", rows: 4, full: true, required: false },
      { name: "starterCode", label: "Starter code", type: "textarea", rows: 8, full: true, placeholder: "function solve(input) {\n  // your code\n}" },
      { name: "testCases", label: "Test cases (JSON)", type: "textarea", rows: 6, full: true, placeholder: "[{\"input\":\"...\",\"expected\":\"...\"}]" },
      { name: "hints", label: "Hints", type: "textarea", rows: 4, full: true, required: false },
      { name: "editorial", label: "Editorial / solution notes", type: "textarea", rows: 6, full: true, required: false },
    ],
  },
  {
    id: "competitions", label: "Competitions", rows: COMPETITIONS, addLabel: "Add Competition", addNoun: "Competition",
    searchPlaceholder: "Search competitions...",
    columns: [cell.index, cell.title(), cell.muted("date", "Date"), cell.muted("participants", "Participants"), cell.muted("prize", "Prize"), cell.status],
    fields: [
      { name: "title", label: "Competition name" },
      { name: "date", label: "Date", placeholder: "Oct 25, 2026" },
      { name: "prize", label: "Prize", placeholder: "₹10,000" },
      { name: "status", label: "Status", type: "select", options: ["Pending", "Active", "Archived"] },
    ],
  },
  {
    id: "tracks", label: "Tracks", rows: TRACKS, addLabel: "Add Track", addNoun: "Track",
    searchPlaceholder: "Search tracks...",
    columns: [cell.index, cell.title(), cell.muted("problems", "Problems"), cell.muted("learners", "Learners"), cell.status],
    fields: [
      { name: "title", label: "Track name" },
      { name: "problems", label: "Number of problems", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["Draft", "Published"] },
    ],
  },
];

export default function CodingPage() {
  return (
    <ManagerPage
      title="Coding Section" subtitle="Manage practice problems, coding competitions and tracks."
      noun="entry" viewTabs views={views}
      stats={[
        { icon: FileCode2, label: "Total Problems", value: "532" },
        { icon: CheckCircle2, label: "Published", value: "498", tone: "success" },
        { icon: FileEdit, label: "Drafts", value: "21", tone: "warning" },
        { icon: Send, label: "Total Submissions", value: "18.2K", tone: "info" },
      ]}
    />
  );
}
