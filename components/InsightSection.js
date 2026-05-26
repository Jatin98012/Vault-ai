import React from 'react'
import { Lightbulb, TrendingDown, AlertCircle, Info } from 'lucide-react';
import { getInsights } from '@/utils/insights';

const InsightSection = ({ transactions }) => {
    const insights = getInsights(transactions);

    // If no transactions exist at all, show a "Welcome" insight
    if (!insights) {
        return (
            <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-4xl flex items-center gap-4 mb-8">
                <div className="bg-blue-500 p-3 rounded-2xl text-white shadow-lg shadow-blue-100">
                    <Info size={24} />
                </div>
                <div>
                    <h4 className="text-blue-900 font-black text-lg">Awaiting Data</h4>
                    <p className="text-blue-700/70 text-sm font-medium">
                        Add your first income and expenses to unlock personalized financial insights and spending patterns.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* Insight 1: Top Spending */}
            <div className="bg-amber-50 p-4 rounded-2xl flex items-start gap-3 border border-amber-100 transition-all hover:shadow-md">
                <div className="bg-amber-500 p-2 rounded-lg text-white">
                    <TrendingDown size={18} />
                </div>
                <div>
                    <p className="text-amber-900 font-bold text-sm">Highest Spend</p>
                    {insights.hasExpenses ? (
                        <p className="text-amber-700 text-xs mt-1 leading-relaxed">
                            Most of your money goes to <span className="font-bold underline decoration-amber-300 decoration-2 underline-offset-2">{insights.topCategory?.name}</span>.
                        </p>
                    ) : (
                        <p className="text-amber-600/60 text-xs mt-1 italic font-medium">No expenses logged yet.</p>
                    )}
                </div>
            </div>

            {/* Insight 2: Smart Observation */}
            <div className="bg-emerald-50 p-4 rounded-2xl flex items-start gap-3 border border-emerald-100 transition-all hover:shadow-md">
                <div className="bg-emerald-500 p-2 rounded-lg text-white">
                    <Lightbulb size={18} />
                </div>
                <div>
                    <p className="text-emerald-900 font-bold text-sm">Savings Health</p>
                    {insights.hasIncome ? (
                        <p className="text-emerald-700 text-xs mt-1 leading-relaxed">
                            You are currently saving <span className="font-bold">{insights.savingsRate}%</span> of your total income.
                        </p>
                    ) : (
                        <p className="text-emerald-600/60 text-xs mt-1 italic font-medium">Add income to calculate savings rate.</p>
                    )}
                </div>
            </div>

            {/* Insight 3: Warning or Success */}
            {insights.isOverspending ? (
                <div className="bg-rose-50 p-4 rounded-2xl flex items-start gap-3 border border-rose-100 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="bg-rose-500 p-2 rounded-lg text-white">
                        <AlertCircle size={18} />
                    </div>
                    <div>
                        <p className="text-rose-900 font-bold text-sm">Budget Warning</p>
                        <p className="text-rose-700 text-xs mt-1 leading-relaxed">Your expenses exceed your income. Consider reviewing non-essential spending.</p>
                    </div>
                </div>
            ) : insights.hasIncome && (
                <div className="bg-blue-50 p-4 rounded-2xl flex items-start gap-3 border border-blue-100">
                    <div className="bg-blue-500 p-2 rounded-lg text-white">
                        <TrendingDown size={18} className="rotate-180" />
                    </div>
                    <div>
                        <p className="text-blue-900 font-bold text-sm">Budget Safe</p>
                        <p className="text-blue-700 text-xs mt-1 leading-relaxed">Your spending is currently within your income limits. Great job!</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default InsightSection