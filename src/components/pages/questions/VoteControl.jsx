import { AnimatePresence, motion } from "framer-motion";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { cn } from "../../../utils/cn";

/**
 * Inline vote control. `userVote` is null | "up" | "down"; clicking the active
 * direction again clears the vote. The count passed in already reflects the vote.
 */
export default function VoteControl({ votes, userVote, onVote, className }) {
  const btn = "w-7 h-7 rounded-md flex items-center justify-center transition-colors";
  return (
    <div className={cn("flex items-center gap-1 text-xs", className)}>
      <button
        type="button"
        aria-label="Upvote"
        aria-pressed={userVote === "up"}
        onClick={() => onVote("up")}
        className={cn(btn, userVote === "up" ? "text-primary bg-primary/10" : "text-outline hover:text-on-surface hover:bg-surface-container")}
      >
        <ArrowBigUp className="w-[18px] h-[18px]" fill={userVote === "up" ? "currentColor" : "none"} />
      </button>

      <div className="relative h-5 min-w-[2ch] overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={votes}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="text-sm font-bold text-on-surface tabular-nums"
          >
            {votes}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-on-surface-variant mr-0.5">votes</span>

      <button
        type="button"
        aria-label="Downvote"
        aria-pressed={userVote === "down"}
        onClick={() => onVote("down")}
        className={cn(btn, userVote === "down" ? "text-critical bg-critical/10" : "text-outline hover:text-on-surface hover:bg-surface-container")}
      >
        <ArrowBigDown className="w-[18px] h-[18px]" fill={userVote === "down" ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
