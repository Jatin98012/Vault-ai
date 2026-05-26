import { useState } from 'react';
import { Filter, Check } from 'lucide-react';

export default function CategoryFilter({ selected, setSelected }) {
    const [isOpen, setIsOpen] = useState(false);
    const categories = ['All', 'Food', 'Shopping', 'Salary', 'Housing', 'Tech', 'Entertainment'];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all border cursor-pointer ${selected !== 'All'
                        ? 'bg-blue-50 text-blue-600 border-blue-200'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                    }`}
            >
                <Filter size={16} />
                {selected === 'All' ? 'Filter Category' : `Category: ${selected}`}
            </button>

            {isOpen && (
                <>
                    {/* Invisible backdrop to close the dropdown when clicking outside */}
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

                    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                        <div className="p-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setSelected(cat);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${selected === cat
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    {cat}
                                    {selected === cat && <Check size={14} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}