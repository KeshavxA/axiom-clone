import TokenTable from "@/components/organisms/TokenTable";
import ErrorBoundary from "@/components/atoms/ErrorBoundary";

export default function Home() {
  return (

    <main className="min-h-screen bg-black p-4 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Token Discovery</h1>
            <p className="text-gray-400 mt-2 text-sm">Real-time market data across all Axiom pairs.</p>
          </div>
          <ErrorBoundary>
            <TokenTable />
          </ErrorBoundary>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium rounded-lg transition-colors">
              Watchlist
            </button>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-indigo-500/20">
              Connect Wallet
            </button>
          </div>
        </div>

        <TokenTable />

      </div>
    </main>
  );
}