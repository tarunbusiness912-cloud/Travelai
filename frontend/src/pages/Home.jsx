import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Compass,
  IndianRupee,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrainFront,
  Users,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router-dom";

const destinationImage =
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80";

const routes = [
  "Delhi to Agra weekend",
  "Mumbai to Goa beach break",
  "Bengaluru to Coorg hills",
  "Jaipur to Udaipur culture trip",
];

const benefits = [
  {
    icon: Sparkles,
    title: "AI plans for Indian routes",
    text: "Create day-wise ideas for beaches, hills, temples, forts, food streets, and city breaks inside India.",
  },
  {
    icon: WalletCards,
    title: "Budget clarity in rupees",
    text: "Plan stays, food, transport, activities, and shared costs without losing track of who paid what.",
  },
  {
    icon: Users,
    title: "Easy group coordination",
    text: "Keep friends and family on the same page with trips, groups, expenses, and wishlisted places.",
  },
];

const steps = [
  "Choose an Indian destination and trip dates.",
  "Add your budget, group members, and must-visit places.",
  "Use the dashboard to manage itinerary, expenses, wishlist, and planner.",
];

function Home() {
  return (
    <div className="bg-stone-50 text-slate-950">
      <section className="relative min-h-[92vh] overflow-hidden bg-slate-950 text-white">
        <img
          src={destinationImage}
          alt="Taj Mahal in Agra, India"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/65" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-5 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-100 backdrop-blur">
              <MapPin size={14} />
              Made only for India trips
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-normal sm:text-6xl lg:text-7xl">
              Plan smarter trips across India.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-100 sm:text-lg">
              TravelAI helps Indian travellers build domestic itineraries, track budgets in rupees, split group expenses, and keep every trip detail in one calm dashboard.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-black/20 transition hover:bg-amber-200"
              >
                Start planning
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur md:grid-cols-4">
            {routes.map((route) => (
              <div key={route} className="flex items-center gap-2 rounded-xl bg-slate-950/35 px-3 py-3 text-sm font-bold text-slate-100">
                <Compass size={16} className="text-amber-200" />
                {route}
              </div>
            ))}
          </div>
        </div>
      </section>

      <main>
        <section className="mx-auto grid max-w-6xl gap-4 px-5 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <Icon size={21} />
              </div>
              <h2 className="mt-5 text-xl font-black text-slate-950">{title}</h2>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-emerald-700">Why it helps</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
                One workspace for the full Indian travel plan.
              </h2>
              <p className="mt-5 text-base font-medium leading-8 text-slate-600">
                Use it for short family trips, college friend getaways, office outings, pilgrimages, hill station breaks, and city tours. Your dashboard keeps the real work together: itinerary, budget, wishlist, groups, and expenses.
              </p>
              <div className="mt-7 grid gap-3">
                <div className="flex items-start gap-3">
                  <IndianRupee className="mt-1 h-5 w-5 text-emerald-700" />
                  <p className="font-bold text-slate-800">Track hotels, food, tickets, fuel, trains, cabs, and activity costs.</p>
                </div>
                <div className="flex items-start gap-3">
                  <TrainFront className="mt-1 h-5 w-5 text-emerald-700" />
                  <p className="font-bold text-slate-800">Organize plans around Indian travel habits and domestic destinations.</p>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 text-emerald-700" />
                  <p className="font-bold text-slate-800">Login stays active after reloads, so mobile users can return without losing access.</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-stone-50 p-5">
              <div className="rounded-lg bg-slate-950 p-5 text-white">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-amber-200">Sample trip</p>
                    <h3 className="mt-1 text-2xl font-black">Jaipur family weekend</h3>
                  </div>
                  <CalendarDays className="h-8 w-8 text-amber-200" />
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg bg-white/10 p-4">
                    <p className="text-xs font-bold text-slate-300">Budget</p>
                    <p className="mt-2 text-xl font-black">Rs. 28,000</p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4">
                    <p className="text-xs font-bold text-slate-300">People</p>
                    <p className="mt-2 text-xl font-black">5</p>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4">
                    <p className="text-xs font-bold text-slate-300">Days</p>
                    <p className="mt-2 text-xl font-black">3</p>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {["Amber Fort and old city plan", "Food and cab expenses split", "Wishlist saved for next Rajasthan trip"].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-lg bg-white/8 px-4 py-3 text-sm font-bold">
                      <CheckCircle2 size={18} className="text-emerald-300" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-emerald-700">How it works</p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
                From idea to dashboard in minutes.
              </h2>
            </div>
            <div className="grid gap-4">
              {steps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-base font-bold leading-7 text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
