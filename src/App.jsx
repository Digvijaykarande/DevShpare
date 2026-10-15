import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/register";
import RoadmapsList from "./pages/roadmap";
import RoadmapDetail from "./pages/roadmap/detail";
import CodingDetail from "./pages/coding/detail";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ProjectsPage from "./pages/projects";
import MentorshipPage from "./pages/mentorship";
import QuestionsPage from "./pages/questions";
import DiscussionsPage from "./pages/discussions";
import ResourcesPage from "./pages/resources";
import NewsPage from "./pages/news";
import ProfilePage from "./pages/profile";
import SettingsPage from "./pages/settings";
import AdminDashboardPage from "./pages/admin/DashboardPage";
import AdminUsersPage from "./pages/admin/UsersPage";
import AdminContentPage from "./pages/admin/ContentPage";
import AdminRoadmapsPage from "./pages/admin/RoadmapsPage";
import AdminCodingPage from "./pages/admin/CodingPage";
import AdminResourcesPage from "./pages/admin/ResourcesPage";
import AdminQuestionsPage from "./pages/admin/QuestionsPage";
import AdminProjectsPage from "./pages/admin/ProjectsPage";
import AdminMentorshipPage from "./pages/admin/MentorshipPage";
import AdminNewsPage from "./pages/admin/NewsPage";
import AdminSettingsPage from "./pages/admin/SettingsPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Signed-in shell: header + sidebar wrap every child route */}
        <Route element={<AppLayout />}>
          <Route path="/roadmaps" element={<RoadmapsList />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/roadmaps/:slug" element={<RoadmapDetail />} />
          <Route path="/coding" element={<Navigate to="/coding/two-sum" replace />} />
          <Route path="/coding/:slug" element={<CodingDetail />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/mentorship" element={<MentorshipPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/discussions" element={<DiscussionsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Admin panel: own shell (admin header + sidebar) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="content" element={<AdminContentPage />} />
          <Route path="roadmaps" element={<AdminRoadmapsPage />} />
          <Route path="coding" element={<AdminCodingPage />} />
          <Route path="resources" element={<AdminResourcesPage />} />
          <Route path="questions" element={<AdminQuestionsPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="mentorship" element={<AdminMentorshipPage />} />
          <Route path="news" element={<AdminNewsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
