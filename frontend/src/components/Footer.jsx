import { Compass } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070b1a] px-6 py-8 text-sm text-slate-500">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 font-semibold text-slate-300"><Compass size={16} className="text-cyan-300" /> TravelAI</div>
        <p>Plan beautifully. Travel freely.</p>
      </div>
    </footer>
  );
}

export default Footer;
