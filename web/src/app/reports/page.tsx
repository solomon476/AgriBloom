export default function Reports() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-4">
      <header className="flex justify-between items-center pb-4 border-b border-primary/10">
        <div>
          <h1 className="text-3xl font-extrabold text-primary">Financial Reports</h1>
          <p className="text-foreground/70">Analyze your expenses, income, and overall profit.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all">
          Export CSV
        </button>
      </header>

      <div className="bg-white p-12 rounded-2xl shadow-sm border border-primary/5 text-center flex flex-col items-center gap-4">
        <span className="text-6xl">📊</span>
        <h2 className="text-2xl font-bold text-foreground">Advanced Analytics Module</h2>
        <p className="text-foreground/60 max-w-md">
          This section is currently under construction. Soon, you will have access to detailed P&L charts, historic price trends, and visual breakdowns of your crop performance.
        </p>
      </div>
    </div>
  );
}
