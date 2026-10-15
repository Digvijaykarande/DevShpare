import { useState } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import Avatar from "../../../ui/Avatar";
import { cn } from "../../../../utils/cn";

const RANK_STYLES = {
  1: "bg-primary text-on-primary",
  2: "bg-surface-container-highest text-on-surface",
  3: "bg-surface-container-highest text-on-surface",
};

export default function TopContributorsWidget({ contributors }) {
  const [following, setFollowing] = useState(() => new Set());

  const toggleFollow = (id) => {
    setFollowing((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section className="p-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-xs">
          <Award className="w-5 h-5 text-primary" />
          <h3 className="font-display text-base font-semibold text-on-surface">Top Contributors</h3>
        </div>
        <span className="text-xs text-on-surface-variant">This Week</span>
      </div>

      <div className="flex flex-col gap-md">
        {contributors.map((c, i) => {
          const isFollowing = following.has(c.id);
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="flex items-center justify-between gap-sm"
            >
              <div className="flex items-center gap-sm min-w-0">
                <div className="relative shrink-0">
                  <Avatar name={c.name} size="md" />
                  <span
                    className={cn(
                      "absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold",
                      RANK_STYLES[c.rank]
                    )}
                  >
                    {c.rank}
                  </span>
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className="text-sm text-on-surface font-semibold truncate">{c.name}</span>
                  <span className="text-xs text-secondary font-medium">+{c.reputation} rep</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleFollow(c.id)}
                className={cn(
                  "px-md py-1 rounded-lg text-xs font-semibold transition-colors shrink-0",
                  isFollowing
                    ? "bg-primary/10 text-primary"
                    : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                )}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
