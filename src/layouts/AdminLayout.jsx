import { useCallback, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import { useSettings } from "../lib/userStore";
import { useResolvedTheme } from "../lib/useTheme";
import { api } from "../lib/api";

/**
 * Shell for every /admin/* page: fixed top bar, left nav (drawer on mobile), scrolling content.
 * TODO(backend): guard this route so only users with role "admin" can open it.
 */
export default function AdminLayout() {
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = useCallback(() => setNavOpen(false), []);
  const [{ appearance }] = useSettings();
  const theme = useResolvedTheme();
  const [access, setAccess] = useState("checking");
  useEffect(() => { api.get("/admin/me").then(() => setAccess("allowed")).catch(() => setAccess("denied")); }, []);
  if (access === "checking") return <div className="min-h-screen grid place-items-center text-sm text-on-surface-variant">Checking admin access…</div>;
  if (access === "denied") return <Navigate to="/dashboard" replace />;

  return (
    <MotionConfig reducedMotion={appearance.reduceMotion ? "always" : "user"}>
      <div data-theme={theme} data-reduce-motion={appearance.reduceMotion} className="min-h-screen bg-surface text-on-surface">
        <AdminHeader onMenuClick={() => setNavOpen(true)} />
        <AdminSidebar open={navOpen} onClose={closeNav} />
        <div className="lg:pl-60">
          <main id="main" className="min-h-[calc(100vh-4rem)] pt-16">
            <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </MotionConfig>
  );
}
