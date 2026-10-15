import { motion } from "framer-motion";
import { Star, BellRing, CalendarPlus } from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import Avatar from "../../ui/Avatar";
import { cn } from "../../../utils/cn";

const AVAILABILITY_DOT = {
  "Available now": "bg-success",
  "Opens this week": "bg-warning",
  "Currently away": "bg-outline",
};

export default function MentorCard({ mentor, index = 0, onBook, onNotify }) {
  const isAway = mentor.availability === "Currently away";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, ease: "easeOut", delay: (index % 6) * 0.05 }}
      className="h-full"
    >
      <Card className="p-lg h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col">
          <div className="flex items-start gap-md">
            <Avatar name={mentor.name} size="lg" ring />
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-base font-semibold text-on-surface truncate">
                {mentor.name}
              </h3>
              <p className="text-xs text-on-surface-variant truncate">
                {mentor.title} · {mentor.company}
              </p>
              <div className="flex items-center gap-xs mt-1">
                <span className="flex items-center gap-0.5 text-xs font-semibold text-on-surface">
                  <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                  {(mentor.rating ?? 0).toFixed(1)}
                </span>
                <span className="text-xs text-on-surface-variant">· {mentor.sessions} sessions</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-on-surface-variant mt-md line-clamp-2">{mentor.bio}</p>

          <div className="flex flex-wrap gap-1.5 mt-md">
            {(mentor.tags || []).map((tag) => (
              <Badge key={tag} variant="code">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-lg pt-md flex flex-col gap-sm">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-on-surface">{mentor.price}</span>
            <span className="flex items-center gap-1.5 text-on-surface-variant">
              <span className={cn("w-2 h-2 rounded-full", AVAILABILITY_DOT[mentor.availability])} />
              {mentor.availability}
            </span>
          </div>

          {isAway ? (
            <Button variant="surface" size="sm" type="button" className="w-full" onClick={() => onNotify(mentor)}>
              <BellRing className="w-4 h-4 text-on-surface-variant" />
              Notify when back
            </Button>
          ) : (
            <Button variant="primary" size="sm" type="button" className="w-full" onClick={() => onBook(mentor)}>
              <CalendarPlus className="w-4 h-4" />
              Book a session
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}