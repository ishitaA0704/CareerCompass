import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Compass,
  FileText,
  Gauge,
  GitBranch,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  Moon,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { useState } from "react";

type Role = "candidate" | "recruiter";

type AppShellProps = {
  role: Role;
  onRoleChange: (role: Role) => void;
  children: React.ReactNode;
};

const candidateNav = [
  { href: "/candidate/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/candidate/ranking", label: "Cohort standing", icon: Trophy },
  { href: "/candidate/gaps", label: "Skill gaps", icon: BarChart3 },
  { href: "/candidate/roadmap", label: "My roadmap", icon: GitBranch },
  { href: "/candidate/interview", label: "Mock interview", icon: MessageSquareText },
];

const recruiterNav = [
  { href: "/recruiter/dashboard", label: "Pipeline overview", icon: LayoutDashboard },
  { href: "/recruiter/ranking", label: "Candidate ranking", icon: Trophy },
  { href: "/recruiter/fairness", label: "Fairness audit", icon: ShieldCheck },
];

export default function AppShell({ role, onRoleChange, children }: AppShellProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = role === "candidate" ? candidateNav : recruiterNav;

  const switchRole = (nextRole: Role) => {
    onRoleChange(nextRole);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[252px] flex-col border-r border-white/[0.07] bg-[#0D121F]/95 px-4 py-5 backdrop-blur-xl transition-transform duration-200 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-8 flex items-center justify-between px-2">
          <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"><Compass size={19} strokeWidth={2.5} /></span>
            <span>
              <span className="block font-display text-[15px] font-semibold tracking-tight">CareerCompass</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-300">AI / Intelligence</span>
            </span>
          </Link>
          <button aria-label="Close navigation" className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white lg:hidden" onClick={() => setMobileOpen(false)}><X size={17} /></button>
        </div>

        <div className="mb-5 rounded-2xl border border-indigo-400/15 bg-indigo-500/[0.08] p-3">
          <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-200/70"><span>Workspace</span><Sparkles size={13} className="text-indigo-300" /></div>
          <div className="flex items-center gap-2.5">
            <div className={`grid h-8 w-8 place-items-center rounded-lg text-xs font-bold ${role === "candidate" ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300"}`}>{role === "candidate" ? "A" : "S"}</div>
            <div className="min-w-0"><p className="truncate text-sm font-medium">{role === "candidate" ? "Alex Morgan" : "Sam Rivera"}</p><p className="truncate text-xs text-slate-500">{role === "candidate" ? "Candidate workspace" : "Recruiting team"}</p></div>
          </div>
        </div>

        <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">{role === "candidate" ? "Candidate workspace" : "Recruiter workspace"}</div>
        <nav className="space-y-1">
          {nav.map((item) => {
            const active = location === item.href;
            const Icon = item.icon;
            return <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${active ? "bg-indigo-500/15 font-medium text-indigo-200" : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-100"}`}><Icon size={17} className={active ? "text-indigo-300" : "text-slate-600 group-hover:text-slate-300"} /><span>{item.label}</span>{active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-300" />}</Link>;
          })}
        </nav>

        <div className="mt-auto space-y-1">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-200"><Bell size={17} />Notifications<span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-amber-400/15 px-1 text-[10px] font-semibold text-amber-300">3</span></button>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-200"><Moon size={17} />Appearance<span className="ml-auto text-[10px] text-slate-600">Dark</span></button>
          <div className="mt-4 flex items-center gap-3 border-t border-white/[0.06] px-3 pt-4"><div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-indigo-400 to-violet-700 text-xs font-bold">{role === "candidate" ? "AM" : "SR"}</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-slate-200">{role === "candidate" ? "alex@candidate.com" : "sam@recruiter.com"}</p><p className="text-[10px] text-slate-600">Demo account</p></div><LogOut size={14} className="text-slate-600" /></div>
        </div>
      </aside>

      {mobileOpen && <button aria-label="Close menu overlay" className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <div className="lg:pl-[252px]">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-white/[0.06] bg-[#0B0F19]/80 px-5 backdrop-blur-xl lg:px-9">
          <div className="flex items-center gap-3"><button aria-label="Open navigation" className="rounded-xl border border-white/10 p-2 text-slate-300 lg:hidden" onClick={() => setMobileOpen(true)}><Menu size={18} /></button><div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex"><span>Workspace</span><span className="text-slate-700">/</span><span className="text-slate-300">{role === "candidate" ? "Candidate view" : "Recruiter view"}</span></div></div>
          <div className="flex items-center gap-3">
            <button className="hidden items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs text-slate-400 transition hover:border-white/15 hover:text-slate-200 sm:flex"><Search size={14} />Search<span className="ml-2 rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-slate-600">⌘ K</span></button>
            <div className="hidden h-6 w-px bg-white/10 sm:block" />
            <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] py-1 pl-1 pr-3"><div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-indigo-400 to-violet-700 text-[10px] font-bold">{role === "candidate" ? "AM" : "SR"}</div><span className="hidden text-xs font-medium text-slate-300 sm:inline">{role === "candidate" ? "Alex Morgan" : "Sam Rivera"}</span><ChevronDown size={13} className="text-slate-600" /></div>
          </div>
        </header>
        <div className="min-h-[calc(100vh-72px)]">{children}</div>
      </div>

      <div className="fixed bottom-5 right-5 z-30 hidden rounded-2xl border border-white/10 bg-[#151B2A] p-1.5 shadow-2xl shadow-black/40 md:block">
        <div className="flex items-center gap-1"><span className="px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">View as</span><button onClick={() => switchRole("candidate")} className={`rounded-xl px-3 py-2 text-xs font-medium transition ${role === "candidate" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:text-slate-200"}`}><UserRound size={13} className="mr-1.5 inline" />Candidate</button><button onClick={() => switchRole("recruiter")} className={`rounded-xl px-3 py-2 text-xs font-medium transition ${role === "recruiter" ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20" : "text-slate-500 hover:text-slate-200"}`}><UsersRound size={13} className="mr-1.5 inline" />Recruiter</button></div>
      </div>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />{eyebrow}</div><h1 className="font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p></div>{action}</div>;
}

export function StatCard({ label, value, change, icon: Icon, tone = "indigo" }: { label: string; value: string; change?: string; icon: React.ElementType; tone?: "indigo" | "emerald" | "amber" | "slate" }) {
  const tones = { indigo: "bg-indigo-400/10 text-indigo-300", emerald: "bg-emerald-400/10 text-emerald-300", amber: "bg-amber-400/10 text-amber-300", slate: "bg-slate-400/10 text-slate-300" };
  return <div className="rounded-2xl border border-white/[0.07] bg-[#111725] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.12)]"><div className="mb-5 flex items-start justify-between"><p className="text-xs font-medium text-slate-500">{label}</p><span className={`grid h-8 w-8 place-items-center rounded-xl ${tones[tone]}`}><Icon size={16} /></span></div><div className="flex items-end justify-between gap-3"><p className="font-display text-2xl font-semibold tracking-tight text-white">{value}</p>{change && <p className="mb-0.5 text-xs font-medium text-emerald-300">{change}</p>}</div></div>;
}

export function ProgressBar({ value, color = "indigo" }: { value: number; color?: "indigo" | "emerald" | "amber" }) {
  const colors = { indigo: "bg-indigo-400", emerald: "bg-emerald-400", amber: "bg-amber-400" };
  return <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]"><div className={`h-full rounded-full ${colors[color]} transition-all duration-500`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>;
}

export const IconMark = ({ type }: { type: "role" | "target" | "briefcase" }) => {
  const Icon = type === "role" ? Target : type === "briefcase" ? BriefcaseBusiness : FileText;
  return <Icon size={17} />;
};

export function ActionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300 transition hover:text-indigo-200">{children}<ArrowRight size={14} /></Link>;
}

export function SuccessPill({ children }: { children: React.ReactNode }) { return <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300"><CheckCircle2 size={12} />{children}</span>; }
export function AmberPill({ children }: { children: React.ReactNode }) { return <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-2.5 py-1 text-[11px] font-semibold text-amber-300">{children}</span>; }
export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) { return <section className={`rounded-2xl border border-white/[0.07] bg-[#111725] shadow-[0_10px_40px_rgba(0,0,0,0.12)] ${className}`}>{children}</section>; }
