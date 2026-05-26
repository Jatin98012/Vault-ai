import { formatINR } from '@/utils/formatter';
import { Edit2, Trash2, Receipt, ArrowRight, FilterX } from 'lucide-react';

export default function TransactionTable({ transactions, role, onDelete, onEdit, onClearFilters }) {
    if (transactions.length === 0) {
        return (
            <div className="bg-white rounded-[2.5rem] border border-dashed border-slate-200 p-20 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <FilterX size={40} />
                </div>
                <h3 className="text-xl font-black text-slate-900">No transactions found</h3>
                <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto">
                    We couldn't find any records matching your current filters.
                </p>
                <button
                    onClick={onClearFilters}
                    className="mt-6 text-blue-600 font-black text-xs uppercase tracking-widest hover:underline cursor-pointer"
                >
                    Reset all filters
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    {/* Desktop Header - Hidden on Mobile */}
                    <thead className="hidden md:table-header-group bg-slate-50/50 border-b border-slate-100">
                        <tr>
                            <th className="px-8 py-5 text-[12px] font-black text-slate-400 uppercase tracking-[0.2em]">Transaction</th>
                            <th className="px-8 py-5 text-[12px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                            <th className="px-8 py-5 text-[12px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                            <th className="px-8 py-5 text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Amount</th>
                            {role === 'Admin' && <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Actions</th>}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-50">
                        {transactions.map((t) => (
                            <tr key={t.id} className="group flex flex-col md:table-row hover:bg-slate-50/80 transition-colors">

                                {/* 1. Label & Icon (Mobile: Row 1) */}
                                <td className="px-8 py-4 md:py-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                            }`}>
                                            <Receipt size={20} />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 text-sm md:text-base leading-tight">{t.label}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase md:hidden mt-1">{t.category} • {t.date}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* 2. Category (Hidden on Mobile, replaced by sub-text above) */}
                                <td className="hidden md:table-cell px-8 py-6">
                                    <span className="px-4 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-tighter">
                                        {t.category}
                                    </span>
                                </td>

                                {/* 3. Date (Hidden on Mobile) */}
                                <td className="hidden md:table-cell px-8 py-6 text-slate-400 font-bold text-sm">
                                    {t.date}
                                </td>

                                {/* 4. Amount (Mobile: Floating Right) */}
                                <td className="px-8 py-2 md:py-6 text-right">
                                    <span className={`text-lg font-black tabular-nums ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                                        }`}>
                                        {t.type === 'income' ? '+' : '-'}{formatINR(t.amount)}
                                    </span>
                                </td>

                                {/* 5. Actions (Mobile: Bottom Button Row) */}
                                {role === 'Admin' && (
                                    <td className="px-8 py-4 md:py-6 text-center">
                                        <div className="flex md:justify-center items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                                            <button
                                                onClick={() => onEdit(t)}
                                                className="flex-1 md:flex-none p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(t.id)}
                                                className="flex-1 md:flex-none p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all cursor-pointer"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Insight */}
            <div className="p-6 bg-slate-50/30 border-t border-slate-50 flex justify-between items-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Showing {transactions.length} records
                </p>
                <button className="flex items-center gap-1 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:gap-2 transition-all">
                    View Full Report <ArrowRight size={12} />
                </button>
            </div>
        </div>
    );
}