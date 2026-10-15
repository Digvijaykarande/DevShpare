import { motion } from "framer-motion";
import { CircleHelp, CheckCircle2, Users, Flame } from "lucide-react";
import { Card } from "../../ui/card";

const ICONS = { help: CircleHelp, check: CheckCircle2, users: Users, flame: Flame };
const ICON_TONES = ["text-primary", "text-secondary", "text-tertiary", "text-warning"];

export default function QuestionsStats({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
      {stats.map((stat, i) => {
        const Icon = ICONS[stat.icon] ?? CircleHelp;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06, ease: "easeOut" }}
          >
            <Card className="p-md flex items-center justify-between">
              <div>
                <div className="text-on-surface-variant text-xs">{stat.label}</div>
                <div className="text-on-surface font-display text-xl font-semibold mt-0.5">
                  {stat.value}
                </div>
              </div>
              <div
                className={`w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center ${ICON_TONES[i % ICON_TONES.length]}`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
