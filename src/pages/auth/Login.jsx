import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AtSign,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Cloud,
  ShieldCheck as PasskeyIcon,
  Flame,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { api } from "../../lib/api";
import { hydrateFromServer } from "../../lib/userStore";

const commits = [
  { day: "Mon", value: 4, h: "h-3" },
  { day: "Tue", value: 7, h: "h-4" },
  { day: "Wed", value: 9, h: "h-5" },
  { day: "Thu", value: 6, h: "h-3.5" },
  { day: "Fri", value: 12, h: "h-6" },
  { day: "Sat", value: 7, h: "h-4" },
  { day: "Sun", value: 11, h: "h-5" },
];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await api.post("/auth/login", { email, password });
      if (data?.token) {
        localStorage.setItem("devsphere_token", data.token);
        await hydrateFromServer();
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 600);
      } else {
        throw new Error("Login failed, no token received");
      }
    } catch (err) {
      setIsLoading(false);
      setError(err?.data?.error || err?.message || "Invalid email or password");
    }
  }

  function fillDemo() {
    setEmail("demo@devsphere.com");
    setPassword("password123");
    setError("");
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f8f7ff] via-[#f0ecff] to-[#fcebf9] text-[#131b2e] flex flex-col relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Background Animated Vibrant Soft Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.4, 0.7, 0.4],
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-[30rem] h-[30rem] rounded-full bg-indigo-300/40 blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, -50, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] rounded-full bg-pink-300/35 blur-[120px] pointer-events-none"
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/70 backdrop-blur-xl border-b border-indigo-100/60 shadow-sm">
        <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#4338ca] to-[#6366f1] flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#131b2e]">
              Devsphere
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs text-indigo-900 font-medium shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full pt-28 pb-16 flex items-center justify-center px-4 sm:px-6 z-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Modern Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-6 relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-2xl border border-white shadow-xl shadow-indigo-950/5 p-6 sm:p-10 flex flex-col justify-between"
          >
            <div className="relative z-10 flex flex-col gap-6">
              
              {/* Header Title */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
                    v2.4.8-rc Secure Workspace
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#131b2e]">
                  Welcome back
                </h1>
                <p className="text-sm text-[#5c657a]">
                  Sign in to access your developer command center and team pipelines.
                </p>
              </div>

              {/* OAuth Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#f8f9fc" }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white border border-slate-200/80 text-sm font-semibold text-slate-700 shadow-2xs transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-slate-900" />
                  <span>GitHub</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#f8f9fc" }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white border border-slate-200/80 text-sm font-semibold text-slate-700 shadow-2xs transition-colors"
                >
                  <GoogleIcon className="w-4 h-4" />
                  <span>Google</span>
                </motion.button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-1">
                <div className="w-full h-px bg-slate-200" />
                <span className="absolute bg-white px-3 text-[11px] uppercase tracking-wider font-medium text-slate-400">
                  Or continue with email
                </span>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form Input Fields */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <Label htmlFor="email" className="font-semibold text-slate-700">Work Email</Label>
                    <button
                      type="button"
                      onClick={fillDemo}
                      className="text-indigo-600 font-semibold hover:underline cursor-pointer"
                    >
                      Use Demo Account
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <AtSign className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="alex@company.dev"
                      className="pl-10 bg-slate-50/60 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-600 transition-all rounded-xl h-11"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <Label htmlFor="password" className="font-semibold text-slate-700">Password</Label>
                    <span className="text-slate-400 text-[11px]">min 6 chars</span>
                  </div>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••••••"
                      className="pl-10 pr-10 bg-slate-50/60 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-600 transition-all rounded-xl h-11"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <Checkbox checked={remember} onCheckedChange={setRemember} className="border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
                    <span className="text-xs font-medium text-slate-600">Remember device</span>
                  </label>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-100 text-xs font-medium">
                    <PasskeyIcon className="w-3.5 h-3.5" />
                    <span>Passkey Ready</span>
                  </div>
                </div>

                {/* Animated Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="mt-2 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#4338ca] to-[#6366f1] text-white font-semibold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all hover:shadow-indigo-500/40 cursor-pointer disabled:opacity-70"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : isSuccess ? (
                    <div className="flex items-center gap-2 text-emerald-100">
                      <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                      <span>Workspace Loaded!</span>
                    </div>
                  ) : (
                    <>
                      <span>Sign In to Workspace</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="text-center pt-2">
                <span className="text-sm text-slate-600">Don't have an account?</span>
                <Link to="/register" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 ml-1">
                  Deploy a workspace
                </Link>
              </div>
            </div>

            {/* Trust Footer */}
            <div className="pt-8 mt-6 border-t border-slate-100 flex items-center justify-center gap-3 text-slate-500 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>256-bit TLS</span>
              <span>•</span>
              <span>SOC2 Type II Certified</span>
            </div>
          </motion.div>

          {/* Right Side: Interactive Light Dashboard / Code & Streak Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col gap-4 bg-white/60 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-xl shadow-indigo-950/5 p-6 sm:p-8"
          >
            {/* Live Count Badge */}
            <div className="flex items-center justify-between bg-white border border-indigo-100/80 p-4 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-600" />
                </span>
                <span className="font-bold text-[#131b2e] tracking-wide">10,482</span>
                <span className="text-sm font-medium text-slate-600">engineers coding live</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100 font-semibold">
                <Cloud className="w-3.5 h-3.5" />
                <span>us-east-1</span>
              </div>
            </div>

            {/* Light Code Editor Preview Card */}
            <div className="bg-[#1e1b4b] rounded-2xl border border-indigo-950/10 overflow-hidden shadow-md">
              <div className="flex items-center justify-between px-4 py-3 bg-[#2e2a6b] border-b border-indigo-900/40">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-indigo-200">workspace.streak.ts</span>
                </div>
                <span className="text-xs font-mono text-indigo-300">TypeScript 5.4</span>
              </div>
              <pre className="p-4 text-xs leading-relaxed overflow-x-auto text-indigo-100 font-mono">
{`export async function verifyStreak(devId: UUID) {
  const session = await Devsphere.fetchCluster(devId);
  return {
    currentStreak: 14, // Tier unlocked
    velocityScore: 0.984,
    nextTarget: "Emerald Tier (20 Days)"
  };
}`}
              </pre>
            </div>

            {/* Streak Progress Panel */}
            <div className="bg-white border border-indigo-100/80 p-5 rounded-2xl shadow-xs flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-100 text-orange-500">
                    <Flame className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <div className="font-bold text-[#131b2e]">14-Day Streak Active</div>
                    <div className="text-xs text-slate-500 font-medium">6 days to Emerald Milestone Tier</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Velocity</div>
                  <div className="text-lg font-bold text-indigo-600">98.4%</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex flex-col gap-1.5">
                <div className="w-full bg-indigo-50 h-2.5 rounded-full overflow-hidden border border-indigo-100/50">
                  <motion.div
                    className="bg-gradient-to-r from-indigo-600 to-violet-600 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-medium text-slate-500">
                  <span>Day 1</span>
                  <span className="text-indigo-600 font-bold">Day 14</span>
                  <span>Day 20</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </main>
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