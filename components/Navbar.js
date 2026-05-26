import { Wallet, ShieldCheck, Eye, User } from 'lucide-react';

export default function Navbar({ role, setRole, userName }) {
    return (
        <nav className="sticky top-0 z-100 w-full px-4 md:px-8 py-4 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* 1. Brand Section */}
                <div className="flex items-center gap-2 md:gap-3 group cursor-pointer shrink-0">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-600 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative bg-linear-to-br from-blue-500 to-blue-700 p-2 md:p-2.5 rounded-xl md:rounded-2xl text-white shadow-lg shadow-blue-100 group-hover:scale-105 transition-transform duration-300">
                            <Wallet size={20} className="md:w-5.5 md:h-5.5" strokeWidth={2.5} />
                        </div>
                    </div>
                    {/* Hide text description on very small screens, show name on 'sm' and up */}
                    <div className="flex flex-col leading-tight">
                        <span className="text-slate-900 text-base md:text-lg font-black tracking-tight">Vault.ai</span>
                        <span className="text-[9px] md:text-[10px] font-bold text-blue-500 uppercase tracking-widest hidden sm:block">Finance Hub</span>
                    </div>
                </div>

                {/* 2. Actions Section */}
                <div className="flex items-center gap-2 md:gap-4">

                    {/* Desktop Role Switcher - Hidden on mobile/tablet */}
                    <div className="hidden lg:flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200/50">
                        <button
                            onClick={() => setRole('Admin')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${role === 'Admin'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <ShieldCheck size={14} />
                            Admin
                        </button>
                        <button
                            onClick={() => setRole('Viewer')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${role === 'Viewer'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <Eye size={14} />
                            Viewer
                        </button>
                    </div>

                    {/* Mobile/Tablet Role Switcher (Compact Dropdown) - Shows on md and down */}
                    <div className="lg:hidden relative">
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="bg-slate-100 text-[10px] md:text-xs font-bold pl-3 pr-8 py-2 rounded-xl outline-none border border-slate-200/50 appearance-none cursor-pointer text-slate-700"
                        >
                            <option value="Admin">Admin</option>
                            <option value="Viewer">Viewer</option>
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            {role === 'Admin' ? <ShieldCheck size={12} /> : <Eye size={12} />}
                        </div>
                    </div>

                    {/* Divider - Hidden on smallest screens */}
                    <div className="h-8 w-px bg-slate-200 mx-1 md:mx-2 hidden sm:block" />

                    {/* User Profile Section */}
                    <div className="flex items-center gap-2 md:gap-3 sm:pl-2">
                        {/* Hide user info text on mobile, show only on large screens */}
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-xs font-black text-slate-900 truncate max-w-25">{userName || 'Guest'}</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Pro Member</span>
                        </div>

                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-linear-to-tr from-slate-100 to-slate-200 border border-white shadow-inner flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors cursor-pointer group">
                            <User size={18} className="group-hover:scale-110 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}