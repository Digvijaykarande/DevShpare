import { useState } from "react";
import { ChevronDown, AlignLeft, Terminal, RotateCcw, Maximize } from "lucide-react";
import { cn } from "../../../utils/cn";

const LANGUAGES = ["TypeScript (v5.4)", "JavaScript (Node 20)", "Python (3.12)", "C++ (GCC 13)"];

export default function EditorToolbar({ language, onLanguageChange, onReset, onFullscreen }) {
  const [open, setOpen] = useState(false);
  const [vim, setVim] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-between gap-xs bg-surface-container-low border-b border-outline-variant/60 px-3 py-2">
      <div className="flex items-center gap-2 relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 bg-surface-container-lowest border border-outline-variant/60 shadow-2xs px-2.5 py-1 rounded-md text-on-surface font-medium text-xs hover:bg-surface-container-low transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span>{language}</span>
          <ChevronDown className="w-3.5 h-3.5 text-outline" />
        </button>

        {open && (
          <div className="absolute top-9 left-0 z-10 w-52 bg-surface-container-lowest border border-outline-variant/60 rounded-lg shadow-lg py-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => {
                  onLanguageChange(lang);
                  setOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-surface-container-low",
                  lang === language ? "text-primary-container font-semibold" : "text-on-surface-variant"
                )}
              >
                {lang}
              </button>
            ))}
          </div>
        )}

        <span className="text-outline-variant">|</span>
        <button
          type="button"
          className="flex items-center gap-1 text-on-surface-variant hover:text-on-surface px-2 py-1 rounded hover:bg-surface-container-high transition-colors text-xs font-medium"
          title="Reformat code with Prettier"
        >
          <AlignLeft className="w-3.5 h-3.5 text-outline" />
          <span className="hidden sm:inline">Prettier</span>
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setVim((v) => !v)}
          className={cn(
            "flex items-center gap-1 px-2 py-1 rounded transition-colors text-xs font-medium",
            vim ? "text-primary-container bg-primary-container/10" : "text-on-surface-variant hover:bg-surface-container-high"
          )}
          title="Toggle Vim keymap"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Vim</span>
        </button>
        <button
          type="button"
          onClick={onReset}
          className="text-on-surface-variant hover:text-on-surface p-1.5 rounded hover:bg-surface-container-high transition-colors"
          title="Reset code to starter template"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onFullscreen}
          className="text-on-surface-variant hover:text-on-surface p-1.5 rounded hover:bg-surface-container-high transition-colors"
          title="Toggle fullscreen"
        >
          <Maximize className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
