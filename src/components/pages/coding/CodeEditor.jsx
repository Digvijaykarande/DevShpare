import { highlightCode } from "../../../utils/highlightCode";

export default function CodeEditor({ code, onChange }) {
  const lines = code.split("\n");

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const updatedCode = code.substring(0, start) + "  " + code.substring(end);
      onChange(updatedCode);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="relative bg-surface-container-lowest flex flex-1 h-full font-code text-[13px] leading-[1.65rem] overflow-auto border-b border-outline-variant/60">
      <div className="select-none py-3 px-3 text-right bg-surface-container-low/70 border-r border-outline-variant/60 text-outline w-12 shrink-0 font-code text-xs">
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>

      <div className="relative w-full">
        {/* Highlighted read layer — sits behind transparent, editable textarea */}
        <div className="py-3 px-4 w-full text-on-surface pointer-events-none whitespace-pre">
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre">
              {line.length
                ? highlightCode(line).map((part, j) => (
                    <span key={j} className={part.className}>
                      {part.text}
                    </span>
                  ))
                : "\u00A0"}
            </div>
          ))}
        </div>

        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="absolute inset-0 w-full h-full py-3 px-4 bg-transparent text-transparent caret-on-surface resize-none outline-none font-code text-[13px] leading-[1.65rem] whitespace-pre overflow-x-auto"
        />
      </div>
    </div>
  );
}
