import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function ExampleCard({ index, example }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(example.input);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="bg-surface-container-low border border-outline-variant/60 rounded-xl p-3.5 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-on-surface">Example {index}:</span>
        <button
          type="button"
          onClick={copy}
          className="text-on-surface-variant hover:text-on-surface flex items-center gap-1 text-xs font-medium"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <div className="p-3 bg-surface-container-lowest border border-outline-variant/50 rounded-lg font-code text-xs space-y-1 text-on-surface">
        <p>
          <span className="text-outline select-none">Input:</span> <span>{example.input}</span>
        </p>
        <p>
          <span className="text-outline select-none">Output:</span>{" "}
          <span className="text-success font-bold">{example.output}</span>
        </p>
        {example.explanation && (
          <p>
            <span className="text-outline select-none">Explanation:</span>{" "}
            <span className="text-on-surface-variant">{example.explanation}</span>
          </p>
        )}
      </div>
    </div>
  );
}
