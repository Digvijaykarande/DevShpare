import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "../../ui/badge";
import { api } from "../../../lib/api";
import { resolveIcon } from "../../../pages/roadmap/icons";

const ACCENTS = {
  primary: "bg-primary text-on-primary",
  secondary: "bg-secondary text-on-secondary",
  tertiary: "bg-tertiary text-on-tertiary",
};

export default function RelatedRoadmaps({ currentSlug }) {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    let mounted = true;
    api.get("/roadmaps")
      .then((data) => mounted && setRoadmaps(data?.roadmaps || []))
      .catch(() => {}); // optional section: just stay hidden if it fails
    return () => { mounted = false; };
  }, []);

  const others = roadmaps.filter((r) => r.slug !== currentSlug).slice(0, 3);
  if (!others.length) return null;

  return (
    <div className="mt-2xl">
      <div className="flex items-center justify-between mb-md">
        <h2 className="font-display text-lg font-semibold text-on-surface">Keep going with another path</h2>
        <Link to="/roadmaps" className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
          View all roadmaps
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
        {others.map((roadmap, i) => {
          const Icon = resolveIcon(roadmap.iconName);
          return (
            <motion.div
              key={roadmap.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.06 }}
            >
              <Link to={`/roadmaps/${roadmap.slug}`} className="block group h-full">
                <div className="p-md h-full flex flex-col gap-sm rounded-2xl border border-outline-variant/50 bg-surface-container-lowest transition-all hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5">
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${ACCENTS[roadmap.accent] ?? ACCENTS.primary}`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <Badge variant="neutral" className="rounded-full">{roadmap.level}</Badge>
                  </div>
                  <h3 className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                    {roadmap.title}
                  </h3>
                  <span className="text-xs text-on-surface-variant mt-auto">{roadmap.topicsTotal} topics &middot; {roadmap.estimate}</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}