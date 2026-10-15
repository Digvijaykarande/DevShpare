import { highlightCode } from "../../../utils/highlightCode";

/** Dark code box with a file/language header — shown inside question cards. */
export default function CodePreview({ file, lang = "js", snippet }) {
  return (
    <div className="rounded-lg bg-inverse-surface text-inverse-on-surface p-md font-code text-[13px] overflow-x-auto shadow-inner">
      <div className="flex items-center justify-between pb-xs mb-xs text-outline-variant text-[11px] font-semibold uppercase tracking-wider">
        <span>{file}</span>
        <span>{lang}</span>
      </div>
      <pre className="leading-relaxed">
        {highlightCode(snippet, lang).map((part, i) => (
          <span
            key={i}
            className={part.className === "text-secondary" ? "text-secondary-container" : part.className}
          >
            {part.text}
          </span>
        ))}
      </pre>
    </div>
  );
}
