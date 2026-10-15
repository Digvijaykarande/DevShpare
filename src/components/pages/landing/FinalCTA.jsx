import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "../../ui/button";

function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function FinalCTA() {
  return (
    <section className="max-w-[64rem] mx-auto px-6 mb-24">
      <div className="relative overflow-hidden rounded-2xl bg-primary text-on-primary text-center px-6 py-14 sm:py-16">
        <div className="absolute -top-20 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <span className="text-xs font-semibold uppercase tracking-wide text-primary-fixed-dim">
          Join the ecosystem
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mt-2 mb-3">
          Ready to accelerate your developer journey?
        </h2>
        <p className="text-sm text-on-primary/80 max-w-[28rem] mx-auto mb-8">
          Join 10,000+ developers building the future of software today. Free forever for
          individual contributors.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/register"
            className={buttonVariants({ variant: "outline" }) + " w-full sm:w-auto justify-center bg-surface text-primary hover:bg-surface-container-low group"}
          >
            Create your free account
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/25 text-on-primary font-medium text-sm hover:bg-white/10 transition-colors">
            <GithubIcon className="w-4 h-4" />
            Continue with GitHub
          </button>
        </div>
        <p className="text-[11px] text-on-primary/60 mt-6">
          Instant setup · No credit card required · Public &amp; private repos supported
        </p>
      </div>
    </section>
  );
}
