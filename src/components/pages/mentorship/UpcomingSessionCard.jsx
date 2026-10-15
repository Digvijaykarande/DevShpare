import { motion } from "framer-motion";
import { Video, Calendar, RotateCcw } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import Avatar from "../../ui/Avatar";

export default function UpcomingSessionCard({ session, onJoin, onReschedule }) {
  if (!session) {
    return (
      <Card className="p-lg border border-dashed border-outline-variant bg-surface-container-low/40 shadow-none">
        <p className="text-sm text-on-surface-variant text-center">
          No upcoming sessions booked yet — pick a mentor below to get started.
        </p>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card className="p-lg bg-gradient-to-br from-surface-container-lowest to-surface-container-low">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md">
          <div className="flex items-center gap-md min-w-0">
            <Avatar name={session.mentor} size="lg" ring />
            <div className="min-w-0">
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                Your next session
              </span>
              <h3 className="font-display text-lg font-semibold text-on-surface truncate">
                {session.mentor}
              </h3>
              <p className="text-sm text-on-surface-variant truncate">{session.topic}</p>
            </div>
          </div>

          <div className="flex items-center gap-sm shrink-0">
            <span className="flex items-center gap-1.5 text-sm text-on-surface-variant">
              <Calendar className="w-4 h-4 text-secondary" />
              {session.slot}
            </span>
            <Button variant="surface" size="sm" type="button" onClick={onReschedule}>
              <RotateCcw className="w-4 h-4 text-on-surface-variant" />
              Reschedule
            </Button>
            <Button variant="primary" size="sm" type="button" onClick={onJoin}>
              <Video className="w-4 h-4" />
              Join call
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
