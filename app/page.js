"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Firstpage from './components/Firstpage';
import StatCard from './components/StatCard';
import TransactionTable from './components/TransactionTable';
import AddEntryModal from './components/AddEntryModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import TrendChart from './components/TrendChart';
import SpendingChart from './components/SpendingChart';
import CategoryFilter from './components/CategoryFilter';
import InsightSection from './components/InsightSection';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Plus, Search, CalendarDays, LayoutDashboard } from 'lucide-react';

const STORAGE_KEY = 'vault_transactions_data';

export default function Dashboard() {
  const [role, setRole] = useState('Admin');
  const [userName, setUserName] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [timeFilter, setTimeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [newEntry, setNewEntry] = useState({ label: '', amount: '', category: 'Food', type: 'expense' });
  useEffect(() => {
    const savedName = localStorage.getItem('vault_user_name');
    if (savedName) {
      setUserName(savedName);
    } else {
      setShowOnboarding(true);
    }
  }, []);
  useEffect(() => {
    setMounted(true);
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try { setTransactions(JSON.parse(savedData)); }
      catch (e) { setTransactions([]); }
    }
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions, mounted]);


  // Logic Memos (Keep these as they are optimized)
  const stats = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  const categoryData = useMemo(() => {
    const totals = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });
    return Object.keys(totals).map(name => ({ name, value: totals[name] }));
  }, [transactions]);

  const chartData = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let runningBalance = 0;
    return sorted.map(t => {
      t.type === 'income' ? runningBalance += t.amount : runningBalance -= t.amount;
      return {
        date: new Date(t.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
        balance: runningBalance
      };
    });
  }, [transactions]);

  const filteredData = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.label.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTime = timeFilter === 'this-month' ? new Date(t.date).getMonth() === new Date().getMonth() : true;
      const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
      return matchesSearch && matchesTime && matchesCategory;
    });
  }, [transactions, searchQuery, timeFilter, categoryFilter]);

  const handleSaveName = (name) => {
    localStorage.setItem('vault_user_name', name);
    setUserName(name);
    setShowOnboarding(false);
  };

  const handleEditClick = (transaction) => {
    setNewEntry(transaction);
    setEditingTransaction(transaction.id);
    setIsModalOpen(true);
  };
  const isEditing = Boolean(editingTransaction);

  const confirmDelete = () => {
    if (deleteId) {
      setTransactions(transactions.filter(t => t.id !== deleteId));
      setDeleteId(null);
    }
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (editingTransaction) {
      setTransactions(transactions.map(t => t.id === editingTransaction ? { ...newEntry, amount: Number(newEntry.amount) } : t));
    } else {
      const newItem = { ...newEntry, id: Date.now(), amount: Number(newEntry.amount), date: new Date().toISOString().split('T')[0] };
      setTransactions([newItem, ...transactions]);
    }
    setIsModalOpen(false);
    setEditingTransaction(null);
    setNewEntry({ label: '', amount: '', category: 'Food', type: 'expense' });
  };

  if (!mounted) return null;

  if (showOnboarding) {
    return <Firstpage onSave={handleSaveName} />;
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-blue-100">
      <Navbar role={role} setRole={setRole} searchQuery={searchQuery} setSearchQuery={setSearchQuery} userName={userName} />

      {/* max-w-7xl is the standard for 1280px, better than a custom pixel value for responsiveness */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-10 md:px-8 space-y-6 md:space-y-10">

        {/* Header Section: Centered on mobile, spread on desktop */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-left">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] md:text-sm uppercase tracking-[0.2em] mb-1">
              <LayoutDashboard size={14} className="md:w-4 md:h-4" />
              Overview
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
              Financial <span className="text-blue-600">Analytics</span>
            </h1>
          </div>

          {role === 'Admin' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 md:py-3 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-200 active:scale-95 cursor-pointer"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              <span>New Entry</span>
            </button>
          )}
        </header>

        {/* 1. Statistics Row: Stacked on mobile, 3 cols on desktop */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <StatCard title="Net Balance" amount={stats.balance} trend="+2.4%" icon={<TrendingUp />} />
          <StatCard title="Total Income" amount={stats.income} trend="+12%" icon={<ArrowUpRight />} variant="success" />
          <StatCard title="Total Expenses" amount={stats.expenses} trend="-5%" icon={<ArrowDownRight />} variant="danger" />
        </section>

        {/* 2. Charts Section: Stacked on mobile, 2:1 ratio on desktop */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-full">
            <TrendChart data={chartData} onAddClick={() => setIsModalOpen(true)} />
          </div>
          <div className="h-full">
            <SpendingChart data={categoryData} onAddClick={() => setIsModalOpen(true)} />
          </div>
        </section>

        {/* 3. Insights Section */}
        <InsightSection transactions={transactions} />

        {/* 4. Transactions Section */}
        <section className="space-y-6">
          {/* Responsive Filter Bar */}
          <div className="flex flex-col gap-4 bg-white/60 p-4 md:p-6 rounded-4xl md:rounded-[3rem] border border-white/80 backdrop-blur-md shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

              {/* Search Input */}
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter Group */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <button
                  onClick={() => setTimeFilter(timeFilter === 'this-month' ? 'all' : 'this-month')}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold transition-all border ${timeFilter === 'this-month'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100'
                      : 'bg-white text-slate-600 border-slate-200'
                    }`}
                >
                  <CalendarDays size={16} />
                  <span className="whitespace-nowrap">{timeFilter === 'this-month' ? 'This Month' : 'All Time'}</span>
                </button>

                <div className="flex-1 md:flex-none">
                  <CategoryFilter selected={categoryFilter} setSelected={setCategoryFilter} />
                </div>

                {(timeFilter !== 'all' || categoryFilter !== 'All' || searchQuery !== '') && (
                  <button
                    onClick={() => { setTimeFilter('all'); setCategoryFilter('All'); setSearchQuery(''); }}
                    className="w-full md:w-auto px-4 py-2 text-[10px] font-black text-rose-500 hover:bg-rose-50 rounded-xl transition-colors uppercase tracking-widest text-center"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          <TransactionTable
            transactions={filteredData}
            role={role}
            onDelete={(id) => setDeleteId(id)}
            onEdit={handleEditClick}
            onClearFilters={() => { setTimeFilter('all'); setCategoryFilter('All'); setSearchQuery(''); }}
          />
        </section>
      </main>

      {/* Modals remain the same */}
      <AddEntryModal
        isOpen={isModalOpen}
        isEditing={isEditing}
        onClose={() => { setIsModalOpen(false); setEditingTransaction(null); }}
        onSave={handleAddEntry}
        entry={newEntry}
        setEntry={setNewEntry}
      />
      <DeleteConfirmModal
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}