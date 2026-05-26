import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { formatINR } from '@/utils/formatter';

export default function StatCard({ title, amount, trend, icon, variant = "default" }) {
    // Advanced Theme Configuration
    const themes = {
        success: {
            container: "hover:border-emerald-200 hover:shadow-emerald-500/10",
            iconBg: "bg-emerald-500 text-white shadow-emerald-200",
            trend: "text-emerald-600 bg-emerald-50 border-emerald-100",
            accent: "bg-emerald-500",
            glow: "from-emerald-500/20 to-transparent"
        },
        danger: {
            container: "hover:border-rose-200 hover:shadow-rose-500/10",
            iconBg: "bg-rose-500 text-white shadow-rose-200",
            trend: "text-rose-600 bg-rose-50 border-rose-100",
            accent: "bg-rose-500",
            glow: "from-rose-500/20 to-transparent"
        },
        default: {
            container: "hover:border-blue-200 hover:shadow-blue-500/10",
            iconBg: "bg-blue-600 text-white shadow-blue-200",
            trend: "text-blue-600 bg-blue-50 border-blue-100",
            accent: "bg-blue-600",
            glow: "from-blue-600/20 to-transparent"
        }
    };

    const theme = themes[variant] || themes.default;
    const isPositive = !trend.includes('-');

    return (
        <div className={`group relative bg-white rounded-[2.5rem] p-7 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:shadow-2xl ${theme.container} overflow-hidden`}>

            {/* 1. Dynamic Background Glow */}
            <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full bg-linear-to-br opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 ${theme.glow}`} />

            {/* 2. Top Section: Icon & Trend */}
            <div className="relative z-10 flex justify-between items-start mb-8">
                {/* Icon with "Lift" effect */}
                <div className={`relative p-4 rounded-2xl shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${theme.iconBg}`}>
                    <div className="relative z-10">{icon}</div>
                    {/* Shadow "Pulse" under icon */}
                    <div className="absolute inset-0 rounded-2xl bg-current opacity-20 blur-md animate-pulse" />
                </div>

                {/* Refined Trend Badge */}
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black tracking-tighter border ${theme.trend}`}>
                    {isPositive ? <TrendingUp size={14} strokeWidth={3} /> : <TrendingDown size={14} strokeWidth={3} />}
                    {trend}
                </div>
            </div>

            {/* 3. Content Section */}
            <div className="relative z-10">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 px-1">
                    {title}
                </p>
                <div className="flex items-end justify-between">
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter tabular-nums">
                        {formatINR(amount)}
                    </h3>

                    {/* Subtle Context Action */}
                    <button className="mb-1.5 p-2 rounded-full bg-slate-50 text-slate-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
                        <ArrowUpRight size={18} />
                    </button>
                </div>
            </div>

            {/* 4. Bottom Interaction Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-50 overflow-hidden">
                <div
                    className={`h-full transition-all duration-1000 ease-out group-hover:opacity-100 opacity-30 ${theme.accent}`}
                    style={{ width: isPositive ? '75%' : '40%' }}
                />
            </div>

            {/* 5. "Shine" Overlay (Shows on Hover) */}
            <div className="absolute inset-0 pointer-events-none bg-linear-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
        </div>
    );
}