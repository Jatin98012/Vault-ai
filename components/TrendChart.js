import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Plus, BarChart2, TrendingUp } from 'lucide-react';

export default function TrendChart({ data, onAddClick }) {
    const hasData = data && data.length > 0;

    // Custom Tooltip Component for a "Glass" look
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/80 backdrop-blur-md border border-white p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">{label}</p>
                    <p className="text-xl font-black text-blue-600">₹{payload[0].value.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm h-full flex flex-col group">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Balance Trend</h3>
                    <p className="text-slate-400 text-xs font-medium">Visualizing your wealth over time</p>
                </div>
                {hasData && (
                    <div className="bg-blue-50 text-blue-600 p-2 rounded-xl">
                        <TrendingUp size={20} />
                    </div>
                )}
            </div>

            {hasData ? (
                <div className="flex-1 w-full min-h-70">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="8 8"
                                vertical={false}
                                stroke="#F1F5F9"
                            />

                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#CBD5E1', fontSize: 10, fontWeight: 700 }}
                                minTickGap={30}
                                dy={15}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#CBD5E1', fontSize: 10, fontWeight: 700 }}
                                tickFormatter={(value) => `₹${value >= 1000 ? value / 1000 + 'k' : value}`}
                            />

                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3B82F6', strokeWidth: 2, strokeDasharray: '5 5' }} />

                            <Area
                                type="monotone"
                                dataKey="balance"
                                stroke="#3B82F6"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#chartGradient)"
                                animationDuration={1500}
                                activeDot={{
                                    r: 6,
                                    fill: '#3B82F6',
                                    stroke: '#fff',
                                    strokeWidth: 3,
                                    className: "shadow-lg"
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-5 bg-slate-50/50 rounded-4xl border-2 border-dashed border-slate-200 m-2 transition-all group-hover:bg-slate-50">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-100 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative p-5 bg-white rounded-2xl shadow-sm text-blue-500">
                            <BarChart2 size={32} />
                        </div>
                    </div>
                    <div className="max-w-50">
                        <p className="text-slate-900 font-bold">Analysis Pending</p>
                        <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
                            Log your first transaction to unlock deep financial insights.
                        </p>
                    </div>
                    <button
                        onClick={onAddClick}
                        className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                    >
                        + Create Entry
                    </button>
                </div>
            )}
        </div>
    );
}