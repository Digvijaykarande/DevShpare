import { motion } from "framer-motion";
import { BadgeCheck, Bookmark, Clock, Eye, MessagesSquare, TrendingUp } from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import Avatar from "../../ui/Avatar";
import VoteControl from "./VoteControl";
import CodePreview from "./CodePreview";
import { cn } from "../../../utils/cn";
import { timeAgo } from "../../../utils/formatDate";

// Card entrance — the parent list staggers these via variants
const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const compact = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n));

function AnswerPill({ answers, accepted }) {
  if (accepted)
    return (
      <span className="flex items-center gap-1 px-sm py-0.5 rounded bg-surface-container text-secondary font-semibold">
        <BadgeCheck className="w-3.5 h-3.5" />
        {answers} {answers === 1 ? "Answer" : "Answers"} (Accepted)
      </span>
    );
  if (answers === 0)
    return (
      <span className="flex items-center gap-1 px-sm py-0.5 rounded bg-surface-container-high font-semibold">
        <Clock className="w-3.5 h-3.5" />0 Answers (Unanswered)
      </span>
    );
  return (
    <span className="flex items-center gap-1 px-sm py-0.5 rounded bg-surface-container-low font-semibold">
      <MessagesSquare className="w-3.5 h-3.5" />
      {answers} {answers === 1 ? "Answer" : "Answers"}
    </span>
  );
}

function CornerBadge({ question }) {
  if (question.version)
    return (
      <span className="flex items-center gap-xs text-on-surface-variant font-code text-xs">
        <span className="w-2 h-2 rounded-full bg-secondary-container" />
        {question.version}
      </span>
    );
  if (question.flag === "hot")
    return (
      <span className="flex items-center gap-1 text-primary text-xs font-semibold">
        <TrendingUp className="w-3.5 h-3.5" />
        Hot Topic
      </span>
    );
  if (question.flag === "active")
    return <Badge variant="neutral" className="text-xs">Active Discussion</Badge>;
  if (question.flag === "triage")
    return <Badge variant="neutral" className="text-xs text-error font-semibold">Needs triage</Badge>;
  return null;
}

// Renders `inline code` segments from the body text
function Body({ text }) {
  return text.split(/(`[^`]+`)/g).map((seg, i) =>
    seg.startsWith("`") ? (
      <code key={i} className="font-code text-[13px] px-1 py-0.5 rounded bg-surface-container text-on-surface">
        {seg.slice(1, -1)}
      </code>
    ) : (
      seg
    )
  );
}

export default function QuestionCard({ question, userVote, bookmarked, onVote, onBookmark, onTagClick }) {
  const { author } = question;

  return (
    <motion.article variants={cardVariants} whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
      <Card className="p-lg flex flex-col gap-md shadow-sm hover:shadow-md transition-shadow border-transparent">
        {/* metrics + corner badge */}
        <div className="flex flex-wrap items-center justify-between gap-sm">
          <div className="flex flex-wrap items-center gap-md text-on-surface-variant text-xs">
            <VoteControl votes={question.votes} userVote={userVote} onVote={(dir) => onVote(question.id, dir)} />
            <AnswerPill answers={question.answers} accepted={question.answered} />
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {compact(question.views)} views
            </span>
          </div>
          <div className="flex items-center gap-sm">
            <CornerBadge question={question} />
            <button
              type="button"
              onClick={() => onBookmark(question.id)}
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark question"}
              aria-pressed={bookmarked}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                bookmarked ? "text-primary bg-primary/10" : "text-outline hover:text-on-surface hover:bg-surface-container"
              )}
            >
              <Bookmark className="w-4 h-4" fill={bookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* title + excerpt */}
        <div>
          <h2 className="font-display text-xl font-semibold text-on-surface leading-snug hover:text-primary transition-colors cursor-pointer">
            {question.title}
          </h2>
          <p className="text-sm text-on-surface-variant mt-xs leading-relaxed">
            <Body text={question.body} />
          </p>
        </div>

        {question.code && <CodePreview {...question.code} snippet={question.code.snippet} />}

        {/* tags + author */}
        <div className="flex flex-wrap items-center justify-between gap-md pt-xs">
          <div className="flex flex-wrap items-center gap-xs">
            {question.tags.map((tag) => (
              <button key={tag} type="button" onClick={() => onTagClick?.(tag)}>
                <Badge variant="neutral" className="text-on-surface hover:bg-surface-container-high transition-colors">
                  {tag}
                </Badge>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-sm min-w-0">
            <Avatar name={author.name} size="sm" className="w-8 h-8 text-xs" />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-on-surface truncate">{author.name}</span>
                {author.rep && (
                  <span className="font-code text-xs px-1 rounded bg-surface-container text-primary font-bold">
                    +{author.rep}
                  </span>
                )}
              </div>
              <span className="text-xs text-on-surface-variant truncate">
                {author.role ? `${author.role} • ` : ""}
                {timeAgo(question.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.article>
  );
}
