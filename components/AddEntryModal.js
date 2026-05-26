import React from 'react';
import { X, IndianRupee, Tag, Type, Calendar } from 'lucide-react';

const AddEntryModal = ({ isOpen, isEditing, onClose, onSave, entry, setEntry }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-150 flex items-end sm:items-center justify-center p-0 sm:p-4 lg:p-6">
            {/* 1. Frosted Glass Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* 2. Elevated Modal Container */}
            <div className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-4 sm:zoom-in-95 duration-300 max-h-[95vh] sm:max-h-[90vh] flex flex-col">

                {/* Header with Close Button */}
                <div className="px-6 sm:px-8 pt-8 pb-4 flex justify-between items-start sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            {isEditing ? 'Edit Transaction' : 'New Entry'}
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">
                            {isEditing ? 'Update the details of this record.' : 'Track your latest financial move.'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Form Body */}
                <form onSubmit={onSave} className="p-6 sm:p-8 pt-2 space-y-5 overflow-y-auto">

                    {/* Amount Section (Hero) */}
                    <div className="bg-blue-50/50 p-5 rounded-3xl border border-blue-100/50 group focus-within:border-blue-500 transition-all">
                        <label className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">
                            <IndianRupee size={12} strokeWidth={3} /> Amount
                        </label>
                        <div className="flex items-baseline">
                            <span className="text-2xl font-black text-blue-300 mr-1">₹</span>
                            <input
                                type="number"
                                required
                                autoFocus
                                placeholder="0"
                                className="w-full bg-transparent text-4xl sm:text-5xl font-black text-blue-600 outline-none placeholder:text-blue-200 tabular-nums"
                                value={entry.amount}
                                onChange={(e) => setEntry({ ...entry, amount: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* Description Input */}
                        <div className="relative">
                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">
                                <Tag size={12} strokeWidth={3} /> Description
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="What was this for?"
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white text-slate-800 font-bold transition-all outline-none"
                                value={entry.label}
                                onChange={(e) => setEntry({ ...entry, label: e.target.value })}
                            />
                        </div>

                        {/* Category & Type - Responsive Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Category Select */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">
                                    <Type size={12} strokeWidth={3} /> Category
                                </label>
                                <select
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white text-slate-800 font-bold cursor-pointer outline-none transition-all appearance-none"
                                    value={entry.category}
                                    onChange={(e) => setEntry({ ...entry, category: e.target.value })}
                                >
                                    <option value="Food">Food & Dining</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Housing">Housing</option>
                                    <option value="Tech">Tech</option>
                                    <option value="Entertainment">Entertainment</option>
                                </select>
                            </div>

                            {/* Type Toggle */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">
                                    Flow
                                </label>
                                <div className="flex p-1.5 bg-slate-100 rounded-2xl">
                                    <button
                                        type="button"
                                        onClick={() => setEntry({ ...entry, type: 'expense' })}
                                        className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${entry.type === 'expense' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400'}`}
                                    >
                                        Expense
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEntry({ ...entry, type: 'income' })}
                                        className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${entry.type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
                                    >
                                        Income
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions - Sticky or Padded */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 pb-2 sm:pb-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="order-2 sm:order-1 flex-1 px-6 py-4 rounded-2xl font-black text-slate-400 hover:bg-slate-100 transition-all cursor-pointer uppercase text-xs tracking-widest"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="order-1 sm:order-2 flex-2 px-6 py-4 rounded-2xl font-black text-white bg-slate-900 hover:bg-blue-600 shadow-xl shadow-blue-100 transition-all active:scale-[0.98] cursor-pointer uppercase text-xs tracking-[0.15em]"
                        >
                            {isEditing ? 'Update Entry' : 'Add to Vault'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEntryModal;