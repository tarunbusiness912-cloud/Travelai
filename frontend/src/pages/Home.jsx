import { ArrowRight, CalendarDays, Compass, MapPin, Sparkles, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Sparkles, title: "AI trip design", text: "Shape a thoughtful itinerary from a simple idea." },
  { icon: WalletCards, title: "Shared budgets", text: "Keep every payment and plan delightfully clear." },
  { icon: CalendarDays, title: "One calm timeline", text: "Flights, stays and experiences, beautifully together." },
];

function Home() {
  return (
    <div className="relative overflow-hidden bg-[#070b1a] pt-24 text-white">
      <div className="ambient-orb absolute -left-32 top-16 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="ambient-orb absolute -right-24 top-32 h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/15 blur-3xl [animation-delay:-3s]" />
      <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pt-24">
        <section className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="animate-rise">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-white/7 px-3 py-1.5 text-xs font-medium text-cyan-100 backdrop-blur"><Sparkles size={14} /> The intelligent way to wander</div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.03] tracking-[-.055em] sm:text-7xl"><span className="gradient-text">Travel beyond</span><br />the ordinary plan.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">A private travel workspace for bright ideas, meaningful itineraries, and trips that feel as good to plan as they do to live.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/register" className="group inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3.5 font-semibold text-slate-950 transition duration-200 hover:-translate-y-1 hover:bg-cyan-100">Start planning free <ArrowRight size={18} className="transition group-hover:translate-x-1" /></Link>
              <a href="#discover" className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 font-semibold text-white transition hover:bg-white/10">Explore the experience</a>
            </div>
            <div className="mt-10 flex items-center gap-3 text-sm text-slate-400"><div className="flex -space-x-2"><span className="h-7 w-7 rounded-full border-2 border-[#10172f] bg-cyan-300" /><span className="h-7 w-7 rounded-full border-2 border-[#10172f] bg-violet-400" /><span className="h-7 w-7 rounded-full border-2 border-[#10172f] bg-amber-300" /></div> Built for your next unforgettable escape</div>
          </div>
          <div className="animate-rise-delay relative mx-auto w-full max-w-md">
            <div className="glass-panel relative overflow-hidden rounded-[2rem] p-4 shadow-2xl shadow-indigo-950/70">
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-cyan-300/35 via-indigo-500/20 to-fuchsia-400/25" />
              <div className="relative overflow-hidden rounded-[1.45rem] bg-[#111932] p-5">
                <div className="flex items-center justify-between"><span className="rounded-full bg-white/10 px-3 py-1 text-xs text-cyan-100">Curated escape</span><span className="text-xs text-slate-400">12–19 Oct</span></div>
                <div className="mt-10"><p className="text-sm text-cyan-200">Your next chapter</p><h2 className="mt-1 text-4xl font-semibold tracking-tight">Kyoto, Japan</h2><p className="mt-2 text-sm text-slate-400">Seven days of temples, slow mornings, and autumn color.</p></div>
                <div className="mt-8 grid grid-cols-3 gap-2"><div className="rounded-2xl bg-white/8 p-3"><MapPin size={16} className="text-cyan-300" /><p className="mt-3 text-xs text-slate-400">Stops</p><p className="font-semibold">14</p></div><div className="rounded-2xl bg-white/8 p-3"><CalendarDays size={16} className="text-fuchsia-300" /><p className="mt-3 text-xs text-slate-400">Days</p><p className="font-semibold">7</p></div><div className="rounded-2xl bg-white/8 p-3"><Compass size={16} className="text-amber-200" /><p className="mt-3 text-xs text-slate-400">Mood</p><p className="font-semibold">Slow</p></div></div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-8 glass-panel rounded-2xl px-4 py-3 text-sm text-slate-100"><span className="mr-2 text-cyan-300">✦</span> Itinerary ready to explore</div>
          </div>
        </section>

        <section id="discover" className="mt-28 scroll-mt-24">
          <div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-sm font-medium text-cyan-300">BUILT FOR THE WHOLE JOURNEY</p><h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Less logistics. More anticipation.</h2></div><p className="hidden max-w-xs text-sm leading-6 text-slate-400 sm:block">A calm, capable space that turns inspiration into a plan you can trust.</p></div>
          <div className="grid gap-4 md:grid-cols-3">{features.map(({ icon: Icon, title, text }) => <article key={title} className="glass-panel rounded-3xl p-6 transition duration-200 hover:-translate-y-1 hover:bg-white/10"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-indigo-500 text-slate-950"><Icon size={20} /></div><h3 className="mt-7 text-xl font-semibold">{title}</h3><p className="mt-2 leading-6 text-slate-400">{text}</p></article>)}</div>
        </section>
        <section id="how-it-works" className="mt-24 rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/10 p-8 text-center sm:p-14"><p className="text-sm font-medium text-cyan-200">START WHERE YOU ARE</p><h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">Every extraordinary trip starts with one beautiful idea.</h2><Link to="/register" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-100">Create your workspace <ArrowRight size={17} /></Link></section>
      </main>
    </div>
  );
}

export default Home;
