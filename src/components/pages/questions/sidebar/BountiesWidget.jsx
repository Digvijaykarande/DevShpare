import { Coins } from "lucide-react";

export default function BountiesWidget({ bounties, onOpen, onBrowseAll }) {
  return (
    <section className="p-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-xs">
          <Coins className="w-5 h-5 text-secondary" />
          <h3 className="font-display text-base font-semibold text-on-surface">Active Bounties</h3>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
          {bounties.length} Open
        </span>
      </div>

      <div className="flex flex-col gap-sm">
        {bounties.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => onOpen(b)}
            className="p-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col gap-1 text-left"
          >
            <div className="flex items-center justify-between">
              <span className="font-code text-xs font-bold text-primary">+{b.reward} Rep Points</span>
              <span className="text-xs text-on-surface-variant">Expires in {b.expiresIn}</span>
            </div>
            <span className="text-sm text-on-surface font-semibold line-clamp-1">{b.title}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onBrowseAll}
        className="w-full py-sm rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors"
      >
        Browse All Bounties
      </button>
    </section>
  );
}
