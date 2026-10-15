import Avatar from "../../ui/Avatar";

const TESTIMONIALS = [
  {
    quote:
      "Before Devsphere, I had built 10 generic todo apps and had zero interview callbacks. Within 2 months I joined an open-source team building an async Redis queue — that project on my resume landed me my offer at Cloudflare.",
    name: "Rohan Mehta",
    role: "Software Engineer @ Cloudflare",
  },
  {
    quote:
      "The rigor of the community Q&A is unmatched. Instead of generic suggestions, people post Docker reproduction files and flame graphs. It's become my team's first stop when debugging complex distributed race conditions.",
    name: "Claire Beaulieu",
    role: "VP of Engineering @ PulseGrid",
  },
  {
    quote:
      "Mentoring here is rewarding because developers actually apply feedback and push working code. The roadmaps keep everyone aligned on real engineering fundamentals rather than chasing transient framework hype.",
    name: "Hiroshi Tanaka",
    role: "Distinguished Engineer @ OpenMesh",
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-[80rem] mx-auto px-6 lg:px-12 mb-20">
      <div className="text-center max-w-[36rem] mx-auto mb-10">
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">Social proof</span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-on-surface mt-1.5 mb-2">
          Engineered by developers, for developers
        </h2>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          From self-taught juniors landing their first staff role to senior contributors finding
          dream collaborators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="flex flex-col bg-surface border border-outline-variant rounded-xl p-5">
            <blockquote className="text-sm text-on-surface-variant leading-relaxed mb-5 flex-1">
              "{t.quote}"
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <Avatar name={t.name} />
              <div>
                <div className="text-xs font-semibold text-on-surface">{t.name}</div>
                <div className="text-[11px] text-on-surface-variant">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
