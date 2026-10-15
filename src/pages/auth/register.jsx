import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  AtSign,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { api } from "../../lib/api";
import { hydrateFromServer } from "../../lib/userStore";

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!agreeTerms) {
      setError("Please agree to the Terms and Privacy Policy to continue.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await api.post("/auth/register", {
        name: fullName,
        email,
        password,
      });

      if (data?.token) {
        localStorage.setItem("devsphere_token", data.token);
        await hydrateFromServer();
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 600);
      } else {
        throw new Error("Registration succeeded but no token was provided");
      }
    } catch (err) {
      setIsLoading(false);
      setError(err?.data?.error || err?.message || "Registration failed. Please try again.");
    }
  }

  const userLine = fullName || "alex_chen";
  const emailLine = email || "alex@company.dev";

  return (
    <div className="min-h-screen w-full bg-[#0B0E14] text-[#E6E8EF] flex flex-col lg:flex-row selection:bg-amber-400 selection:text-black">
      {/* Left: Form */}
      <div className="w-full lg:w-[46%] flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        <div className="flex items-center justify-between w-full">
          <Link to="/login" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#151A24] border border-[#232936] flex items-center justify-center text-amber-400 font-mono text-sm font-bold">
              &gt;_
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-white">
              devsphere
            </span>
          </Link>
          <div className="text-xs text-[#6B7280]">
            Have an account?{" "}
            <Link to="/login" className="text-amber-400 hover:text-amber-300 font-medium">
              Sign in
            </Link>
          </div>
        </div>

        <div className="w-full max-w-[24rem] mx-auto my-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div>
              <h1 className="text-[28px] font-semibold tracking-tight text-white leading-tight">
                Set up your workspace
              </h1>
              <p className="text-sm text-[#8B93A6] mt-1.5">
                Three fields. No credit card. You're building in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 w-full">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-[#232936] bg-[#12161F] hover:border-[#333B4A] hover:bg-[#161B26] text-xs font-medium text-[#C7CCD9] transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5 shrink-0" />
                GitHub
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-[#232936] bg-[#12161F] hover:border-[#333B4A] hover:bg-[#161B26] text-xs font-medium text-[#C7CCD9] transition-colors"
              >
                <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                Google
              </button>
            </div>

            <div className="flex items-center gap-3 w-full">
              <div className="h-px flex-1 bg-[#1D222E]" />
              <span className="text-[10px] tracking-wide text-[#4B5262]">or continue with email</span>
              <div className="h-px flex-1 bg-[#1D222E]" />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 w-full">
              <Field
                label="Full name"
                icon={<User className="w-4 h-4" />}
                type="text"
                placeholder="Alex Chen"
                value={fullName}
                onChange={setFullName}
              />
              <Field
                label="Work email"
                icon={<AtSign className="w-4 h-4" />}
                type="email"
                placeholder="alex@company.dev"
                value={email}
                onChange={setEmail}
              />
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-medium text-[#8B93A6]">Password</label>
                <div className="relative flex items-center w-full">
                  <Lock className="w-4 h-4 absolute left-3 text-[#4B5262] pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="At least 8 characters"
                    className="w-full pl-9 pr-10 bg-[#12161F] border border-[#232936] text-sm rounded-lg h-11 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/20 transition-colors text-white placeholder:text-[#4B5262]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 text-[#4B5262] hover:text-[#C7CCD9]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-[#333B4A] bg-[#12161F] text-amber-400 focus:ring-amber-400/40 cursor-pointer"
                />
                <span className="text-xs text-[#6B7280]">
                  I agree to the <span className="text-[#C7CCD9]">Terms</span> and{" "}
                  <span className="text-[#C7CCD9]">Privacy Policy</span>
                </span>
              </label>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading || isSuccess}
                className="mt-2 w-full py-3 px-4 rounded-lg bg-amber-400 text-[#0B0E14] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-amber-300 transition-colors disabled:opacity-80"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-4 h-4 border-2 border-[#0B0E14] border-t-transparent rounded-full animate-spin"
                    />
                  ) : isSuccess ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Account created
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      Create account
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>

        <div className="text-xs text-[#4B5262] flex items-center gap-2 w-full">
          <ShieldCheck className="w-4 h-4 text-[#333B4A] shrink-0" />
          256-bit TLS · SOC 2 Type II
        </div>
      </div>

      {/* Right: Live editor panel */}
      <div className="hidden lg:flex w-[54%] bg-[#0D1017] border-l border-[#181D28] p-14 flex-col justify-center relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-amber-400/[0.05] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[28rem] mx-auto w-full relative z-10">
          <p className="text-sm text-[#6B7280] mb-6 leading-relaxed">
            Your first deploy is one commit away. Here's what a new workspace
            looks like the moment you sign up.
          </p>

          <div className="rounded-xl border border-[#1D222E] bg-[#0F131C] overflow-hidden shadow-2xl shadow-black/40">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#1D222E] bg-[#12161F]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3A2A1A]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2A3020]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1A2A24]" />
              <span className="ml-3 text-[11px] font-mono text-[#4B5262]">
                workspace.yml
              </span>
            </div>
            <div className="p-5 font-mono text-[13px] leading-[1.9]">
              <CodeLine n={1} k="name" v={`"${userLine.toLowerCase().replace(/\s+/g, "-") || "your-name"}"`} />
              <CodeLine n={2} k="owner" v={`"${emailLine}"`} />
              <CodeLine n={3} k="runtime" v='"node@22"' />
              <CodeLine n={4} k="region" v='"ap-south-1"' />
              <div className="flex gap-4 mt-1">
                <span className="text-[#333B4A] w-4 text-right select-none">5</span>
                <span className="text-[#8B93A6]">plugins:</span>
              </div>
              <div className="flex gap-4">
                <span className="text-[#333B4A] w-4 text-right select-none">6</span>
                <span className="text-[#C7CCD9]">
                  {"  - "}<span className="text-amber-400">git-sync</span>
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-[#333B4A] w-4 text-right select-none">7</span>
                <span className="text-[#C7CCD9]">
                  {"  - "}<span className="text-amber-400">hot-reload</span>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between px-5 py-3 border-t border-[#1D222E] bg-[#0C0F16]">
              <span className="flex items-center gap-2 text-[11px] text-[#6B7280]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                sandbox provisioned in 340ms
              </span>
              <span className="text-[11px] font-mono text-[#4B5262]">main</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <Stat value="12ms" label="p50 latency" />
            <Stat value="99.98%" label="uptime, 90d" />
            <Stat value="41k" label="builds today" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, type, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-medium text-[#8B93A6]">{label}</label>
      <div className="relative flex items-center w-full">
        <span className="absolute left-3 text-[#4B5262] pointer-events-none">{icon}</span>
        <input
          type={type}
          required
          placeholder={placeholder}
          className="w-full pl-9 pr-3 bg-[#12161F] border border-[#232936] text-sm rounded-lg h-11 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/20 transition-colors text-white placeholder:text-[#4B5262]"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

function CodeLine({ n, k, v }) {
  return (
    <div className="flex gap-4">
      <span className="text-[#333B4A] w-4 text-right select-none">{n}</span>
      <span className="text-[#8B93A6]">
        {k}: <span className="text-emerald-300">{v}</span>
      </span>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-lg border border-[#1D222E] bg-[#0F131C] px-3 py-3">
      <div className="text-base font-semibold text-white font-mono">{value}</div>
      <div className="text-[10px] text-[#6B7280] mt-0.5">{label}</div>
    </div>
  );
}

function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function GoogleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" fill="#4285F4" />
      <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853" />
      <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05" />
      <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335" />
    </svg>
  );
}