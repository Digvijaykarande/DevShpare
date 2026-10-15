import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import AppHeader from "../components/app/AppHeader";
import AppSidebar from "../components/app/AppSidebar";
import { hydrateFromServer, useSettings } from "../lib/userStore";
import { useResolvedTheme } from "../lib/useTheme";

/**
 * Shell for every signed-in page: fixed top bar, left nav (drawer on mobile), scrolling content.
 * Use it as a layout route so child pages only render their own content.
 * Also applies the theme + reduced-motion choices saved in Settings → Appearance.
 */
export default function AppLayout({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = useCallback(() => setNavOpen(false), []);
  const [{ appearance }] = useSettings();
  const theme = useResolvedTheme();

  // Pull the signed-in user's profile + settings from the backend (no-op when signed out).
  useEffect(() => { hydrateFromServer(); }, []);

  return (
    <MotionConfig reducedMotion={appearance.reduceMotion ? "always" : "user"}>
      <div
        data-theme={theme}
        data-reduce-motion={appearance.reduceMotion}
        className="min-h-screen bg-surface text-on-surface"
      >
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:px-3 focus:py-2 focus:rounded-lg focus:bg-primary-container focus:text-on-primary">
          Skip to content
        </a>
        <AppHeader onMenuClick={() => setNavOpen(true)} />
        <AppSidebar open={navOpen} onClose={closeNav} />
        <div className="lg:pl-60">
          <main id="main" className="min-h-[calc(100vh-4.25rem)] pt-[4.25rem]">
            <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-7 lg:py-9">{children ?? <Outlet />}</div>
          </main>
        </div>
      </div>
    </MotionConfig>
  );
}
