import { Plus, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../ui/button";

export default function QuestionsHero({ onAsk, onCustomFeed }) {
  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between gap-lg">
      <div className="max-w-2xl">
        <div className="flex items-center gap-sm mb-xs text-primary text-xs font-semibold uppercase tracking-wider">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-primary" />
          </span>
          Peer-Reviewed Engineering Index
        </div>
        <h1 className="font-display text-2xl sm:text-[2rem] sm:leading-10 font-semibold tracking-tight text-on-surface">
          Questions &amp; Engineering Discussions
        </h1>
        <p className="text-base text-on-surface-variant mt-xs">
          Ask technical questions, share reproducible benchmarks, and get verified solutions from
          experienced engineers.
        </p>
      </div>

      <div className="flex items-center gap-md shrink-0">
        <Button variant="surface" type="button" onClick={onCustomFeed}>
          <SlidersHorizontal className="w-4 h-4" />
          Custom Feed
        </Button>
        <motion.div whileTap={{ scale: 0.96 }}>
          <Button variant="primary" type="button" onClick={onAsk}>
            <Plus className="w-4 h-4" />
            Ask Question
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
