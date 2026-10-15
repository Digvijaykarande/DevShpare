import { BookOpen, Rocket, ShieldCheck } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";

export default function VerificationCallout({ onReadPlaybook, onSubmit }) {
  return (
    <Card className="p-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-lg">
      <div className="flex flex-col max-w-[36rem]">
        <div className="flex items-center gap-xs text-secondary text-xs font-bold uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" />
          Git Proof-of-Work Verification
        </div>
        <h2 className="text-on-surface font-display text-xl font-semibold">
          Want your project verified with official Devsphere badges?
        </h2>
        <p className="text-on-surface-variant text-sm mt-1">
          Every merge request and sprint delivery is signed on our immutable audit log,
          generating an interactive resume portfolio backed by real code repositories.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-sm shrink-0 w-full md:w-auto">
        <Button variant="surface" size="default" type="button" className="w-full sm:w-auto" onClick={onReadPlaybook}>
          <BookOpen className="w-4 h-4 text-on-surface-variant" />
          Read the Playbook
        </Button>
        <Button variant="primary" size="default" type="button" className="w-full sm:w-auto" onClick={onSubmit}>
          <Rocket className="w-4 h-4" />
          Submit for Verification
        </Button>
      </div>
    </Card>
  );
}
