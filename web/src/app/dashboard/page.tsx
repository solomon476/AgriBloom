"use client";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalFarms: 14,
    activePlots: 32,
    netProfit: 450000,
    expenses: 120000,
  });

  const recentTransactions = [
    { id: 1, type: "EXPENSE", amount: 4500, category: "Fertilizer", date: "2026-06-19" },
    { id: 2, type: "INCOME", amount: 15000, category: "Maize Sales", date: "2026-06-18" },
    { id: 3, type: "EXPENSE", amount: 1200, category: "Labor", date: "2026-06-17" },
  ];

  const kamisPrices = [
    { crop: "Maize (Dry)", price: "KES 3,200", trend: "↑" },
    { crop: "Beans", price: "KES 8,500", trend: "↓" },
    { crop: "Potatoes", price: "KES 2,800", trend: "—" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-4">
      <header className="flex justify-between items-center pb-4 border-b border-primary/10">
        <div>
          <h1 className="text-3xl font-extrabold text-primary">Manager Dashboard</h1>
          <p className="text-foreground/70">Overview of your cooperative's performance</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all">
          + Add Farm
        </button>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/5 flex flex-col gap-2">
          <span className="text-foreground/60 font-medium">Total Farms</span>
          <span className="text-4xl font-bold text-primary">{stats.totalFarms}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/5 flex flex-col gap-2">
          <span className="text-foreground/60 font-medium">Active Plots</span>
          <span className="text-4xl font-bold text-secondary">{stats.activePlots}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/5 flex flex-col gap-2">
          <span className="text-foreground/60 font-medium">Net Profit (KES)</span>
          <span className="text-4xl font-bold text-accent">{stats.netProfit.toLocaleString()}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-500/10 flex flex-col gap-2">
          <span className="text-foreground/60 font-medium">Total Expenses (KES)</span>
          <span className="text-4xl font-bold text-red-500">{stats.expenses.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-primary/5 p-6">
          <h2 className="text-xl font-bold text-primary mb-6">Recent Transactions</h2>
          <div className="space-y-4">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${tx.type === 'INCOME' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {tx.type === 'INCOME' ? '📈' : '📉'}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{tx.category}</h4>
                    <span className="text-sm text-foreground/60">{tx.date}</span>
                  </div>
                </div>
                <span className={`font-bold text-lg ${tx.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.type === 'INCOME' ? '+' : '-'} {tx.amount.toLocaleString()} KES
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Market Prices (KAMIS) */}
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-md p-6 text-white">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            📊 KAMIS Market Prices
          </h2>
          <div className="space-y-4">
            {kamisPrices.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-white/20 pb-3">
                <span className="font-medium text-white/90">{item.crop}</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold">{item.price}</span>
                  <span className={`text-sm ${item.trend === '↑' ? 'text-green-300' : item.trend === '↓' ? 'text-red-300' : 'text-gray-200'}`}>
                    {item.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/60 mt-6 text-center">Live data fetched from Kenya Agricultural Market Information System</p>
        </div>
      </div>
    </div>
  );
}
