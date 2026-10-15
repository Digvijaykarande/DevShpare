import { Play, CloudUpload } from "lucide-react";
import { Button } from "../../ui/button";

function ShortcutHint({ keys, label }) {
  return (
    <div className="flex items-center gap-1">
      {keys.map((k) => (
        <kbd key={k} className="px-1.5 py-0.5 rounded bg-surface-container border border-outline-variant/60 text-on-surface-variant font-code text-[11px]">
          {k}
        </kbd>
      ))}
      <span className="text-on-surface-variant ml-0.5 font-medium">{label}</span>
    </div>
  );
}

export default function WorkspaceFooter({ onRun, onSubmit, running }) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-md bg-surface-container-lowest border-t border-outline-variant/60 px-md py-sm">
      <div className="hidden sm:flex items-center gap-3 text-outline text-xs">
        <ShortcutHint keys={["⌘", "'"]} label="Run" />
        <ShortcutHint keys={["⌘", "↵"]} label="Submit" />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Button variant="surface" size="sm" type="button" onClick={onRun} disabled={running}>
          <Play className="w-4 h-4 text-on-surface-variant" />
          Run Code
        </Button>
        <Button variant="primary" size="sm" type="button" onClick={onSubmit} disabled={running}>
          <CloudUpload className="w-4 h-4" />
          Submit Solution
        </Button>
      </div>
    </footer>
  );
}
