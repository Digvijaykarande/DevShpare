import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpen, Clock, FolderOpen, MessagesSquare, PlayCircle, SlidersHorizontal, Terminal } from "lucide-react";
import { Button } from "../../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../ui/tabs";
import LearningOutcomes from "./LearningOutcomes";
import PracticeChallenges from "./PracticeChallenges";
import StudyMaterial from "./StudyMaterial";
import SupportBento from "./SupportBento";
import CodeSnippet from "./CodeSnippet";

export default function TopicInspector({ topic, onToggleOutcome, onLaunch, onOpenChallenge }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="lg:sticky lg:top-20">
      <div className="flex flex-col rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-[0_18px_40px_-24px_rgba(19,27,46,0.25)] overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-lg py-md bg-primary/5 border-b border-outline-variant/50">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-code text-xs font-bold text-primary">Selected topic</span>
          </span>
          <div className="flex items-center gap-sm text-xs text-on-surface-variant">
            <span className="inline-flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {topic.level}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {topic.duration}
            </span>
          </div>
        </div>

        <div className="p-lg">

        {/* Swapping topics cross-fades the header so it's clear the panel changed. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={topic.id}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="pt-md pb-md">
              <h3 className="font-display text-xl font-bold tracking-tight text-on-surface">{topic.title}</h3>
              <p className="text-sm text-on-surface-variant mt-1.5">{topic.description}</p>
            </div>

            {/* Four short tabs instead of one long scroll — each one answers a single
                question: what to learn, where to read up, what to practice, who to ask. */}
            <Tabs defaultValue="overview">
              <TabsList className="w-full">
                <TabsTrigger value="overview" className="flex-1 justify-center">
                  <BookOpen className="w-3.5 h-3.5" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex-1 justify-center">
                  <FolderOpen className="w-3.5 h-3.5" />
                  Resources
                </TabsTrigger>
                <TabsTrigger value="practice" className="flex-1 justify-center">
                  <Terminal className="w-3.5 h-3.5" />
                  Practice
                </TabsTrigger>
                <TabsTrigger value="community" className="flex-1 justify-center">
                  <MessagesSquare className="w-3.5 h-3.5" />
                  Community
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-md">
                <LearningOutcomes outcomes={topic.outcomes} onToggle={onToggleOutcome} />
              </TabsContent>

              <TabsContent value="resources" className="mt-md">
                <StudyMaterial resources={topic.studyMaterial} />
                <CodeSnippet filename={topic.snippet.filename} code={topic.snippet.code} />
              </TabsContent>

              <TabsContent value="practice" className="mt-md">
                <PracticeChallenges challenges={topic.challenges} onOpen={onOpenChallenge} />
              </TabsContent>

              <TabsContent value="community" className="mt-md">
                <SupportBento discussion={topic.discussion} mentorship={topic.mentorship} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </AnimatePresence>

        <div className="pt-lg">
          <Button variant="primary" className="w-full" type="button" onClick={onLaunch}>
            <PlayCircle className="w-5 h-5" />
            Open topic workspace
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
}
