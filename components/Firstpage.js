import React, { useState } from 'react';
import { Wallet, ArrowRight, Shield, Zap, BarChart3 } from 'lucide-react';

export default function Firstpage({ onSave }) {
  const [input, setInput] = useState('');

  return (
    <div className="fixed inset-0 z-300 bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      
      {/* 1. Background Decoration (Ambient Orbs) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/10 blur-[120px] rounded-full" />

      <div className="max-w-2xl w-full grid lg:grid-cols-2 bg-white rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-white relative overflow-hidden transition-all duration-500">
        
        {/* Left Side: Branding & Features (Hidden on small mobile) */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 text-white">
          <div>
            <div className="flex items-center gap-2 mb-12">
              <div className="bg-blue-500 p-2 rounded-xl">
                <Wallet size={24} />
              </div>
              <span className="text-xl font-black tracking-tighter">Vault.ai</span>
            </div>
            
            <h2 className="text-3xl font-bold leading-tight mb-6">
              Take control of your <span className="text-blue-400">financial future</span>.
            </h2>

            <div className="space-y-6">
              {[
                { icon: <Shield size={18} />, text: "Bank-grade local security" },
                { icon: <Zap size={18} />, text: "Real-time spending insights" },
                { icon: <BarChart3 size={18} />, text: "Advanced trend analytics" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-slate-400">
                  <div className="p-2 bg-white/5 rounded-lg text-blue-400">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">
            v2.0 • Secured by LocalStorage
          </p>
        </div>

        {/* Right Side: Input Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="lg:hidden flex justify-center mb-8">
            <div className="bg-blue-600 p-4 rounded-4xl text-white shadow-xl shadow-blue-200">
              <Wallet size={32} />
            </div>
          </div>

          <div className="text-center lg:text-left mb-10">
            <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Set up your profile</h1>
            <p className="text-slate-500 font-medium leading-relaxed">
              Welcome! Please enter your name to personalize your experience.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black text-blue-600 uppercase tracking-widest z-10">
                Display Name
              </label>
              <input 
                autoFocus
                type="text" 
                placeholder="e.g. Rohan"
                className="w-full px-6 py-5 text-black bg-white border-2 border-slate-100 focus:border-blue-500 rounded-2xl outline-none font-bold text-lg transition-all shadow-sm group-hover:border-slate-200"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && input && onSave(input)}
              />
            </div>
            
            <button 
              disabled={!input}
              onClick={() => onSave(input)}
              className="w-full bg-slate-900 hover:bg-blue-600 disabled:bg-slate-100 disabled:text-slate-400 text-white py-5 rounded-3xl font-black flex items-center justify-center gap-3 transition-all duration-300 group shadow-xl shadow-slate-200/50 hover:shadow-blue-200/50 active:scale-[0.98] cursor-pointer"
            >
              Start Your Journey 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              No sign-up required • 100% Private
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}