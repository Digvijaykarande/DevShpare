import { useState } from "react";
import { Card } from "../../ui/card";
import ProblemTabs from "./ProblemTabs";
import ElevationChart from "./ElevationChart";
import ExampleCard from "./ExampleCard";
import ConstraintsCard from "./ConstraintsCard";
import HintAccordion from "./HintAccordion";
import { CheckCircle2, Clock, Cpu, Award, FileCode } from "lucide-react";

function StatementText({ statement }) {
  if (!statement) return null;
  return (
    <div className="space-y-2">
      {statement.map((part, i) => (
        <span key={i}>
          {part.code ? (
            <code className="px-1.5 py-0.5 rounded bg-surface-container-low border border-outline-variant/60 text-primary-container font-code text-xs font-medium">
              {part.code}
            </code>
          ) : part.emphasis ? (
            <strong className="text-on-surface font-semibold">{part.text}</strong>
          ) : (
            <span>{part.text}</span>
          )}
        </span>
      ))}
    </div>
  );
}

export default function ProblemPanel({ problem }) {
  const [tab, setTab] = useState("description");

  return (
    <Card className="flex flex-col overflow-hidden h-full">
      <ProblemTabs active={tab} onChange={setTab} />

      <div className="p-lg space-y-5 max-h-[820px] overflow-y-auto flex-1">
        {tab === "description" && (
          <>
            <div className="space-y-1">
              <h1 className="text-xl font-bold text-on-surface tracking-tight">
                {problem.number}. {problem.title}
              </h1>
              <div className="flex items-center gap-2 text-on-surface-variant text-xs flex-wrap">
                <span>Submissions: {problem.submissions || "1,200,000"}</span>
                <span>•</span>
                <span>Accuracy: {problem.accuracy || "High"}</span>
                {problem.hasAcceptedSolution && (
                  <>
                    <span>•</span>
                    <span className="text-success font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Official Solution Available
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="text-on-surface-variant text-sm leading-relaxed">
              <StatementText statement={problem.statement} />
            </div>

            {problem.elevation && <ElevationChart heights={problem.elevation} />}

            {problem.examples &&
              problem.examples.map((example, i) => (
                <ExampleCard key={i} index={i + 1} example={example} />
              ))}

            {problem.constraints && <ConstraintsCard constraints={problem.constraints} />}

            {problem.hints && <HintAccordion hints={problem.hints} />}
          </>
        )}

        {tab === "editorial" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <Award className="w-5 h-5 text-primary-container" />
              Official Editorial & Optimal Solution
            </h2>

            {problem.editorial ? (
              <div className="space-y-4 text-xs sm:text-sm text-on-surface-variant">
                <div className="p-3.5 bg-surface-container-low border border-outline-variant/60 rounded-xl space-y-2">
                  <h3 className="font-semibold text-on-surface text-sm">Summary</h3>
                  <p>{problem.editorial.summary}</p>
                </div>

                <div className="p-3.5 bg-surface-container-low border border-outline-variant/60 rounded-xl space-y-2">
                  <h3 className="font-semibold text-on-surface text-sm">Step-by-Step Approach</h3>
                  <pre className="font-code text-xs whitespace-pre-wrap leading-relaxed text-on-surface bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/40">
                    {problem.editorial.approach}
                  </pre>
                </div>

                <div className="flex items-center gap-4 p-3 bg-surface-container-low border border-outline-variant/60 rounded-xl text-xs font-semibold text-on-surface">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary-container" />
                    <span>Complexity: {problem.editorial.complexity}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-on-surface-variant">Detailed editorial solution coming soon for this problem.</p>
            )}
          </div>
        )}

        {tab === "solutions" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <FileCode className="w-5 h-5 text-primary-container" />
              Top Community Solutions
            </h2>
            <div className="space-y-3">
              <div className="p-3.5 bg-surface-container-low border border-outline-variant/60 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-on-surface">Optimal JavaScript Solution</span>
                  <span className="text-[11px] text-success font-semibold">100% Beats Speed</span>
                </div>
                <pre className="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/40 font-code text-xs text-on-surface overflow-x-auto">
                  {problem.starterCode}
                </pre>
              </div>
            </div>
          </div>
        )}

        {tab === "submissions" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-container" />
              Submission History
            </h2>
            {problem.lastResult ? (
              <div className="p-4 bg-surface-container-low border border-outline-variant/60 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-success font-semibold text-xs bg-success-container/30 px-2.5 py-1 rounded-full border border-success/30">
                    <CheckCircle2 className="w-4 h-4" />
                    {problem.lastResult.status}
                  </span>
                  <span className="text-xs text-on-surface-variant">Just now</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-surface-container-lowest rounded-lg border border-outline-variant/40">
                    <span className="text-on-surface-variant block">Runtime</span>
                    <strong className="text-on-surface font-semibold text-sm">{problem.lastResult.runtime}</strong>
                  </div>
                  <div className="p-2.5 bg-surface-container-lowest rounded-lg border border-outline-variant/40">
                    <span className="text-on-surface-variant block">Memory</span>
                    <strong className="text-on-surface font-semibold text-sm">{problem.lastResult.memory}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-on-surface-variant">No previous submissions for this challenge yet.</p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
