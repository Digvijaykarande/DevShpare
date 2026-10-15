import { motion, useReducedMotion } from "framer-motion";
import { Flame, Timer } from "lucide-react";
import Avatar from "../../ui/Avatar";
import { cn } from "../../../utils/cn";

const RADIUS = 30;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ProgressRing({ percent }) {
  const reduceMotion = useReducedMotion();
  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  return (
    <div className="relative flex items-center justify-center shrink-0">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 72 72" aria-hidden="true">
        <circle
          cx="36"
          cy="36"
          r={RADIUS}
          fill="none"
          strokeWidth="6"
          className="text-surface-container-high"
          stroke="currentColor"
        />
        <motion.circle
          cx="36"
          cy="36"
          r={RADIUS}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          className="text-primary"
          stroke="currentColor"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={{ strokeDashoffset: offset }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.9, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-base font-bold leading-none text-on-surface">
          {percent}%
        </span>
        <span className="text-[10px] text-on-surface-variant">done</span>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, iconClass, label, value }) {
  return (
    <div className="flex items-center gap-md p-md rounded-xl bg-surface-container-low flex-1 min-w-0">
      <div className={cn("w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0", iconClass)}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs text-on-surface-variant">{label}</span>
        <span className="font-display text-base font-bold text-on-surface truncate">{value}</span>
      </div>
    </div>
  );
}

export default function ProgressOverview({ progress }) {
  return (
    <div className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-lg mb-xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-lg items-center">
        <div className="md:col-span-4 flex items-center gap-lg">
          <ProgressRing percent={progress.percent} />
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant">Milestone velocity</span>
            <div className="font-display text-base font-semibold text-on-surface">
              {progress.topicsDone} of {progress.topicsTotal} topics completed
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">{progress.nextMilestone}</p>
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col sm:flex-row gap-md">
          <Metric
            icon={Flame}
            iconClass="text-secondary"
            label="Learning streak"
            value={`${progress.streakDays} days active`}
          />
          <Metric
            icon={Timer}
            iconClass="text-primary"
            label="Est. completion"
            value={progress.estimatedCompletion}
          />
        </div>

        <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-sm md:pl-md md:border-l md:border-outline-variant/60">
          <span className="text-xs text-on-surface-variant md:hidden">Peers on this stage</span>
          <div className="flex flex-col items-end gap-1.5">
            <span className="hidden md:block text-xs text-on-surface-variant">Peers on this stage</span>
            <div className="flex items-center -space-x-2">
              {progress.peers.map((name) => (
                <Avatar key={name} name={name} size="sm" ring />
              ))}
              <div className="w-7 h-7 rounded-full bg-surface-container-high text-on-surface text-[10px] font-semibold flex items-center justify-center ring-2 ring-surface-container-lowest">
                +{progress.peerOverflow}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
