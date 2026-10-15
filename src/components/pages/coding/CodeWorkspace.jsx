import { useCallback, useRef, useState, useEffect } from "react";
import { Card } from "../../ui/card";
import EditorToolbar from "./EditorToolbar";
import CodeEditor from "./CodeEditor";
import TestConsole from "./TestConsole";
import WorkspaceFooter from "./WorkspaceFooter";
import { executeCode } from "../../../utils/codeRunner";
import { api } from "../../../lib/api";
import { CheckCircle2, XCircle, Award, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MIN_EDITOR_HEIGHT = 200;
const MAX_EDITOR_HEIGHT = 650;

export default function CodeWorkspace({ problem, onNotify, onSubmitted }) {
  const [language, setLanguage] = useState(problem.language || "JavaScript");
  const [code, setCode] = useState(problem.starterCode || "");
  const [testCases, setTestCases] = useState(problem.testCases || []);
  const [lastResult, setLastResult] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | running | done
  const [running, setRunning] = useState(false);
  const [editorHeight, setEditorHeight] = useState(380);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const dragState = useRef(null);

  // Sync starter code and test cases when problem changes
  useEffect(() => {
    setLanguage(problem.language || "JavaScript");
    setCode(problem.starterCode || "");
    setTestCases(problem.testCases || []);
    setLastResult(null);
    setStatus("idle");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem.slug]);

  const startVerticalDrag = useCallback(
    (e) => {
      dragState.current = { startY: e.clientY, startHeight: editorHeight };
      const onMove = (ev) => {
        if (!dragState.current) return;
        const delta = ev.clientY - dragState.current.startY;
        const next = Math.min(MAX_EDITOR_HEIGHT, Math.max(MIN_EDITOR_HEIGHT, dragState.current.startHeight + delta));
        setEditorHeight(next);
      };
      const onUp = () => {
        dragState.current = null;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [editorHeight]
  );

  const handleRunCode = () => {
    setRunning(true);
    setStatus("running");
    onNotify?.("Executing test cases against JavaScript runner...");

    setTimeout(() => {
      const result = executeCode(code, testCases, language);
      setLastResult(result);
      setStatus("done");
      setRunning(false);

      if (result.success) {
        onNotify?.(`All ${result.passedCount}/${result.totalCount} test cases passed!`);
      } else {
        onNotify?.(`Failed: ${result.passedCount}/${result.totalCount} test cases passed.`);
      }
    }, 400);
  };

  const handleSubmitSolution = () => {
    setRunning(true);
    setStatus("running");
    onNotify?.("Running your solution against the test cases...");

    setTimeout(async () => {
      // Custom cases are for experimenting with Run; a submission is judged on the official cases only.
      const officialCases = testCases.filter((c) => !c.isCustom);
      const result = executeCode(code, officialCases, language);
      setLastResult(result);
      setStatus("done");
      setRunning(false);

      if (!localStorage.getItem("devsphere_token")) {
        onNotify?.(
          result.success
            ? "All tests passed — sign in to save this submission"
            : "Some tests failed — sign in to save your attempts"
        );
        return;
      }

      try {
        await api.post(`/coding/${problem.slug}/submit`, { code, language, result });
        onSubmitted?.(result);
        if (result.success) {
          setShowSubmitModal(true);
          onNotify?.("Accepted! Your submission was saved.");
        } else {
          onNotify?.(`${result.status}. Your attempt was saved — check the test results.`);
        }
      } catch (err) {
        onNotify?.(err?.data?.error || err?.message || "Couldn't save your submission");
      }
    }, 600);
  };

  const handleAddCustomCase = () => {
    const nextId = testCases.length + 1;
    const newCase = {
      id: nextId,
      label: `Case ${nextId}`,
      paramName: testCases[0]?.paramName || "input",
      value: testCases[0]?.value || "",
      expected: testCases[0]?.expected || "",
      isCustom: true,
    };
    setTestCases((prev) => [...prev, newCase]);
    onNotify?.("Added new custom test case");
  };

  const handleUpdateCustomCase = (id, newValue) => {
    setTestCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, value: newValue } : c))
    );
  };

  return (
    <Card className="flex flex-col overflow-hidden relative">
      <EditorToolbar
        language={language}
        onLanguageChange={setLanguage}
        onReset={() => {
          setCode(problem.starterCode || "");
          setLastResult(null);
          onNotify?.("Code reset to starter template");
        }}
        onFullscreen={() => onNotify?.("Fullscreen mode toggled")}
      />

      <div style={{ height: editorHeight }} className="flex flex-col min-h-0">
        <CodeEditor code={code} onChange={setCode} />
      </div>

      <div
        onMouseDown={startVerticalDrag}
        className="hidden sm:flex h-2 shrink-0 cursor-row-resize items-center justify-center bg-surface-container-low border-y border-outline-variant/60 group"
        title="Drag to resize editor"
      >
        <div className="w-10 h-1 rounded-full bg-outline-variant/60 group-hover:bg-primary-container transition-colors" />
      </div>

      <TestConsole
        testCases={testCases}
        lastResult={lastResult}
        status={status}
        onAddCustomCase={handleAddCustomCase}
        onUpdateCustomCase={handleUpdateCustomCase}
      />

      <WorkspaceFooter
        running={running}
        onRun={handleRunCode}
        onSubmit={handleSubmitSolution}
      />

      {/* Submission Success Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 relative"
            >
              <button
                onClick={() => setShowSubmitModal(false)}
                className="absolute top-4 right-4 text-outline hover:text-on-surface p-1 rounded-lg hover:bg-surface-container-low"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-success/20 text-success flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-on-surface flex items-center gap-1.5">
                    Accepted <Sparkles className="w-4 h-4 text-warning" />
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    {problem.number}. {problem.title}
                  </p>
                </div>
              </div>

              {lastResult && (
                <div className="grid grid-cols-2 gap-3 p-4 bg-surface-container-low rounded-xl border border-outline-variant/60 text-xs">
                  <div>
                    <span className="text-on-surface-variant block">Runtime</span>
                    <strong className="text-on-surface font-semibold text-sm">{lastResult.totalTime}</strong>
                    <span className="text-success text-[11px] block font-medium">Beats {lastResult.beats}</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block">Memory</span>
                    <strong className="text-on-surface font-semibold text-sm">{lastResult.memory}</strong>
                    <span className="text-on-surface-variant text-[11px] block">Top 90% solution</span>
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 bg-primary-container text-on-primary font-semibold text-xs rounded-xl hover:opacity-90 transition-opacity"
                >
                  Continue Coding
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Card>
  );
}