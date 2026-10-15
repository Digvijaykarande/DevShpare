import { useEffect, useRef, useState } from "react";
import {
  List,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  Timer,
  Pause,
  Play,
  Star,
  Share2,
  Keyboard,
  Shuffle,
  SkipForward,
} from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { getDifficultyStyle } from "../../../utils/constants";

function formatClock(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function IconAction({ icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-md hover:bg-surface-container-high border border-outline-variant/60 bg-surface-container-lowest transition-colors"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

export default function ProblemMeta({ problem, onNotify, onOpenList, onShuffle }) {
  const [seconds, setSeconds] = useState(18 * 60 + 42);
  const [running, setRunning] = useState(true);
  const [starred, setStarred] = useState(false);
  const tick = useRef(null);
  const difficultyStyle = getDifficultyStyle(problem.difficulty);

  useEffect(() => {
    tick.current = setInterval(() => {
      setSeconds((s) => (running ? s + 1 : s));
    }, 1000);
    return () => clearInterval(tick.current);
  }, [running]);

  return (
    <Card className="p-md">
      <div className="flex flex-wrap items-center justify-between gap-md">
        <div className="flex items-center gap-md min-w-0">
          <button
            type="button"
            onClick={onOpenList}
            title="Problem list"
            className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-md hover:bg-surface-container-high border border-outline-variant/60 bg-surface-container-lowest transition-colors shrink-0"
          >
            <List className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 text-on-surface-variant font-medium text-xs min-w-0">
            <button type="button" onClick={onOpenList} className="hover:text-on-surface transition-colors">
              Problems
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-outline shrink-0" />
            <span className="text-on-surface font-semibold truncate">
              #{problem.number}. {problem.title}
            </span>
          </div>

          <Badge variant={difficultyStyle.badge} className="rounded-full px-2 py-0.5">
            <span className={`w-1.5 h-1.5 rounded-full ${difficultyStyle.dot}`} />
            {problem.difficulty}
          </Badge>

          <div className="hidden xl:flex items-center gap-1.5">
            {problem.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-medium text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-md">
          <div className="hidden lg:flex items-center gap-3 bg-surface-container-low border border-outline-variant/60 px-3 py-1 rounded-lg text-on-surface-variant text-xs font-medium">
            <div className="flex items-center gap-1 hover:text-on-surface cursor-pointer">
              <ThumbsUp className="w-3.5 h-3.5 text-outline" />
              <span>{problem.stats.likes}</span>
            </div>
            <span className="text-outline-variant">•</span>
            <div className="flex items-center gap-1 hover:text-on-surface cursor-pointer">
              <ThumbsDown className="w-3.5 h-3.5 text-outline" />
              <span>{problem.stats.dislikes}</span>
            </div>
            <span className="text-outline-variant">•</span>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span className="text-success font-semibold">{problem.stats.acceptance}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-surface-container-low border border-outline-variant/60 px-3 py-1 rounded-lg text-on-surface">
            <Timer className="w-4 h-4 text-primary-container" />
            <span className="font-code text-xs font-semibold">{formatClock(seconds)}</span>
            <button
              type="button"
              onClick={() => setRunning((r) => !r)}
              className="text-outline hover:text-on-surface flex items-center ml-0.5"
              aria-label={running ? "Pause timer" : "Resume timer"}
            >
              {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-1">
            <IconAction
              icon={Star}
              label="Favorite problem"
              onClick={() => {
                setStarred((s) => !s);
                onNotify?.(starred ? "Removed from favorites" : "Saved to favorites");
              }}
            />
            <IconAction icon={Share2} label="Share problem" onClick={() => onNotify?.("Link copied to clipboard")} />
            <IconAction icon={Keyboard} label="Vim & keybindings" onClick={() => onNotify?.("Keybindings panel")} />
            <IconAction icon={Shuffle} label="Pick a random problem" onClick={() => onShuffle?.("random")} />
            <button
              type="button"
              onClick={() => onShuffle?.("next")}
              className="flex items-center gap-1 px-2.5 py-1 text-on-surface rounded-lg bg-surface-container-lowest border border-outline-variant/60 hover:bg-surface-container-low transition-colors text-xs font-medium"
            >
              <span>Next</span>
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
