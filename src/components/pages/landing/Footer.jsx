import { Sparkles } from "lucide-react";

const COLUMNS = [
  {
    title: "Product",
    links: ["Features", "Skill paths", "Code sandbox", "Enterprise", "Changelog"],
  },
  {
    title: "Community",
    links: ["Discussions", "Find mentors", "Leaderboards", "Events & hackathons", "Guilds"],
  },
  {
    title: "Resources",
    links: ["Documentation", "System architecture", "Tutorials", "Engineering blog", "Cheat sheets"],
  },
  {
    title: "Developers",
    links: ["Public API", "Devsphere CLI", "SDKs & kits", "Open source", "VS Code plugin"],
  },
  {
    title: "Company",
    links: ["About us", "Careers", "Brand kit", "Contact", "Partners"],
  },
  {
    title: "Legal",
    links: ["Privacy policy", "Terms of service", "Security & trust", "Compliance", "Cookie settings"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-lowest">
      <div className="max-w-[80rem] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mb-10">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-on-surface uppercase tracking-wide mb-3">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-xs text-on-surface-variant hover:text-on-surface transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-outline-variant">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary text-on-primary flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs text-on-surface-variant">
              © 2026 Devsphere Inc. Engineered for high-throughput developers.
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-on-surface-variant">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
