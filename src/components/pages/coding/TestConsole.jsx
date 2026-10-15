import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, Plus, ChevronsUpDown, CheckCircle2, XCircle, AlertTriangle, Code2 } from "lucide-react";
import { cn } from "../../../utils/cn";

export default function TestConsole({ testCases, lastResult, status, onAddCustomCase, onUpdateCustomCase }) {
  const [activeCase, setActiveCase] = useState(testCases[0]?.id || 1);
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("testcase"); // 'testcase' | 'result'

  const currentCase = testCases.find((c) => c.id === activeCase) || testCases[0] || {};
  const currentResult = lastResult?.results?.find((r) => r.id === activeCase) || lastResult?.results?.[0];

  const hasResult = lastResult && lastResult.status;

  return (
    <div className="bg-surface-container-lowest flex flex-col border-t border-outline-variant/60">
      {/* Console Header Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-surface-container-low border-b border-outline-variant/60">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("testcase")}
            className={cn(
              "px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors",
              activeTab === "testcase"
                ? "bg-surface-container-lowest border border-outline-variant/60 text-on-surface shadow-2xs"
                : "text-on-surface-variant hover:text-on-surface font-medium"
            )}
          >
            <Code2 className="w-3.5 h-3.5 text-primary-container" />
            <span>Testcase</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("result")}
            className={cn(
              "px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors",
              activeTab === "result"
                ? "bg-surface-container-lowest border border-outline-variant/60 text-on-surface shadow-2xs"
                : "text-on-surface-variant hover:text-on-surface font-medium"
            )}
          >
            <ShieldCheck
              className={cn(
                "w-3.5 h-3.5",
                hasResult
                  ? lastResult.success
                    ? "text-success"
                    : "text-error"
                  : "text-outline"
              )}
            />
            <span>Test Result</span>
            {hasResult && (
              <span
                className={cn(
                  "ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                  lastResult.success ? "bg-success/20 text-success" : "bg-error/20 text-error"
                )}
              >
                {lastResult.passedCount ?? 0}/{lastResult.totalCount ?? testCases.length}
              </span>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="text-outline hover:text-on-surface p-1 rounded-md hover:bg-surface-container-high transition-colors"
          title={collapsed ? "Expand Console" : "Collapse Console"}
        >
          <ChevronsUpDown className="w-4 h-4" />
        </button>
      </div>

      {/* Main Console Content */}
      {!collapsed && (
        <div className="p-3.5 space-y-3 bg-surface-container-low/30 min-h-[160px]">
          {/* Case Selection Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {testCases.map((tc, idx) => {
              const caseRes = lastResult?.results?.find((r) => r.id === tc.id);
              return (
                <button
                  key={tc.id || idx}
                  type="button"
                  onClick={() => setActiveCase(tc.id)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors",
                    tc.id === activeCase
                      ? "bg-surface-container-lowest border border-outline-variant/60 text-on-surface shadow-2xs"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-lowest font-medium"
                  )}
                >
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      caseRes
                        ? caseRes.passed
                          ? "bg-success"
                          : "bg-error"
                        : "bg-primary-container"
                    )}
                  />
                  <span>{tc.label || `Case ${idx + 1}`}</span>
                </button>
              );
            })}

            {onAddCustomCase && (
              <button
                type="button"
                onClick={onAddCustomCase}
                className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-surface-container-lowest text-on-surface-variant hover:text-on-surface text-xs font-medium flex items-center gap-1 transition-colors border border-dashed border-outline-variant/60"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Custom Case</span>
              </button>
            )}
          </div>

          {/* Testcase Input View */}
          {activeTab === "testcase" && currentCase && (
            <div className="space-y-2">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-on-surface-variant">
                  {currentCase.paramName || "Input"} =
                </label>
                {onUpdateCustomCase && currentCase.isCustom ? (
                  <input
                    value={currentCase.value}
                    onChange={(e) => onUpdateCustomCase(currentCase.id, e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/60 p-2.5 rounded-lg font-code text-xs text-on-surface outline-none focus:border-primary-container"
                  />
                ) : (
                  <div className="w-full bg-surface-container-lowest border border-outline-variant/60 p-2.5 rounded-lg font-code text-xs text-on-surface select-all shadow-2xs">
                    {currentCase.value}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-on-surface-variant">Expected Output =</label>
                <div className="w-full bg-surface-container-lowest/80 border border-outline-variant/40 p-2 rounded-lg font-code text-xs text-on-surface-variant">
                  {currentCase.expected}
                </div>
              </div>
            </div>
          )}

          {/* Test Result View */}
          {activeTab === "result" && (
            <AnimatePresence mode="wait">
              {status === "running" ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-6 h-6 border-2 border-primary-container border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-on-surface-variant">Running code against test cases...</p>
                </div>
              ) : hasResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {/* Status Header Banner */}
                  <div
                    className={cn(
                      "p-3 rounded-xl border flex flex-wrap items-center justify-between gap-3 shadow-2xs",
                      lastResult.success
                        ? "bg-success-container/10 border-success/30 text-success"
                        : "bg-error-container/10 border-error/30 text-error"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {lastResult.success ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : (
                        <XCircle className="w-5 h-5 text-error" />
                      )}
                      <span className="font-bold text-sm tracking-wide">{lastResult.status}</span>
                      <span className="text-xs text-on-surface-variant ml-2 font-medium">
                        ({lastResult.passedCount}/{lastResult.totalCount} test cases passed)
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-code text-on-surface-variant">
                      <span>
                        Runtime: <strong className="text-on-surface font-semibold">{lastResult.totalTime}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Memory: <strong className="text-on-surface font-semibold">{lastResult.memory}</strong>
                      </span>
                      {lastResult.beats && (
                        <>
                          <span>•</span>
                          <span className="text-success font-semibold">Beats {lastResult.beats}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Compile / Runtime Error Display */}
                  {lastResult.error && (
                    <div className="p-3 bg-error-container/20 border border-error/40 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 text-error font-semibold text-xs">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Execution Error</span>
                      </div>
                      <pre className="font-code text-xs text-error/90 whitespace-pre-wrap">
                        {lastResult.error}
                      </pre>
                    </div>
                  )}

                  {/* Per Case Output Diff */}
                  {currentResult && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-code">
                      <div className="space-y-1">
                        <span className="text-on-surface-variant font-medium block">Your Output:</span>
                        <div
                          className={cn(
                            "p-2.5 rounded-lg border font-code select-all",
                            currentResult.passed
                              ? "bg-surface-container-lowest border-outline-variant/60 text-success font-semibold"
                              : "bg-error-container/10 border-error/30 text-error font-semibold"
                          )}
                        >
                          {currentResult.actual}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-on-surface-variant font-medium block">Expected Output:</span>
                        <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/60 text-on-surface select-all">
                          {currentResult.expected}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="py-6 text-center text-xs text-on-surface-variant">
                  Click <strong className="text-on-surface">"Run Code"</strong> or{" "}
                  <strong className="text-on-surface">"Submit"</strong> to execute test cases.
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      )}
    </div>
  );
}
