import { Compass, Menu } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="glass-panel mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 sm:px-5">
        <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight text-white">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-indigo-500 text-slate-950 shadow-lg shadow-indigo-500/30"><Compass size={19} strokeWidth={2.5} /></span>
          <span>Travel<span className="text-cyan-300">AI</span></span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <a href="#discover" className="transition hover:text-white">Discover</a>
          <a href="#how-it-works" className="transition hover:text-white">How it works</a>
          <Link to="/login" className="transition hover:text-white">Sign in</Link>
          <Link to="/register" className="rounded-xl bg-white px-4 py-2 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-cyan-100">Create account</Link>
        </div>
        <Link to="/register" className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-900 md:hidden"><Menu size={18} /></Link>
      </nav>
    </header>
  );
}

export default Navbar;
