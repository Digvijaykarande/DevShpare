import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessagesSquare } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export default function QuestionsPage() {
  const [params] = useSearchParams();
  const topic = params.get("topic");

  return (
    <div className="max-w-[48rem] mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="p-xl text-center flex flex-col items-center gap-md">
          <div className="w-14 h-14 rounded-full bg-primary-container/15 text-primary flex items-center justify-center">
            <MessagesSquare className="w-7 h-7" />
          </div>

          <div>
            <h1 className="font-display text-xl font-semibold text-on-surface">Community discussions</h1>
            {topic ? (
              <p className="text-sm text-on-surface-variant mt-1.5">
                Showing threads tagged <Badge variant="code">{topic}</Badge> — the full discussion board is
                still being built.
              </p>
            ) : (
              <p className="text-sm text-on-surface-variant mt-1.5">
                The full discussion board is still being built — check back soon.
              </p>
            )}
          </div>

          <Link to="/roadmaps">
            <Button variant="primary" size="sm" type="button">
              <ArrowLeft className="w-4 h-4" />
              Back to roadmaps
            </Button>
          </Link>
        </Card>
      </motion.div>
    </div>
  );
}
