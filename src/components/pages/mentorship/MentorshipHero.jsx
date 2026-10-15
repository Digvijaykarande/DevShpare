export default function MentorshipHero() {
  return (
    <div className="flex flex-col max-w-[42rem]">
      <div className="flex items-center gap-xs text-primary text-xs font-semibold uppercase tracking-wider mb-1">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        1:1 Mentorship
      </div>
      <h1 className="font-display text-2xl lg:text-[2.25rem] lg:leading-[2.75rem] font-semibold tracking-tight text-on-surface">
        Find a mentor who's been where you're headed
      </h1>
      <p className="text-base text-on-surface-variant mt-1">
        Staff and principal engineers from teams across the industry, holding office hours for
        exactly the problem you're stuck on right now.
      </p>
    </div>
  );
}
