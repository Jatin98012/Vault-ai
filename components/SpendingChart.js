import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { PieChart as PieIcon, ArrowRight } from 'lucide-react';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

// Function to render the "Active" slice (pops out on hover)
const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 8}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
                cornerRadius={10}
            />
        </g>
    );
};

export default function SpendingChart({ data }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const hasData = data && data.length > 0;

    // Calculate total for the center label
    const totalExpenses = data?.reduce((acc, curr) => acc + curr.value, 0) || 0;

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm h-full flex flex-col group">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Spending</h3>
                <div className="bg-slate-50 p-2 rounded-xl text-slate-400 group-hover:text-blue-500 transition-colors">
                    <PieIcon size={20} />
                </div>
            </div>
            <p className="text-slate-400 text-xs font-medium mb-6">By Category</p>

            {hasData ? (
                <div className="flex-1 flex flex-col">
                    {/* Chart Area */}
                    <div className="relative h-64 w-full">
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</span>
                            <span className="text-2xl font-black text-slate-900">₹{totalExpenses.toLocaleString()}</span>
                        </div>

                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                    onMouseEnter={(_, index) => setActiveIndex(index)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                    stroke="none"
                                    cornerRadius={10}
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                            className="outline-none"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-xl">
                                                    {payload[0].name}: ₹{payload[0].value}
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Custom Legend Chips */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {data.slice(0, 4).map((entry, index) => (
                            <div
                                key={entry.name}
                                className={`flex items-center gap-3 p-2 rounded-2xl border transition-all ${activeIndex === index ? 'bg-slate-50 border-slate-200' : 'bg-transparent border-transparent'
                                    }`}
                            >
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 truncate w-20 uppercase tracking-tighter">
                                        {entry.name}
                                    </span>
                                    <span className="text-xs font-black text-slate-800">
                                        {Math.round((entry.value / totalExpenses) * 100)}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-700">
                    <div className="relative w-44 h-44 rounded-full border-12 border-slate-50 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-slate-100 scale-110 border-dashed animate-[spin_10s_linear_infinite]" />
                        <div className="text-center">
                            <PieIcon size={40} className="text-slate-200 mx-auto mb-2" />
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Empty</p>
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-slate-900 font-bold text-sm">No Expenses Found</p>
                        <p className="text-slate-400 text-[11px] mt-1 px-10 leading-relaxed">
                            Start adding transactions to see your spending categories come to life.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}