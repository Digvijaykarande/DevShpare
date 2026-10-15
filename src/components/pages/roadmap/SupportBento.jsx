import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Headset, MessagesSquare } from "lucide-react";

function Tile({ icon: Icon, label, children, linkLabel, linkIcon: LinkIcon = ArrowRight, href }) {
  return (
    <div className="p-sm rounded-lg bg-surface-container-low flex flex-col justify-between gap-sm">
      <div className="flex items-center gap-xs text-on-surface-variant">
        <Icon className="w-4 h-4" />
        <span className="text-xs font-semibold">{label}</span>
      </div>
      <div className="flex flex-col">{children}</div>
      <Link
        to={href}
        className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
      >
        {linkLabel}
        <LinkIcon className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

export default function SupportBento({ discussion, mentorship }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm mt-lg">
      <Tile
        icon={MessagesSquare}
        label="Discussions"
        href={discussion.href}
        linkLabel="Join the thread"
      >
        <span className="font-display text-base font-bold text-on-surface">
          {discussion.activeCount} active
        </span>
        <span className="text-xs text-on-surface-variant truncate">
          Hot: {discussion.hotThread}
        </span>
      </Tile>

      <Tile
        icon={Headset}
        label="1:1 mentors"
        href={mentorship.href}
        linkLabel="Book a review"
        linkIcon={CalendarDays}
      >
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-success" />
          <span className="font-display text-base font-bold text-on-surface">
            {mentorship.slots} slots open
          </span>
        </span>
        <span className="text-xs text-on-surface-variant">{mentorship.label}</span>
      </Tile>
    </div>
  );
}
