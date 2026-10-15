import { ArrowRight, ShieldCheck } from "lucide-react";

export default function VerifiedGuaranteeWidget({ onReadMore }) {
  return (
    <section className="p-lg rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-sm relative overflow-hidden">
      <div className="flex items-center gap-sm">
        <div className="p-2 rounded-lg bg-surface-container text-primary shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h3 className="font-display text-base font-semibold text-on-surface">Verified Solutions Guarantee</h3>
      </div>
      <p className="text-sm text-on-surface-variant leading-relaxed">
        Questions with the verified mark include reproducible test scripts confirmed by peer
        reviewers. Code snippets comply with Devsphere benchmark safety rules.
      </p>
      <button
        type="button"
        onClick={onReadMore}
        className="text-xs text-primary hover:underline font-bold mt-1 flex items-center gap-1 self-start"
      >
        <span>Read our Engineering RFC Standard</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </section>
  );
}
