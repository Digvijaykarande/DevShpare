import { GraduationCap, ArrowRight } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";

export default function BecomeMentorCallout({ onApply }) {
  return (
    <Card className="p-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-lg">
      <div className="flex flex-col max-w-[36rem]">
        <div className="flex items-center gap-xs text-secondary text-xs font-bold uppercase tracking-wider mb-1">
          <GraduationCap className="w-4 h-4" />
          Give back
        </div>
        <h2 className="text-on-surface font-display text-xl font-semibold">
          Been through it already? Mentor the next person through it.
        </h2>
        <p className="text-on-surface-variant text-sm mt-1">
          Set your own hours, pick your own price — even free. Most mentors spend under 2 hours a
          week and say it's the best part of their week.
        </p>
      </div>

      <Button variant="primary" size="default" type="button" className="shrink-0 w-full md:w-auto" onClick={onApply}>
        Apply to mentor
        <ArrowRight className="w-4 h-4" />
      </Button>
    </Card>
  );
}
