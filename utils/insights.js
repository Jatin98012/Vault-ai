export const getInsights = (transactions) => {
    if (!transactions || transactions.length === 0) return null;

    const expenses = transactions.filter(t => t.type === 'expense');
    const income = transactions.filter(t => t.type === 'income');

    const totalIncome = income.reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);

    // 1. Top Category Logic
    const catTotals = {};
    expenses.forEach(t => catTotals[t.category] = (catTotals[t.category] || 0) + t.amount);
    const topCategory = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0];

    // 2. Savings Rate (Handle division by zero)
    const savingsRate = totalIncome > 0
        ? Math.max(0, ((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1)
        : 0;

    return {
        topCategory: topCategory ? { name: topCategory[0], value: topCategory[1] } : null,
        savingsRate,
        isOverspending: totalExpense > totalIncome,
        hasIncome: totalIncome > 0,
        hasExpenses: expenses.length > 0
    };
};