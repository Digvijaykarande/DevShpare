import { useState } from "react";
import { Check, Copy } from "lucide-react";

const KEYWORDS = /\b(const|let|async|await|function|return|import|from|export)\b/;
const TOKEN = new RegExp(
  `(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/[^\\n]*)|(\`[^\`]*\`|'[^']*'|"[^"]*")|${KEYWORDS.source}`,
  "g"
);

/** Minimal token pass — enough colour to read the sample, no highlighter dependency. */
function highlight(code) {
  const parts = [];
  let last = 0;
  let match;

  while ((match = TOKEN.exec(code)) !== null) {
    if (match.index > last) parts.push({ text: code.slice(last, match.index) });
    const [value, comment, string] = match;
    parts.push({
      text: value,
      className: comment
        ? "text-outline italic"
        : string
        ? "text-tertiary-fixed"
        : "text-secondary-fixed-dim",
    });
    last = match.index + value.length;
  }
  if (last < code.length) parts.push({ text: code.slice(last) });
  return parts;
}

export default function CodeSnippet({ filename, code }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-lg rounded-xl bg-inverse-surface text-inverse-on-surface p-md font-code text-[13px]">
      <div className="flex items-center justify-between pb-xs mb-xs border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-critical/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-warning/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-success/80" />
          <span className="ml-2 text-[11px] text-surface-dim">{filename}</span>
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Code copied" : "Copy code"}
          className="text-outline-variant hover:text-white transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <pre className="overflow-x-auto leading-relaxed">
        <code>
          {highlight(code).map((part, i) => (
            <span key={i} className={part.className}>
              {part.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
