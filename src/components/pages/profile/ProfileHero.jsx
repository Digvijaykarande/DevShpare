import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, CalendarDays, Globe, MapPin, Pencil, Settings, Sparkles } from "lucide-react";
import Avatar from "../../ui/Avatar";
import { Button, buttonVariants } from "../../ui/button";
import { cn } from "../../../utils/cn";

// Little code-flavoured chips that drift across the cover.
const FLOATERS = [
  { text: "</>", x: "8%", y: "24%", d: 7, r: -8 },
  { text: "npm run dev", x: "62%", y: "16%", d: 9, r: 4 },
  { text: "{ ship: true }", x: "78%", y: "58%", d: 8, r: -3 },
  { text: "git push", x: "30%", y: "62%", d: 10, r: 6 },
];

export default function ProfileHero({ profile, onEdit }) {
  const websiteLabel = profile.website ? profile.website.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-3xl border border-outline-variant/40 bg-surface-container-lowest shadow-md"
    >
      {/* ---------- Animated cover ---------- */}
      <div className="relative h-40 overflow-hidden sm:h-52" style={{ background: "linear-gradient(115deg,#2b22a8 0%,#4f46e5 38%,#7c5cff 62%,#38bdf8 100%)" }}>
        <motion.div
          aria-hidden
          className="absolute -left-10 -top-16 h-64 w-64 rounded-full bg-fuchsia-400/40 blur-3xl"
          animate={{ x: [0, 80, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-cyan-300/40 blur-3xl"
          animate={{ x: [0, -70, 0], y: [0, -30, 0], scale: [1.1, 0.9, 1.1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* dotted grid */}
        <div aria-hidden className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.55) 1px, transparent 1px)", backgroundSize: "22px 22px", maskImage: "linear-gradient(to bottom, black, transparent 90%)" }} />
        {FLOATERS.map((f) => (
          <motion.span
            key={f.text}
            aria-hidden
            className="absolute hidden select-none rounded-lg border border-white/25 bg-white/10 px-2.5 py-1 font-code text-[11px] text-white/90 backdrop-blur-md sm:block"
            style={{ left: f.x, top: f.y, rotate: f.r }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: f.d, repeat: Infinity, ease: "easeInOut" }}
          >
            {f.text}
          </motion.span>
        ))}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/15 to-transparent" />
      </div>

      {/* ---------- Identity ---------- */}
      <div className="px-5 pb-6 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
            {/* avatar with a slowly rotating gradient ring */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
              className="relative -mt-14 h-28 w-28 shrink-0 overflow-hidden rounded-[1.75rem] p-[3px] shadow-xl sm:-mt-16 sm:h-32 sm:w-32"
            >
              <motion.div
                aria-hidden
                className="absolute -inset-[60%]"
                style={{ background: "conic-gradient(from 0deg,#4f46e5,#38bdf8,#f0abfc,#fbbf24,#4f46e5)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative h-full w-full rounded-[1.6rem] bg-surface-container-lowest p-[3px]">
                <Avatar name={profile.name} src={profile.avatar} size="xl" className="h-full w-full rounded-[1.4rem] text-4xl" />
              </div>
              <span className="absolute bottom-2 right-2 grid h-4 w-4 place-items-center">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-surface-container-lowest" />
              </span>
            </motion.div>

            <div className="min-w-0 sm:pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-2xl font-bold tracking-tight text-on-surface sm:text-3xl">{profile.name}</h1>
                {profile.emailVerified !== false && <BadgeCheck className="h-5 w-5 text-primary-container" aria-label="Verified" />}
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary-container to-violet-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                  <Sparkles className="h-3 w-3" /> Pro Member
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-on-surface-variant">{profile.role}</p>
              <p className="font-code text-xs text-outline">@{profile.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:pt-4">
            <Link to="/settings" className={cn(buttonVariants({ variant: "surface", size: "default" }), "rounded-xl")}>
              <Settings className="h-4 w-4" /> Settings
            </Link>
            <Button variant="primary" onClick={onEdit} className="rounded-xl">
              <Pencil className="h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-on-surface-variant">
          {profile.location && <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" />{profile.location}</span>}
          {profile.website && (
            <a href={profile.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-primary">
              <Globe className="h-4 w-4 text-primary" />{websiteLabel}
            </a>
          )}
          <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-primary" />Joined {profile.joined}</span>
        </div>
      </div>
    </motion.section>
  );
}
