import { motion } from "framer-motion";
import { Compass, Search } from "lucide-react";

export default function ResourcesHero({ search, onSearchChange }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-inverse-surface px-lg py-2xl sm:px-2xl">
      <motion.div
        className="absolute -left-20 -top-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl pointer-events-none"
        animate={{ x: [0, 18, 0], y: [0, 14, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 -bottom-24 w-72 h-72 bg-tertiary/20 rounded-full blur-3xl pointer-events-none"
        animate={{ x: [0, -16, 0], y: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      <motion.div
        className="absolute left-1/2 top-0 w-56 h-56 bg-secondary/20 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 flex flex-col max-w-[42rem]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="inline-flex items-center gap-xs self-start text-inverse-on-surface/90 text-xs font-semibold uppercase tracking-wider mb-3 bg-white/10 border border-white/10 rounded-full px-3 py-1.5"
        >
          <Compass className="w-3.5 h-3.5 text-primary-container" />
          Resource Library
        </motion.div>

        <h1 className="font-display text-2xl lg:text-[2.25rem] lg:leading-[2.75rem] font-semibold tracking-tight text-inverse-on-surface">
          Everything worth bookmarking, in one place
        </h1>
        <p className="text-base text-inverse-on-surface/70 mt-2">
          Docs, courses, practice tools, communities and reads — hand-picked so you stop
          re-Googling "best resource to learn X" every few months.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="relative mt-lg max-w-md"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-inverse-on-surface/50 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search resources, tags, providers..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white/10 border border-white/10 text-inverse-on-surface placeholder:text-inverse-on-surface/50 text-sm focus:outline-none focus:bg-white/15 focus:border-white/20 transition-colors"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}