import { Link } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";
import { buttonVariants } from "../../ui/button";

const LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Roadmaps", href: "roadmaps" },
  { label: "Community", href: "community" },
  { label: "Projects", href: "projects" },
  { label: "Mentorship", href: "mentorship" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 bg-surface/95 backdrop-blur-md border-b border-outline-variant">
      <div className="h-full max-w-[80rem] mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-md bg-primary text-on-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-on-surface group-hover:text-primary transition-colors">
              Devsphere
            </span>
          </Link>
          <nav className="hidden xl:flex items-center gap-7">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-2 bg-surface-container-low hover:bg-surface-container border border-outline-variant px-3 py-1.5 rounded-lg text-on-surface-variant transition-colors">
            <Search className="w-4 h-4 text-outline" />
            <span className="text-xs font-medium">Search ecosystem...</span>
            <kbd className="font-code text-[11px] bg-surface border border-outline-variant px-1.5 py-0.5 rounded text-on-surface-variant">
              ⌘K
            </kbd>
          </button>
          <Link
            to="/login"
            className="text-sm font-medium text-on-surface-variant hover:text-on-surface px-3.5 py-2 rounded-lg hover:bg-surface-container-low transition-colors"
          >
            Log in
          </Link>
          <Link to="/register" className={buttonVariants({ variant: "default", size: "default" })}>
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
