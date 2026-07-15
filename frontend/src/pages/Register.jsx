import { useEffect, useState } from "react";
import { ArrowRight, Check, Compass, Eye, EyeOff, ShieldCheck, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!authLoading && user) navigate("/dashboard", { replace: true });
  }, [authLoading, navigate, user]);

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await registerUser(email, password);
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data.session) {
      navigate("/dashboard", { replace: true });
      return;
    }

    setMessage("Your account is ready. Check your email to confirm it, then you’ll be redirected to sign in.");
    window.setTimeout(() => navigate("/login", { replace: true }), 3500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070b1a] px-5 py-8 text-white sm:p-10">
      <div className="ambient-orb absolute -left-28 top-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="ambient-orb absolute -right-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/15 blur-3xl [animation-delay:-4s]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.035] shadow-2xl shadow-black/30 lg:grid-cols-[.9fr_1.1fr]">
        <aside className="hidden flex-col justify-between bg-gradient-to-br from-indigo-500/25 via-[#111a3a] to-cyan-500/15 p-10 lg:flex">
          <Link to="/" className="flex items-center gap-2 font-semibold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300 text-slate-950"><Compass size={19} /></span>TravelAI</Link>
          <div><div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-cyan-200"><Sparkles size={23} /></div><h1 className="text-4xl font-semibold leading-tight tracking-tight">Make room for the journeys that matter.</h1><p className="mt-5 max-w-sm leading-7 text-slate-300">One elegant workspace for inspiration, itineraries, and every shared decision.</p></div>
          <div className="space-y-3 text-sm text-slate-300">{["Beautifully organized travel plans", "Private and secure by default", "Start planning in under a minute"].map((item) => <div key={item} className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-cyan-300/15 text-cyan-200"><Check size={14} /></span>{item}</div>)}</div>
        </aside>
        <main className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md animate-rise">
            <Link to="/" className="mb-12 flex items-center gap-2 font-semibold lg:hidden"><span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300 text-slate-950"><Compass size={19} /></span>TravelAI</Link>
            <div className="mb-8"><p className="text-sm font-medium text-cyan-300">CREATE YOUR SPACE</p><h2 className="mt-2 text-4xl font-semibold tracking-tight">Start your next story.</h2><p className="mt-3 text-slate-400">A calm place to turn travel dreams into real plans.</p></div>
            <form onSubmit={handleRegister} className="space-y-5">
              <label className="block text-sm font-medium text-slate-200">Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.06] px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10" /></label>
              <label className="block text-sm font-medium text-slate-200">Password<div className="relative mt-2"><input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" minLength="6" required className="w-full rounded-xl border border-white/10 bg-white/[.06] px-4 py-3.5 pr-12 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-4 text-slate-400 transition hover:text-white" aria-label="Toggle password visibility">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>
              {message && <p className={`rounded-xl border px-4 py-3 text-sm ${message.includes("ready") ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-100" : "border-red-300/20 bg-red-300/10 text-red-100"}`}>{message}</p>}
              <button disabled={loading} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3.5 font-semibold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Creating your workspace..." : <>Create my workspace <ArrowRight size={18} className="transition group-hover:translate-x-1" /></>}</button>
            </form>
            <div className="mt-7 flex items-center gap-2 text-sm text-slate-400"><ShieldCheck size={16} className="text-cyan-300" /> Your travel plans stay private and secure.</div>
            <p className="mt-8 text-center text-sm text-slate-400">Already have an account? <Link to="/login" className="font-semibold text-cyan-300 hover:text-cyan-100">Sign in</Link></p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Register;
